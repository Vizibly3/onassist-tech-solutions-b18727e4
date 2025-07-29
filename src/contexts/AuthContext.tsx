
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, data?: { firstName?: string; lastName?: string; phoneNumber?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { config } = useDynamicSiteConfig();

  // Check if user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      return !!data && !error;
    } catch (error) {
      return false;
    }
  };

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  // Create user profile manually with retry mechanism
  const createUserProfile = async (userId: string, userData?: { firstName?: string; lastName?: string; phoneNumber?: string }) => {
    try {
      console.log('Creating profile for user:', userId, userData);
      
      const profileData = {
        id: userId,
        first_name: userData?.firstName || '',
        last_name: userData?.lastName || '',
        phone_number: userData?.phoneNumber || '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      };

      // First try to insert the profile
      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        
        // If insert fails, try upsert
        const { data: upsertData, error: upsertError } = await supabase
          .from('profiles')
          .upsert(profileData)
          .select()
          .single();

        if (upsertError) {
          console.error('Error upserting profile:', upsertError);
          return null;
        }

        console.log('Profile upserted successfully:', upsertData);
        return upsertData;
      }

      console.log('Profile created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      return null;
    }
  };

  // Refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    const profile = await fetchProfile(user.id);
    if (profile) {
      setProfile(profile);
    }
    
    const admin = await checkAdminRole(user.id);
    setIsAdmin(admin);
  };

  // Update user profile
  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        await refreshProfile();
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      }

      return { error };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error };
    }
  };

  // Sign up a new user
  const signUp = async (
    email: string,
    password: string,
    data?: { firstName?: string; lastName?: string; phoneNumber?: string }
  ) => {
    try {
      console.log('Signing up user with data:', data);
      
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: data?.firstName || "",
            last_name: data?.lastName || "",
            phone: data?.phoneNumber || "",
          },
        },
      });

      if (!error && authData.user) {
        console.log('User signed up successfully, creating profile...');
        
        // Wait a bit for the auth user to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create profile manually
        const profile = await createUserProfile(authData.user.id, data);
        
        if (profile) {
          setProfile(profile);
        }

        toast({
          title: "Account created successfully!",
          description: `Welcome to ${config.name}. You can now start using our services.`,
        });
      } else if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error) {
      console.error("Error signing up:", error);
      return { error };
    }
  };

  // Sign in existing user with admin check
  const signIn = async (email: string, password: string) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login failed",
          description: error.message === 'Invalid login credentials' 
            ? "Incorrect email or password. Please try again." 
            : error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (authData.user) {
        // Check if user is admin and redirect accordingly
        const isAdmin = await checkAdminRole(authData.user.id);
        
        if (isAdmin) {
          toast({
            title: "Welcome back, Admin!",
            description: "Redirecting to admin dashboard...",
          });
          // Redirect to admin dashboard
          window.location.href = "/admin/dashboard";
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in",
          });
        }
      }

      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error };
    }
  };

  // Sign out user with proper redirect
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      // Clear all state
      setSession(null);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });

      // Redirect to home page after sign out
      window.location.href = "/";
      
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out error",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Set up auth state listener
  useEffect(() => {
    setIsLoading(true);

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(async () => {
            let profile = await fetchProfile(session.user.id);
            
            // If no profile exists, create one
            if (!profile) {
              console.log('No profile found, creating one...');
              profile = await createUserProfile(session.user.id, {
                firstName: session.user.user_metadata?.first_name,
                lastName: session.user.user_metadata?.last_name,
                phoneNumber: session.user.user_metadata?.phone || session.user.phone
              });
            }
            
            setProfile(profile);
            
            const admin = await checkAdminRole(session.user.id);
            setIsAdmin(admin);
            
            setIsLoading(false);
          }, 500);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(async () => {
          let profile = await fetchProfile(session.user.id);
          
          if (!profile) {
            console.log('No profile found during init, creating one...');
            profile = await createUserProfile(session.user.id, {
              firstName: session.user.user_metadata?.first_name,
              lastName: session.user.user_metadata?.last_name,
              phoneNumber: session.user.user_metadata?.phone || session.user.phone
            });
          }
          
          setProfile(profile);
          
          const admin = await checkAdminRole(session.user.id);
          setIsAdmin(admin);
          
          setIsLoading(false);
        }, 500);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
        isLoading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
