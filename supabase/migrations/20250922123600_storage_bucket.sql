-- Create default storage bucket for content uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('default', 'default', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Users can upload files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'default' AND auth.role() = 'authenticated');

-- Create policy to allow users to view their own files
CREATE POLICY "Users can view their own files" ON storage.objects
FOR SELECT USING (bucket_id = 'default' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow users to update their own files
CREATE POLICY "Users can update their own files" ON storage.objects
FOR UPDATE USING (bucket_id = 'default' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (bucket_id = 'default' AND auth.uid()::text = (storage.foldername(name))[1]);
