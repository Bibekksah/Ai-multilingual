import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileVideo, Calendar } from "lucide-react";
import { ContentItem } from "@/hooks/use-content-library";
import React, { useState } from "react";

interface VideoListProps {
  videos: ContentItem[];
  selectedVideoId?: number;
  onVideoSelect: (video: ContentItem) => void;
  domainName: string;
}

const domains = [
  { value: 'all', label: 'All Media' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
];

export const MediaList = ({ videos, selectedVideoId, onVideoSelect, domainName }: VideoListProps) => {
  const [selectedDomain, setSelectedDomain] = useState("all");

  const getDomainFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'Unknown Domain';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredVideos = selectedDomain === 'all' 
    ? videos 
    : videos.filter(v => v.domain === selectedDomain);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileVideo className="w-5 h-5" />
          Media Library
        </CardTitle>
        <Badge variant="outline" className="w-fit">
          {domainName}
        </Badge>
      </CardHeader>

  {/* Domain Tabs */}
  <div className="px-6 mb-4">
    <Tabs value={selectedDomain} onValueChange={setSelectedDomain} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {domains.map((domain) => (
          <TabsTrigger key={domain.value} value={domain.value} className="text-xs">
            {domain.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </div>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-3 pb-6">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium mb-2">No Videos Available</p>
            <p className="text-sm mb-4">Upload some video content to start watching</p>
            <div className="text-xs space-y-1 opacity-75">
              <p>📁 Upload videos using the Content Library</p>
              <p>🎥 Click "Video Content" card to access this player</p>
              <p>▶️ Select videos from this list to play them</p>
            </div>
          </div>
        ) : (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedVideoId === video.id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => onVideoSelect(video)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(video.created_at)}</span>
                      </div>

                      <Badge variant="outline" className="text-xs">
                        {video.domain || getDomainFromUrl(video.content)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
