import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';

export interface ContentItem {
  id: number;
  user_id: string;
  title: string;
  content: string;
  content_type: string;
  domain?: string;
  created_at: string;
  updated_at: string;
}

export const useContentLibrary = () => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoContent, setVideoContent] = useState<ContentItem[]>([]);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    content: '',
    domain: '',
    files: [] as File[],
  });

  // Fetch content from database
  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content_library' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
    } else {
      setContent((data as unknown as ContentItem[]) || []);
    }
    setLoading(false);
  };

  // Upload content to Supabase storage and database
  const uploadContent = async () => {
    if (!user || !uploadForm.title || !selectedType || !uploadForm.domain || uploadForm.files.length === 0) {
      alert('Please fill in all required fields including domain and select at least one file');
      return;
    }

    setUploading(true);
    try {
      // Upload each file to Supabase storage and insert into database
      for (const file of uploadForm.files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `content/${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('default')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('default')
          .getPublicUrl(filePath);

        const fileUrl = data.publicUrl;

        // Insert into database
        const { error: insertError } = await supabase
          .from('content_library' as any)
          .insert({
            user_id: user.id,
            title: `${uploadForm.title} - ${file.name}`,
            content: fileUrl,
            content_type: selectedType,
            domain: uploadForm.domain,
          });

        if (insertError) {
          throw insertError;
        }
      }

      // Reset form and refresh content
      setUploadForm({ title: '', content: '', domain: '', files: [] });
      setSelectedType('');
      fetchContent();
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Delete content
  const deleteContent = async (id: number) => {
    if (!user) return;
    const { error } = await supabase
      .from('content_library' as any)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting content:', error);
    } else {
      fetchContent();
    }
  };

  // Update content
  const updateContent = async (id: number, updates: Partial<ContentItem>) => {
    if (!user) return;
    const { error } = await supabase
      .from('content_library' as any)
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating content:', error);
    } else {
      fetchContent();
    }
  };

  // Get domain name from URL
  const getDomainFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'Unknown Domain';
    }
  };

  // Filter media content (video and audio)
  const getMediaContent = (type: 'video' | 'audio') => {
    const media = content.filter(item => item.content_type === type);
    setVideoContent(media);
    return media;
  };

  // Open video player
  const openVideoPlayer = () => {
    getMediaContent('video');
    setShowVideoPlayer(true);
  };

  // Open audio player
  const openAudioPlayer = () => {
    getMediaContent('audio');
    setShowVideoPlayer(true); // reusing showVideoPlayer for simplicity
  };

  // Close media player
  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  useEffect(() => {
    fetchContent();
  }, [user]);

  return {
    content,
    loading,
    uploading,
    selectedType,
    setSelectedType,
    uploadForm,
    setUploadForm,
    uploadContent,
    deleteContent,
    fetchContent,
    showVideoPlayer,
    videoContent,
    openVideoPlayer,
    openAudioPlayer,
    closeVideoPlayer,
    getDomainFromUrl,
  };
};
