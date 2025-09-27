import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Headphones,
  Video,
  FileCheck
} from "lucide-react"
import { useContentLibrary, ContentItem } from "@/hooks/use-content-library"
import { MediaPlayerLayout } from "@/components/VideoPlayerLayout"
import { ContentViewerLayout } from "@/components/ContentViewerLayout"

const ContentLibrary = () => {
  const hook = useContentLibrary()
  const {
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
  } = hook

  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedContentId, setSelectedContentId] = useState<number | null>(null)
  const [filterType, setFilterType] = useState<string>('')
  const [filterDomain, setFilterDomain] = useState<string>('')
  const [showContentViewer, setShowContentViewer] = useState(false)
  const [viewerType, setViewerType] = useState<'text' | 'assessment'>('text')
  const [viewerContent, setViewerContent] = useState<ContentItem[]>([])
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedEditItem, setSelectedEditItem] = useState<ContentItem | null>(null)
  const [editForm, setEditForm] = useState({ title: '', content: '', domain: '' })
  const [showBulkUploadDialog, setShowBulkUploadDialog] = useState(false)
  const [showQualityCheckDialog, setShowQualityCheckDialog] = useState(false)
  const contentTypes = [
    {
      icon: BookOpen,
      title: "Text Documents",
      count: "15,847",
      description: "Training manuals, guides, and documentation"
    },
    {
      icon: Headphones,
      title: "Audio Files",
      count: "4,238",
      description: "Voice recordings and audio lessons"
    },
    {
      icon: Video,
      title: "Video Content",
      count: "2,156",
      description: "Training videos and demonstrations"
    },
    {
      icon: FileCheck,
      title: "Assessments",
      count: "8,924",
      description: "Quizzes, tests, and evaluation forms"
    }
  ]

  const recentContent = [
    {
      id: 1,
      title: "Electrical Safety Training Module",
      type: "Document",
      languages: ["English", "Hindi", "Tamil"],
      status: "Translated",
      lastModified: "2 hours ago"
    },
    {
      id: 2,
      title: "Automotive Repair Basics",
      type: "Video",
      languages: ["English", "Bengali"],
      status: "Processing",
      lastModified: "5 hours ago"
    },
    {
      id: 3,
      title: "Healthcare Assistant Assessment",
      type: "Assessment",
      languages: ["English", "Malayalam", "Kannada"],
      status: "Completed",
      lastModified: "1 day ago"
    },
    {
      id: 4,
      title: "Digital Marketing Fundamentals",
      type: "Audio",
      languages: ["English", "Gujarati"],
      status: "Review",
      lastModified: "2 days ago"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-success text-success-foreground'
      case 'Translated': return 'bg-primary text-primary-foreground'
      case 'Processing': return 'bg-warning text-warning-foreground'
      case 'Review': return 'bg-accent text-accent-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">Manage and organize your training materials</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Content</DialogTitle>
              <DialogDescription>
                Add new content to your library. Select the type and provide details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="col-span-3 p-2 border rounded"
                >
                  <option value="">Select Type</option>
                  <option value="text">Text Document</option>
                  <option value="audio">Audio File</option>
                  <option value="video">Video Content</option>
                  <option value="assessment">Assessment</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="domain" className="text-right">
                  Domain
                </Label>
                <select
                  id="domain"
                  value={uploadForm.domain}
                  onChange={(e) => setUploadForm({ ...uploadForm, domain: e.target.value })}
                  className="col-span-3 p-2 border rounded"
                >
                  <option value="">Select Domain</option>
                  <option value="farmer">Farmer</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={uploadForm.content}
                  onChange={(e) => setUploadForm({ ...uploadForm, content: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter text content or description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="files" className="text-right">
                  Files
                </Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={(e) => setUploadForm({ ...uploadForm, files: Array.from(e.target.files || []) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={uploadContent} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content, materials, translations..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilterDialog(true)}>
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Content</DialogTitle>
            <DialogDescription>
              Apply filters to narrow down your content library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contentTypeFilter">Content Type</Label>
              <select
                id="contentTypeFilter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Types</option>
                <option value="text">Text Documents</option>
                <option value="audio">Audio Files</option>
                <option value="video">Video Content</option>
                <option value="assessment">Assessments</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="domainFilter">Domain</Label>
              <select
                id="domainFilter"
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Domains</option>
                <option value="farmer">Farmer</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setShowFilterDialog(false); setFilterType(''); setFilterDomain(''); }}>
              Clear All
            </Button>
            <Button onClick={() => setShowFilterDialog(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
        
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update the details of the selected content item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editTitle" className="text-right">
                Title
              </Label>
              <Input
                id="editTitle"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDomain" className="text-right">
                Domain
              </Label>
              <select
                id="editDomain"
                value={editForm.domain}
                onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                className="col-span-3 p-2 border rounded"
              >
                <option value="">Select Domain</option>
                <option value="farmer">Farmer</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editContent" className="text-right">
                Content
              </Label>
              <Textarea
                id="editContent"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                className="col-span-3"
                placeholder="Enter text content or description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => { /* TODO: Implement updateContent function */ setShowEditDialog(false); }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={showBulkUploadDialog} onOpenChange={setShowBulkUploadDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bulk Upload Content</DialogTitle>
            <DialogDescription>
              Upload multiple files at once. All files will be processed and added to your library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulkFiles">Select Files</Label>
              <Input
                id="bulkFiles"
                type="file"
                multiple
                onChange={(e) => setUploadForm({ ...uploadForm, files: Array.from(e.target.files || []) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulkDomain">Domain (Optional)</Label>
              <select
                id="bulkDomain"
                value={uploadForm.domain}
                onChange={(e) => setUploadForm({ ...uploadForm, domain: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">All Domains</option>
                <option value="farmer">Farmer</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowBulkUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => { uploadContent(); setShowBulkUploadDialog(false); }} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quality Check Dialog */}
      <Dialog open={showQualityCheckDialog} onOpenChange={setShowQualityCheckDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Content Quality Check</DialogTitle>
            <DialogDescription>
              Review quality metrics for your content library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Quality Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Content:</span>
                  <span>{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Text Documents:</span>
                  <span>{content.filter(item => item.content_type === 'text').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Video Content:</span>
                  <span>{content.filter(item => item.content_type === 'video').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Files:</span>
                  <span>{content.filter(item => item.content_type === 'audio').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assessments:</span>
                  <span>{content.filter(item => item.content_type === 'assessment').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Content with Domains:</span>
                  <span>{content.filter(item => item.domain).length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowQualityCheckDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Types Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentTypes.map((type, index) => {
          const typeKey = type.title.toLowerCase().includes('text') ? 'text' :
                          type.title.toLowerCase().includes('audio') ? 'audio' :
                          type.title.toLowerCase().includes('video') ? 'video' : 'assessment';
          return (
            <Card key={index} className="professional-card hover:shadow-elegant transition-smooth cursor-pointer" onClick={() => {
              setFilterType(typeKey);
              setSelectedType(typeKey);
              if (typeKey === 'video') {
                openVideoPlayer();
              } else if (typeKey === 'audio') {
                openAudioPlayer();
              } else if (typeKey === 'text') {
                const textContent = content.filter(item => item.content_type === 'text');
                setViewerContent(textContent);
                setViewerType('text');
                setShowContentViewer(true);
              } else if (typeKey === 'assessment') {
                const assessmentContent = content.filter(item => item.content_type === 'assessment');
                setViewerContent(assessmentContent);
                setViewerType('assessment');
                setShowContentViewer(true);
              }
            }}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-card">
                    {React.createElement(type.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{type.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {type.count}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Recent Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent {filterType ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Content` : 'Content'}
          </CardTitle>
          <CardDescription>
            {filterType ? `Filtered training materials for ${filterType}` : 'Recently added or modified training materials'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading content...</p>
          ) : (
            <div className="space-y-4">
              {content.length > 0 ? content
                .filter(item => (!filterType || item.content_type === filterType) && (!filterDomain || item.domain === filterDomain))
                .map((item) => (
                <Dialog key={item.id} open={item.id === selectedContentId} onOpenChange={(open) => { if (!open) setSelectedContentId(null) }}>
                  <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/40 transition-smooth cursor-pointer" onClick={() => setSelectedContentId(item.id)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline" className="text-xs">{item.content_type}</Badge>
                        <Badge className="text-xs bg-primary text-primary-foreground">
                          Uploaded
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Type: {item.content_type}</span>
                        {item.domain && (
                          <>
                            <span>•</span>
                            <span>Domain: {item.domain}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(item.content, '_blank') }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedEditItem(item); setShowEditDialog(true); setEditForm({ title: item.title, content: item.content || '', domain: item.domain || '' }); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); const link = document.createElement('a'); link.href = item.content; link.download = item.title; link.click(); }}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={(e) => { e.stopPropagation(); deleteContent(item.id) }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        Type: {item.content_type} <br />
                        Domain: {item.domain || 'N/A'} <br />
                        Created: {new Date(item.created_at).toLocaleDateString()} <br />
                        Status: Uploaded
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                      <p>{item.content || 'No content available.'}</p>
                      {/* Additional content details or preview can be added here */}
                    </div>
                  </DialogContent>
                </Dialog>
              )) : (
                <p>No {filterType ? `${filterType} ` : ''}content available yet.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common content management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowBulkUploadDialog(true)}>
              <Upload className="w-6 h-6" />
              Bulk Upload
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => {
              const dataStr = JSON.stringify(content, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = 'content_library.json';
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}>
              <Download className="w-6 h-6" />
              Export All
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowQualityCheckDialog(true)}>
              <FileCheck className="w-6 h-6" />
              Quality Check
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Player Dialog */}
      <Dialog open={showVideoPlayer} onOpenChange={(open) => !open && closeVideoPlayer()}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Media Player</DialogTitle>
            <DialogDescription>Play your video or audio content</DialogDescription>
          </DialogHeader>
          <MediaPlayerLayout
            videos={videoContent}
            mediaType={currentMediaType}
            onClose={closeVideoPlayer}
          />
        </DialogContent>
      </Dialog>

      {/* Content Viewer Dialog */}
      <Dialog open={showContentViewer} onOpenChange={(open) => !open && setShowContentViewer(false)}>
        <DialogContent className="max-w-none h-screen p-0 border-none max-h-none">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Content Viewer</DialogTitle>
            <DialogDescription>View your text or assessment content</DialogDescription>
          </DialogHeader>
          <ContentViewerLayout
            content={viewerContent}
            type={viewerType}
            onClose={() => setShowContentViewer(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ContentLibrary