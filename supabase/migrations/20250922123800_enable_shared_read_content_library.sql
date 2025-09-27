-- Enable RLS on content_library if not already enabled
ALTER TABLE content_library ENABLE ROW LEVEL SECURITY;

-- Policy for shared read access: All authenticated users can read all content
CREATE POLICY "Enable read access for authenticated users" ON content_library
FOR SELECT USING (auth.role() = 'authenticated');

-- Keep insert policy user-specific (if exists, or add)
-- Assuming existing insert policy allows user to insert own row
CREATE POLICY "Users can insert own content" ON content_library
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Keep update policy user-specific
CREATE POLICY "Users can update own content" ON content_library
FOR UPDATE USING (auth.uid() = user_id);

-- Keep delete policy user-specific
CREATE POLICY "Users can delete own content" ON content_library
FOR DELETE USING (auth.uid() = user_id);
