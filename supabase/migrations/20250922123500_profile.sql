-- Create Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create Content Library Table
CREATE TABLE public.content_library (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    content_type TEXT, -- e.g., 'article', 'post', 'document'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.content_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own content." ON public.content_library FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own content." ON public.content_library FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own content." ON public.content_library FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own content." ON public.content_library FOR DELETE USING (auth.uid() = user_id);

-- Create Translations Table
CREATE TABLE public.translations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content_id BIGINT REFERENCES public.content_library(id) ON DELETE CASCADE,
    source_language TEXT NOT NULL,
    target_language TEXT NOT NULL,
    translated_content TEXT,
    status TEXT DEFAULT 'pending', -- e.g., 'pending', 'in_progress', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view translations for their content." ON public.translations FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.content_library WHERE content_library.id = translations.content_id AND content_library.user_id = auth.uid()
));
CREATE POLICY "Users can insert translations for their content." ON public.translations FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.content_library WHERE content_library.id = translations.content_id AND content_library.user_id = auth.uid()
));
CREATE POLICY "Users can update translations for their content." ON public.translations FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.content_library WHERE content_library.id = translations.content_id AND content_library.user_id = auth.uid()
));
CREATE POLICY "Users can delete translations for their content." ON public.translations FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.content_library WHERE content_library.id = translations.content_id AND content_library.user_id = auth.uid()
));


-- Create Analytics Table
CREATE TABLE public.analytics (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- e.g., 'content_view', 'translation_requested'
    content_id BIGINT REFERENCES public.content_library(id) ON DELETE SET NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own analytics." ON public.analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own analytics." ON public.analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to automatically create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

