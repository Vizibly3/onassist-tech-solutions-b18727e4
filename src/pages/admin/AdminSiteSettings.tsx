
import React, { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Settings, Phone, Mail, MapPin, Building } from "lucide-react";

const AdminSiteSettings = () => {
  const { data: siteSettings, isLoading, updateSiteSettings, isUpdating } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    contactphone: '',
    address: ''
  });

  useEffect(() => {
    if (siteSettings) {
      console.log('Setting form data from site settings:', siteSettings);
      setFormData({
        name: siteSettings.name || '',
        description: siteSettings.description || '',
        email: siteSettings.email || '',
        contactphone: siteSettings.contactphone || '',
        address: siteSettings.address || ''
      });
    }
  }, [siteSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('Form field changed:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    
    try {
      await updateSiteSettings(formData);
      console.log('Site settings updated successfully');
      toast.success('Site settings updated and will reflect across the website!');
    } catch (error: any) {
      console.error('Error updating site settings:', error);
      toast.error(`Failed to update settings: ${error.message || 'Please try again.'}`);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-8 h-8 text-onassist-primary" />
            <h1 className="text-3xl font-bold">Site Settings</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business Information
              </CardTitle>
              <p className="text-gray-600">
                Update your business information that appears throughout the website
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Business Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter business name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Business Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter business description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="support@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactphone" className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact Phone
                    </Label>
                    <Input
                      id="contactphone"
                      name="contactphone"
                      value={formData.contactphone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Business Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-onassist-primary hover:bg-onassist-primary/90" 
                  disabled={isUpdating}
                >
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isUpdating ? 'Updating...' : 'Update Site Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSiteSettings;
