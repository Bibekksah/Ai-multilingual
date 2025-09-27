import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignIn = () => {
  const { signIn, demoSignIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setErrorMsg(error.message || 'Failed to sign in');
    } else {
      navigate('/content-library');
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    const { error } = await demoSignIn();
    setLoading(false);
    if (error) {
      setErrorMsg(error.message || 'Failed to sign in as demo user');
    } else {
      navigate('/content-library');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={handleDemoSignIn} disabled={loading}>
          {loading ? 'Signing in...' : 'Demo Sign In'}
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
