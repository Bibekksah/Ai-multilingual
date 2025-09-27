import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/main-layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import TranslationHub from "./pages/TranslationHub";
import ContentLibrary from "./pages/ContentLibrary";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
// import UsersPage from "./pages/UserPage"; // Import the UsersPage component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <Home />
              </MainLayout>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/translate" element={
              <ProtectedRoute>
                <MainLayout>
                  <TranslationHub />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/content" element={
              <ProtectedRoute>
                <MainLayout>
                  <ContentLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/content/text" element={
              <ProtectedRoute>
                <MainLayout>
                  <ContentLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/content/audio" element={
              <ProtectedRoute>
                <MainLayout>
                  <ContentLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/content/video" element={
              <ProtectedRoute>
                <MainLayout>
                  <ContentLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/content/assessments" element={
              <ProtectedRoute>
                <MainLayout>
                  <ContentLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout>
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
