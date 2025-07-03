
import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Search, Filter, Eye, Edit, Trash } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

const PAGE_SIZE = 10;

const NewsletterSubscribersPage: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: ''
  });

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
    const fetchSubscribers = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from("newsletter_subscribers")
          .select("*")
          .eq('active', true)
          .order("subscribed_at", { ascending: false });
        const { data, error } = await query;
        if (!error && data) {
          setSubscribers(data as Subscriber[]);
        } else {
          console.error('Error fetching subscribers:', error);
          setSubscribers([]);
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        setSubscribers([]);
      }
      setLoading(false);
    };
    fetchSubscribers();
  }, []);

  const handleEdit = (subscriber: Subscriber) => {
    setEditingSubscriber(subscriber);
    setEditFormData({
      email: subscriber.email
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubscriber) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update(editFormData)
        .eq('id', editingSubscriber.id);

      if (error) throw error;

      toast({
        title: "Subscriber updated",
        description: "Newsletter subscriber has been updated successfully.",
      });

      setIsEditDialogOpen(false);
      setEditingSubscriber(null);
      
      // Refresh the data
      const { data } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq('active', true)
        .order("subscribed_at", { ascending: false });
      if (data) setSubscribers(data);
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to update newsletter subscriber.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this newsletter subscriber?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ active: false })
        .eq('id', subscriberId);

      if (error) throw error;

      toast({
        title: "Subscriber deleted",
        description: "Newsletter subscriber has been deleted successfully.",
      });

      // Refresh the data
      const { data } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq('active', true)
        .order("subscribed_at", { ascending: false });
      if (data) setSubscribers(data);
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to delete newsletter subscriber.",
        variant: "destructive",
      });
    }
  };

  // Filter and search logic
  const filteredSubscribers = useMemo(() => {
    let filtered = subscribers;
    if (search) {
      filtered = filtered.filter((s) =>
        s.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter) {
      // Add more filter logic here if needed
      filtered = filtered.filter((s) => s.email.endsWith(filter));
    }
    return filtered;
  }, [subscribers, search, filter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSubscribers.length / PAGE_SIZE);
  const paginatedSubscribers = filteredSubscribers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Download as Excel
  const handleDownload = () => {
    const header = ["Email", "Subscribed At"];
    const rows = filteredSubscribers.map((s) => [s.email, s.subscribed_at]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Card className="shadow-xl border-0">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold text-onassist-primary">
                Newsletter Subscribers
              </CardTitle>
              <p className="text-gray-500 text-sm mt-1">
                All users who have subscribed to your newsletter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <Input
                type="text"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-56"
              />
              <Input
                type="text"
                placeholder="Filter by domain (e.g. gmail.com)"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
                className="w-56"
              />
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscribed At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-gray-400"
                      >
                        Loading subscribers...
                      </td>
                    </tr>
                  ) : paginatedSubscribers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-gray-400"
                      >
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    paginatedSubscribers.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(page - 1) * PAGE_SIZE + idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {s.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(s.subscribed_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedSubscriber(s)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Subscriber Details</DialogTitle>
                                </DialogHeader>
                                {selectedSubscriber && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Email</label>
                                      <p>{selectedSubscriber.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Subscribed At</label>
                                      <p>{new Date(selectedSubscriber.subscribed_at).toLocaleString()}</p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(s)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(s.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * PAGE_SIZE + 1} -{" "}
                {Math.min(page * PAGE_SIZE, filteredSubscribers.length)} of{" "}
                {filteredSubscribers.length} subscribers
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="px-2 py-1 text-gray-700 bg-gray-100 rounded">
                  Page {page} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Newsletter Subscriber</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Subscriber
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default NewsletterSubscribersPage;
