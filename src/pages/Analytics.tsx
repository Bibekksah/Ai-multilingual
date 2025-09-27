import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Languages,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

const Analytics = () => {
  const overview = [
    {
      title: "Total Translations",
      value: "125,847",
      change: "+12.5%",
      trend: "up",
      icon: Languages
    },
    {
      title: "Active Users",
      value: "2,347",
      change: "+8.2%", 
      trend: "up",
      icon: Users
    },
    {
      title: "Content Processed",
      value: "89.2GB",
      change: "+18.7%",
      trend: "up",
      icon: FileText
    },
    {
      title: "Quality Score",
      value: "96.8%",
      change: "+2.1%",
      trend: "up", 
      icon: CheckCircle
    }
  ]

  const languageStats = [
    { language: "Hindi", translations: 25847, percentage: 89, quality: 96.5 },
    { language: "Bengali", translations: 18234, percentage: 75, quality: 95.2 },
    { language: "Tamil", translations: 15678, percentage: 68, quality: 94.8 },
    { language: "Telugu", translations: 14523, percentage: 62, quality: 95.7 },
    { language: "Gujarati", translations: 12890, percentage: 58, quality: 96.1 },
    { language: "Marathi", translations: 11456, percentage: 55, quality: 95.9 }
  ]

  const contentTypeAnalysis = [
    { type: "Text Documents", processed: 45678, pending: 2344, quality: 97.2 },
    { type: "Audio Files", processed: 12456, pending: 456, quality: 94.8 },
    { type: "Video Content", processed: 5678, pending: 234, quality: 93.5 },
    { type: "Assessments", processed: 23456, pending: 1234, quality: 98.1 }
  ]

  const recentTrends = [
    {
      period: "This Week",
      translations: 2847,
      quality: 97.2,
      users: 234,
      trend: "up"
    },
    {
      period: "Last Week", 
      translations: 2654,
      quality: 96.8,
      users: 218,
      trend: "up"
    },
    {
      period: "2 Weeks Ago",
      translations: 2398,
      quality: 96.1,
      users: 201,
      trend: "up"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your localization performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overview.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-spring">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="text-xs mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Language Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language Performance
            </CardTitle>
            <CardDescription>
              Translation volume and quality by language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {languageStats.map((lang, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{lang.language}</span>
                  <div className="text-right text-sm">
                    <div className="font-medium">{lang.translations.toLocaleString()}</div>
                    <div className="text-muted-foreground">Quality: {lang.quality}%</div>
                  </div>
                </div>
                <Progress value={lang.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Content Type Analysis
            </CardTitle>
            <CardDescription>
              Processing status and quality metrics by content type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {contentTypeAnalysis.map((content, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{content.type}</span>
                  <Badge variant="outline" className="text-xs">
                    {content.quality}% Quality
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processed: {content.processed.toLocaleString()}</span>
                  <span>Pending: {content.pending.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(content.processed / (content.processed + content.pending)) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Performance Trends
          </CardTitle>
          <CardDescription>
            Weekly performance indicators and growth metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <div className="space-y-1">
                  <h4 className="font-medium">{trend.period}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{trend.translations} translations</span>
                    <span>•</span>
                    <span>{trend.quality}% quality</span>
                    <span>•</span>
                    <span>{trend.users} active users</span>
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Growing
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>
            AI-generated insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-success">Excellent Performance</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Hindi translations are performing exceptionally well with 96.5% quality score and high user engagement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Opportunity for Improvement</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Video content translations could benefit from additional cultural adaptation to improve user satisfaction.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10">
              <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-accent">Growth Opportunity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider expanding support for regional dialects in high-performing languages like Tamil and Bengali.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics