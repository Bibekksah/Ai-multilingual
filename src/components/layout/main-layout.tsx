import { HeaderNav } from "./header-nav"
import { Languages } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Languages className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">NCVET</h3>
                  <p className="text-xs text-muted-foreground">AI Localization</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering vocational education through AI-powered multilingual content localization.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/translate" className="hover:text-foreground transition-smooth">Translation Hub</a></li>
                <li><a href="/content" className="hover:text-foreground transition-smooth">Content Library</a></li>
                <li><a href="/analytics" className="hover:text-foreground transition-smooth">Analytics</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Help Center</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Organization</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">About NCVET</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="my-6 border-border/60" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 National Council for Vocational Education and Training. All rights reserved.</p>
            <p>Supporting 22+ Indian languages with cultural adaptation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}