import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Languages, 
  Home, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  User,
  BookOpen,
  Headphones,
  Video,
  FileCheck,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown
} from "lucide-react"
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
      navigate('/')
    }
  }

  const mainItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Translation Hub", url: "/translate", icon: Languages },
    { title: "Content Library", url: "/content", icon: FileText },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ]

  const contentItems = [
    { title: "Text Content", url: "/content/text", icon: BookOpen },
    { title: "Audio Content", url: "/content/audio", icon: Headphones },
    { title: "Video Content", url: "/content/video", icon: Video },
    { title: "Assessments", url: "/content/assessments", icon: FileCheck },
  ]

  const isActive = (path: string) => currentPath === path
  const getNavCls = (path: string) =>
    cn(
      "relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2",
      isActive(path) 
        ? "bg-primary text-primary-foreground shadow-sm" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
    )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">NCVET</h1>
              <p className="text-xs text-muted-foreground -mt-1">AI Localization Engine</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainItems.map((item) => (
              <NavLink key={item.title} to={item.url} end className={getNavCls(item.url)}>
                <item.icon className="w-4 h-4" />
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-lg max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-0 outline-none text-sm flex-1 placeholder:text-muted-foreground"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">
                      {user.user_metadata?.display_name || 'Account'}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <NavLink to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NavLink to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/60">
            <div className="space-y-2">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Main Navigation
              </div>
              {mainItems.map((item) => (
                <NavLink 
                  key={item.title} 
                  to={item.url} 
                  end 
                  className={getNavCls(item.url)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </NavLink>
              ))}
              
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-4">
                Content Types
              </div>
              {contentItems.map((item) => (
                <NavLink 
                  key={item.title} 
                  to={item.url} 
                  className={getNavCls(item.url)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Type Sub-navigation (only show on content routes) */}
      {currentPath.startsWith('/content') && (
        <div className="hidden lg:block border-t border-border/60 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 py-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-4">
                Content Types
              </div>
              {contentItems.map((item) => (
                <NavLink key={item.title} to={item.url} className={getNavCls(item.url)}>
                  <item.icon className="w-3 h-3" />
                  <span className="text-xs">{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}