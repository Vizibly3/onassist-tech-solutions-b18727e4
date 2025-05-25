
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useServiceCategories } from '@/hooks/useServices';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const AddService = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { data: categories } = useServiceCategories();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const { error } = await supabase
        .from('services')
        .insert([serviceData]);
      
      if (error) throw error;
      
      toast({ title: 'Service created successfully!' });
      navigate('/admin/services');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/services')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
          <p className="text-gray-600">Create a new service offering</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Service Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Smart Speaker Setup"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
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
                <Label htmlFor="description">Service Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this service includes..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.99"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration *</Label>
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
                <Label htmlFor="image_url">Service Image URL *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use high-quality tech-related images from Unsplash
                </p>
              </div>
              
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, popular: checked as boolean })
                    }
                  />
                  <Label htmlFor="popular">Mark as Popular Service</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, active: checked as boolean })
                    }
                  />
                  <Label htmlFor="active">Service Active</Label>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/services')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.category_id}
                  className="flex-1"
                >
                  {loading ? 'Creating...' : 'Create Service'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddService;
