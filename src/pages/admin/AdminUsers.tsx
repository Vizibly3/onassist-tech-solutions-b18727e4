
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Shield, ShieldCheck, Search, Filter } from 'lucide-react';

interface UserRole {
  user_id: string;
  role: string;
}

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
  role?: string;
}

const AdminUsers = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

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

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch user roles separately
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
      }

      const usersWithRole = profiles?.map(profile => {
        const userRole = userRoles?.find((ur: UserRole) => ur.user_id === profile.id);
        
        return {
          ...profile,
          role: userRole?.role || 'customer'
        };
      }) || [];

      setUsers(usersWithRole);
    } catch (error: any) {
      console.error('Fetch users error:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users: ' + error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(userProfile => {
        const fullName = `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.toLowerCase();
        const phone = userProfile.phone_number || '';
        const location = `${userProfile.city || ''} ${userProfile.state || ''}`.toLowerCase();
        
        return fullName.includes(searchTerm.toLowerCase()) ||
               phone.includes(searchTerm) ||
               location.includes(searchTerm.toLowerCase());
      });
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(userProfile => userProfile.role === roleFilter);
    }

    setFilteredUsers(filtered);
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

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users List ({filteredUsers.length} users)</CardTitle>
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
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((userProfile) => (
                    <TableRow key={userProfile.id}>
                      <TableCell className="font-medium">
                        {userProfile.first_name && userProfile.last_name
                          ? `${userProfile.first_name} ${userProfile.last_name}`
                          : 'N/A'}
                      </TableCell>
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
