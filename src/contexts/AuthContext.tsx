
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

  // Check if user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (error) {
        return false;
      }
      
      return !!data;
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

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  // Create user profile manually
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

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return null;
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
        .update(data)
        .eq("id", user.id);

      if (!error) {
        // Refresh profile data after update
        refreshProfile();
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
            phone_number: data?.phoneNumber || "",
          },
        },
      });

      if (!error && authData.user) {
        console.log('User signed up successfully, creating profile...');
        
        // Create profile manually since trigger might not be working
        const profile = await createUserProfile(authData.user.id, data);
        
        if (profile) {
          setProfile(profile);
        }

        toast({
          title: "Account created successfully!",
          description: "Welcome to OnAssist. You can now start using our services.",
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

  // Sign in existing user
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
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
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in",
        });
      }

      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error };
    }
  };

  // Sign out user
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error signing out:", error);
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

        // For other auth state changes that need to fetch additional data,
        // use setTimeout to prevent deadlocks
        if (session?.user) {
          setTimeout(async () => {
            let profile = await fetchProfile(session.user.id);
            
            // If no profile exists, create one
            if (!profile) {
              console.log('No profile found, creating one...');
              profile = await createUserProfile(session.user.id, {
                firstName: session.user.user_metadata?.first_name,
                lastName: session.user.user_metadata?.last_name,
                phoneNumber: session.user.user_metadata?.phone_number
              });
            }
            
            setProfile(profile);
            
            const admin = await checkAdminRole(session.user.id);
            setIsAdmin(admin);
            
            setIsLoading(false);
          }, 0);
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
        // Use setTimeout for the same reason as above
        setTimeout(async () => {
          let profile = await fetchProfile(session.user.id);
          
          // If no profile exists, create one
          if (!profile) {
            console.log('No profile found during init, creating one...');
            profile = await createUserProfile(session.user.id, {
              firstName: session.user.user_metadata?.first_name,
              lastName: session.user.user_metadata?.last_name,
              phoneNumber: session.user.user_metadata?.phone_number
            });
          }
          
          setProfile(profile);
          
          const admin = await checkAdminRole(session.user.id);
          setIsAdmin(admin);
          
          setIsLoading(false);
        }, 0);
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
