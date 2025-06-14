
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, Phone, Eye, Search, Filter, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ContactInquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminContacts = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const { toast } = useToast();

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

  const { data: contacts, isLoading: contactsLoading, refetch } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactInquiry[];
    },
  });

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: "Contact inquiry status has been updated successfully.",
      });

      refetch();
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast({
        title: "Error",
        description: "Failed to update contact status.",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = 
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (contactsLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Inquiries</h1>
          <p className="text-gray-600">Manage customer contact form submissions and inquiries.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {contacts?.filter(c => c.status === 'new').length || 0}
              </div>
              <div className="text-sm text-gray-600">New Inquiries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {contacts?.filter(c => c.status === 'in_progress').length || 0}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {contacts?.filter(c => c.status === 'resolved').length || 0}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {contacts?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Total Inquiries</div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Inquiries ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {contact.first_name} {contact.last_name}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </div>
                          {contact.phone_number && (
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {contact.phone_number}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{contact.subject}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(contact.created_at), 'hh:mm a')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Contact Inquiry Details</DialogTitle>
                              </DialogHeader>
                              {selectedContact && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Name</label>
                                      <p>{selectedContact.first_name} {selectedContact.last_name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Email</label>
                                      <p>{selectedContact.email}</p>
                                    </div>
                                    {selectedContact.phone_number && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                        <p>{selectedContact.phone_number}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Date</label>
                                      <p>{format(new Date(selectedContact.created_at), 'PPP')}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Subject</label>
                                    <p>{selectedContact.subject}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Message</label>
                                    <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">
                                      {selectedContact.message}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <div className="mt-2">
                                      <Select
                                        value={selectedContact.status}
                                        onValueChange={(value) => updateContactStatus(selectedContact.id, value)}
                                      >
                                        <SelectTrigger className="w-48">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="new">New</SelectItem>
                                          <SelectItem value="in_progress">In Progress</SelectItem>
                                          <SelectItem value="resolved">Resolved</SelectItem>
                                          <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contact inquiries found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search criteria.' 
                    : 'Contact inquiries will appear here when customers submit the contact form.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminContacts;
