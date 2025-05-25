
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  created_at: string;
  email?: string;
  role?: string;
}

const AdminUsers = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-onassist-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles with user roles using a proper join
      const { data: profilesWithRoles, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner(role)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles with roles:', error);
        // Fallback: fetch profiles without roles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profilesError) throw profilesError;

        // Get auth users for email information
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          console.error('Error fetching auth users:', authError);
        }

        const usersWithEmail = profiles?.map(profile => {
          const authUser = authUsers?.users.find(au => au.id === profile.id);
          return {
            ...profile,
            email: authUser?.email || 'N/A',
            role: 'customer'
          };
        }) || [];

        setUsers(usersWithEmail);
        return;
      }

      // Get auth users for email information
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
      }

      const usersWithEmail = profilesWithRoles?.map(profile => {
        const authUser = authUsers?.users.find(au => au.id === profile.id);
        const userRole = Array.isArray(profile.user_roles) && profile.user_roles.length > 0 
          ? profile.user_roles[0].role 
          : 'customer';
        
        return {
          ...profile,
          email: authUser?.email || 'N/A',
          role: userRole
        };
      }) || [];

      setUsers(usersWithEmail);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users: ' + error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'customer' : 'admin';
      
      if (newRole === 'admin') {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .upsert({
            user_id: userId,
            role: 'admin'
          });
        
        if (error) throw error;
      } else {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      }
      
      toast({
        title: 'Success',
        description: `User role updated to ${newRole}`
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage user accounts and roles</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-onassist-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((userProfile) => (
                    <TableRow key={userProfile.id}>
                      <TableCell className="font-medium">
                        {userProfile.first_name && userProfile.last_name
                          ? `${userProfile.first_name} ${userProfile.last_name}`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{userProfile.email}</TableCell>
                      <TableCell>{userProfile.phone_number || 'N/A'}</TableCell>
                      <TableCell>
                        {userProfile.city && userProfile.state
                          ? `${userProfile.city}, ${userProfile.state}`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={userProfile.role === 'admin' ? 'default' : 'secondary'}>
                          {userProfile.role === 'admin' ? (
                            <>
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              Customer
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(userProfile.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={userProfile.role === 'admin' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => toggleUserRole(userProfile.id, userProfile.role || 'customer')}
                          disabled={userProfile.id === user?.id}
                        >
                          {userProfile.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;
