import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useServices, useServiceCategories } from '@/hooks/useServices';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const AdminServices = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const { data: services, isLoading: servicesLoading, refetch } = useServices();
  const { data: categories } = useServiceCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    image_url: '',
    category_id: '',
    popular: false,
    active: true
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        
        if (error) throw error;
        toast({ title: 'Service updated successfully!' });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);
        
        if (error) throw error;
        toast({ title: 'Service created successfully!' });
      }
      
      setIsDialogOpen(false);
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        image_url: '',
        category_id: '',
        popular: false,
        active: true
      });
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration,
      image_url: service.image_url,
      category_id: service.category_id,
      popular: service.popular,
      active: service.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this service?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .update({ active: false })
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Service deactivated successfully!' });
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      image_url: '',
      category_id: '',
      popular: false,
      active: true
    });
    setIsDialogOpen(true);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category?.title || 'Unknown';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600">Manage your services</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 1-2 hours"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, popular: checked as boolean })
                      }
                    />
                    <Label htmlFor="popular">Popular Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, active: checked as boolean })
                      }
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingService ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Services List</CardTitle>
          </CardHeader>
          <CardContent>
            {servicesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-onassist-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services?.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{getCategoryName(service.category_id)}</TableCell>
                      <TableCell>${service.price}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {service.active && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Active
                            </span>
                          )}
                          {service.popular && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              Popular
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
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

export default AdminServices;
