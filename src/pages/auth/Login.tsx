
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { config } = useDynamicSiteConfig();

  useEffect(() => {
    // Check if user is already authenticated and redirect
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/', { replace: true });
      }
    };
    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and confirm your account before signing in.');
      } else if (error.message.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment and try again.');
      } else {
        setError(error.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !email) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess('Password reset email sent! Please check your email for instructions.');
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | {config.name}</title>
        <meta name="description" content={`Sign in to your ${config.name} account to access premium tech support services.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors">
              <h1 className="text-4xl font-bold mb-2">{config.name}</h1>
              <p className="text-white/80">Professional Tech Support</p>
            </Link>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                {forgotPasswordMode ? 'Reset Password' : 'Welcome Back'}
              </CardTitle>
              <p className="text-gray-600 text-center">
                {forgotPasswordMode 
                  ? 'Enter your email to receive reset instructions'
                  : 'Sign in to your account to continue'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={forgotPasswordMode ? handleForgotPassword : handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 focus:ring-2 focus:ring-onassist-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {!forgotPasswordMode && (
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 focus:ring-2 focus:ring-onassist-primary"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white font-bold text-lg shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {forgotPasswordMode ? 'Sending...' : 'Signing In...'}
                    </>
                  ) : (
                    <>
                      {forgotPasswordMode ? 'Send Reset Email' : 'Sign In'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {!forgotPasswordMode && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMode(true)}
                      className="text-sm text-onassist-primary hover:text-onassist-primary/80 font-medium"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                {forgotPasswordMode && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotPasswordMode(false);
                        setError('');
                        setSuccess('');
                      }}
                      className="text-sm text-onassist-primary hover:text-onassist-primary/80 font-medium"
                    >
                      Back to Sign In
                    </button>
                  </div>
                )}
              </form>

              {!forgotPasswordMode && (
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/auth/register"
                      className="text-onassist-primary hover:text-onassist-primary/80 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link to="/" className="text-white/80 hover:text-white text-sm">
              ← Back to {config.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
