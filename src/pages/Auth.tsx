import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Globe, Sparkles, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  
  const { user, signIn, signUp, demoSignIn, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, displayName);
      }

      if (result.error) {
        if (result.error.message.includes('User already registered')) {
          toast({
            title: "User Already Registered",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
          if (!isLogin) {
            setIsLogin(true);
          }
        } else {
          toast({
            title: "Authentication Error",
            description: result.error.message,
            variant: "destructive",
          });
        }
      } else {
        if (!isLogin) {
          toast({
            title: "Account Created",
            description: "Please check your email to confirm your account.",
          });
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setDemoLoading(true);
    try {
      const result = await demoSignIn();
      if (result.error) {
        toast({
          title: "Demo Sign In Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Signed in as demo user successfully.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with demo account.",
        variant: "destructive",
      });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle relative">
      {/* Corner Buttons */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          variant={isLogin ? "default" : "ghost"} 
          size="sm"
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </Button>
        <Button 
          variant={!isLogin ? "default" : "ghost"} 
          size="sm"
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </Button>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 gradient-hero rounded-xl flex items-center justify-center">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">NCVET AI</h1>
                  <p className="text-sm text-muted-foreground">Localization Engine</p>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {isLogin 
                ? 'Access your multilingual content platform' 
                : 'Join the AI-powered localization platform'
              }
            </p>
          </div>

          {/* Demo Button - Prominent */}
          <Card className="professional-card border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Try Demo Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore all features with our demo account - no registration required
                  </p>
                </div>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="w-full" 
                  onClick={handleDemoSignIn}
                  disabled={demoLoading}
                >
                  {demoLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auth Card */}
          <Card className="professional-card">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </CardTitle>
              <CardDescription className="text-base">
                {isLogin 
                  ? 'Enter your credentials to continue' 
                  : 'Create your account to get started'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-3 text-muted-foreground">
                    Or use your email
                  </span>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={!isLogin}
                      className="h-11"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-12" 
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;