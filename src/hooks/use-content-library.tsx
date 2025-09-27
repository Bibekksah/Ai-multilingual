import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth-provider';

export interface ContentItem {
  id: number;
  title: string;
  content_type: string;
  content: string;
  domain?: string;
  created_at: string;
}

export interface UseContentLibraryReturn {
  content: ContentItem[];
  loading: boolean;
  uploading: boolean;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  uploadForm: {
    title: string;
    content: string;
    domain: string;
    files: File[];
  };
  setUploadForm: React.Dispatch<React.SetStateAction<UseContentLibraryReturn['uploadForm']>>;
  uploadContent: () => Promise<void>;
  deleteContent: (id: number) => void;
  showVideoPlayer: boolean;
  videoContent: ContentItem[];
  openVideoPlayer: () => void;
  openAudioPlayer: () => void;
  closeVideoPlayer: () => void;
  currentMediaType: 'video' | 'audio';
  setCurrentMediaType: React.Dispatch<React.SetStateAction<'video' | 'audio'>>;
}

export const useContentLibrary = (): UseContentLibraryReturn => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    content: '',
    domain: '',
    files: [] as File[],
  });
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoContent, setVideoContent] = useState<ContentItem[]>([]);
  const [currentMediaType, setCurrentMediaType] = useState<'video' | 'audio'>('video');

  // Fetch content from Supabase
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content_library')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching content:', error);
      } else {
        setContent(data || []);
        console.log('Fetched content:', data || []);
      }
      setLoading(false);
    };
    fetchContent();
  }, [user]);

  const uploadContent = async () => {
    if (!uploadForm.title || !selectedType || !user) return;
    setUploading(true);
    let contentValue = uploadForm.content;
    if (uploadForm.files.length > 0) {
      // Upload files to storage
      const file = uploadForm.files[0]; // Assuming single file for now
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('default')
        .upload(fileName, file);
      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        setUploading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage
        .from('default')
        .getPublicUrl(fileName);
      contentValue = publicUrl;
    }
    console.log('Uploading with selectedType:', selectedType, 'domain:', uploadForm.domain);
    const { data, error } = await supabase
      .from('content_library')
      .insert({
        user_id: user.id,
        title: uploadForm.title,
        content: contentValue,
        content_type: selectedType,
        domain: uploadForm.domain || null,
      })
      .select()
      .single();
    if (error) {
      console.error('Error uploading content:', error);
    } else {
      setContent(prev => [data, ...prev]);
      console.log('Uploaded item:', data);
      setUploadForm({ title: '', content: '', domain: '', files: [] });
    }
    setUploading(false);
  };

  const deleteContent = async (id: number) => {
    const { error } = await supabase
      .from('content_library')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting content:', error);
    } else {
      setContent(prev => prev.filter(item => item.id !== id));
    }
  };

  const openVideoPlayer = () => {
    const videoItems = content.filter(item => item.content_type.trim().toLowerCase() === 'video');
    setVideoContent(videoItems);
    setCurrentMediaType('video');
    setShowVideoPlayer(true);
    console.log('Full content when opening player:', content.map(item => ({title: item.title, type: item.content_type})));
    console.log('Filtered video items:', videoItems);
  };

  const openAudioPlayer = () => {
    const audioItems = content.filter(item => item.content_type === 'audio');
    setVideoContent(audioItems);
    setCurrentMediaType('audio');
    setShowVideoPlayer(true);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

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
    showVideoPlayer,
    videoContent,
    openVideoPlayer,
    openAudioPlayer,
    closeVideoPlayer,
    currentMediaType,
    setCurrentMediaType,
  };
};
