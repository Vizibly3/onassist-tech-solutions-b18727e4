
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';

import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      console.log('Starting registration process...');
      
      // Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        setAuthError(signUpError.message);
        return;
      }

      console.log('User signed up successfully:', authData.user?.id);

      // If user is created, manually create profile (as backup to trigger)
      if (authData.user) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              first_name: data.firstName,
              last_name: data.lastName,
              phone_number: '',
              address: '',
              city: '',
              state: '',
              zip_code: ''
            });

          if (profileError && profileError.code !== '23505') { // 23505 is duplicate key error
            console.error('Profile creation error:', profileError);
          } else {
            console.log('Profile created successfully');
          }
        } catch (profileErr) {
          console.log('Profile creation handled by trigger or already exists');
        }
      }

      toast.success('Account created successfully! Please check your email to confirm your account.');
      navigate('/auth/login');
      
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthError(error.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Register | OnAssist</title>
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
          
          {authError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Create a password" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-2" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Register'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="px-0" 
                    onClick={() => navigate('/auth/login')}
                  >
                    Log In
                  </Button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
