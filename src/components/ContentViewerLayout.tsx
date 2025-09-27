import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ContentItem } from "@/hooks/use-content-library";

interface ContentViewerLayoutProps {
  content: ContentItem[];
  type: 'text' | 'assessment';
  onClose: () => void;
}

const ContentViewerLayout: React.FC<ContentViewerLayoutProps> = ({ content, type, onClose }) => {
  const title = type === 'text' ? 'Text Documents' : 'Assessments';
  const description = type === 'text' ? 'View your text documents' : 'View your assessments';

  const isFileUrl = (url: string) => {
    if (!url) return false;
    const fileExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt'];
    return fileExtensions.some(ext => url.toLowerCase().endsWith(ext)) || url.startsWith('http');
  };

  const openDocument = (url: string) => {
    if (isFileUrl(url)) {
      // For PDF, could use iframe preview, but for simplicity, open in new tab
      window.open(url, '_blank');
    }
  };

  const renderContent = (itemContent: string) => {
    if (isFileUrl(itemContent)) {
      return (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">File available for download/view.</p>
          <Button variant="outline" size="sm" onClick={() => openDocument(itemContent)}>
            Open Document
          </Button>
        </div>
      );
    } else {
      return (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{itemContent || 'No content available for this item.'}</p>
        </div>
      );
    }
  };

  return (
    <div className="h-screen bg-black/80 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-background p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content List */}
        <div className="p-4 space-y-4">
          {content.length > 0 ? (
            content.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <Badge variant="outline">{item.domain || 'General'}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Created: {new Date(item.created_at).toLocaleDateString()} | Type: {item.content_type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContent(item.content)}
                  {item.content_type === 'assessment' && !isFileUrl(item.content) && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium">Assessment Details:</p>
                      <ul className="text-sm list-disc list-inside mt-1">
                        {/* Add assessment-specific rendering if needed, e.g., questions from content */}
                        <li>Review and complete the assessment below.</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No {type} content available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export { ContentViewerLayout };
