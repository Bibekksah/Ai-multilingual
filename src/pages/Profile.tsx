import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Settings, 
  Shield,
  Bell,
  Languages,
  Save,
  Edit,
  Award
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Profile = () => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@ncvet.gov.in",
    phone: "+91-9876543210",
    location: "New Delhi, India",
    organization: "National Council for Vocational Education and Training",
    role: "Senior Training Specialist",
    bio: "Experienced educator with 15+ years in vocational training development. Passionate about making quality education accessible across India's diverse linguistic landscape.",
    preferredLanguages: ["hindi", "english", "tamil"],
    notifications: {
      email: true,
      push: true,
      weekly: false
    }
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    })
  }

  const stats = [
    {
      title: "Translations Completed",
      value: "2,847",
      icon: Languages,
      color: "text-primary"
    },
    {
      title: "Languages Worked",
      value: "12",
      icon: Award,
      color: "text-accent"
    },
    {
      title: "Projects Led",
      value: "34",
      icon: Building,
      color: "text-success"
    },
    {
      title: "Quality Score",
      value: "98.5%",
      icon: Shield,
      color: "text-warning"
    }
  ]

  const recentActivity = [
    {
      action: "Completed translation review",
      content: "Digital Marketing Course - Hindi",
      time: "2 hours ago"
    },
    {
      action: "Started new project",
      content: "Automotive Training Module",
      time: "1 day ago"
    },
    {
      action: "Updated language preferences",
      content: "Added Gujarati support",
      time: "3 days ago"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "gradient-primary text-white" : ""}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-spring">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => setProfile({...profile, organization: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified about translation updates via email</p>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  onCheckedChange={(checked) => 
                    setProfile({
                      ...profile, 
                      notifications: {...profile.notifications, email: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive instant notifications in your browser</p>
                </div>
                <Switch
                  checked={profile.notifications.push}
                  onCheckedChange={(checked) => 
                    setProfile({
                      ...profile, 
                      notifications: {...profile.notifications, push: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Weekly Summary</h4>
                  <p className="text-sm text-muted-foreground">Get weekly reports of your translation activities</p>
                </div>
                <Switch
                  checked={profile.notifications.weekly}
                  onCheckedChange={(checked) => 
                    setProfile({
                      ...profile, 
                      notifications: {...profile.notifications, weekly: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferred Languages</CardTitle>
              <CardDescription>
                Languages you work with most frequently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant="secondary" className="mr-2">Hindi</Badge>
                <Badge variant="secondary" className="mr-2">English</Badge>
                <Badge variant="secondary" className="mr-2">Tamil</Badge>
                {isEditing && (
                  <Button variant="outline" size="sm" className="mt-2">
                    Add Language
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest translation activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    {index < recentActivity.length - 1 && <hr className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile