import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Languages, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  BarChart3,
  Globe
} from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Translations",
      value: "125,847",
      change: "+12.5%",
      icon: Languages,
      color: "text-primary"
    },
    {
      title: "Active Projects", 
      value: "84",
      change: "+8.2%",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Users Reached",
      value: "2.3M",
      change: "+18.7%", 
      icon: Users,
      color: "text-success"
    },
    {
      title: "Languages Supported",
      value: "22",
      change: "Complete",
      icon: Globe,
      color: "text-warning"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Translated",
      content: "Electrical Safety Training Module",
      language: "Hindi → Tamil",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Processing", 
      content: "Automotive Repair Manual",
      language: "English → Bengali",
      time: "4 hours ago",
      status: "processing"
    },
    {
      id: 3,
      action: "Completed",
      content: "Healthcare Assistant Course",
      language: "English → Malayalam", 
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      action: "Reviewed",
      content: "Digital Marketing Fundamentals",
      language: "Hindi → Gujarati",
      time: "8 hours ago", 
      status: "review"
    }
  ]

  const languageProgress = [
    { language: "Hindi", progress: 95, count: "25,847" },
    { language: "Bengali", progress: 88, count: "18,234" },
    { language: "Tamil", progress: 82, count: "15,678" },
    { language: "Telugu", progress: 79, count: "14,523" },
    { language: "Gujarati", progress: 75, count: "12,890" },
    { language: "Marathi", progress: 71, count: "11,456" }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />
      case 'processing': return <Clock className="w-4 h-4 text-warning" />
      case 'review': return <AlertCircle className="w-4 h-4 text-accent" />
      default: return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your localization overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Link to="/translate">
            <Button className="gradient-primary text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              New Translation
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="professional-card hover:shadow-elegant transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Badge variant="secondary" className="text-xs mt-1 shadow-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="professional-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest translation and processing activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/40 transition-smooth">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.action}</span>
                      <Badge variant="outline" className="text-xs">{activity.language}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language Progress */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Language Progress
            </CardTitle>
            <CardDescription>
              Translation completion by language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageProgress.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{lang.language}</span>
                    <span className="text-xs text-muted-foreground">{lang.count} docs</span>
                  </div>
                  <Progress value={lang.progress} className="h-2" />
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">{lang.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/translate">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Languages className="w-6 h-6" />
                Text Translation
              </Button>
            </Link>
            <Link to="/content">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <FileText className="w-6 h-6" />
                Content Library
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard