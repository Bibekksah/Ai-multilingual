-- Add domain column to content_library table
ALTER TABLE public.content_library ADD COLUMN domain TEXT;

-- Update RLS policies if needed (existing policies should cover it)
