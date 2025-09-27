import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { MediaPlayer } from "./VideoPlayer";
import { MediaList } from "./VideoList";
import { ContentItem } from "@/hooks/use-content-library";
import { Play } from "lucide-react";

interface MediaPlayerLayoutProps {
  videos: ContentItem[];
  mediaType: 'video' | 'audio';
  onClose: () => void;
}

export const MediaPlayerLayout = ({ videos, mediaType, onClose }: MediaPlayerLayoutProps) => {
  const filteredVideos = videos.filter(video => video.content_type === mediaType);
  const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(filteredVideos[0] || null);

  const getDomainFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'Unknown Domain';
    }
  };

  const handleVideoSelect = (video: ContentItem) => {
    setSelectedVideo(video);
  };

  // Always show the layout, even with no videos

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Video Player Panel */}
        <ResizablePanel defaultSize={70} minSize={50}>
          {selectedVideo ? (
            <MediaPlayer
              mediaUrl={selectedVideo.content}
              title={selectedVideo.title}
              domainName={selectedVideo.domain || 'Unknown Domain'}
              mediaType={selectedVideo.content_type === 'audio' ? 'audio' : 'video'}
              onClose={onClose}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center max-w-md px-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-3">Media Player Ready</h3>
                <p className="text-sm mb-4">Select a media from the library to start playing</p>
                <div className="text-xs space-y-2 opacity-75">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Click any media in the list to play it</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Use controls to play, pause, and adjust volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Drag the panel divider to resize the layout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Video List Panel */}
        <ResizablePanel defaultSize={30} minSize={25}>
          <MediaList
            videos={filteredVideos}
            selectedVideoId={selectedVideo?.id}
            onVideoSelect={handleVideoSelect}
            domainName={selectedVideo ? getDomainFromUrl(selectedVideo.content) : 'All Media'}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
