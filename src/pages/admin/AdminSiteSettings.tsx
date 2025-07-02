import React, { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Loader2,
  Settings,
  Building2,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Timer,
  Star,
  ShieldCheck,
  Users as UsersIcon,
  Award,
  MapPin,
  Calendar,
  Percent,
  HeadphonesIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminSiteSettings = () => {
  const {
    data: siteSettings,
    isLoading,
    updateSiteSettings,
    isUpdating,
  } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    contactphone: "",
    address: "",
    response_time_stat: "",
    rating_stat: "",
    satisfaction_stat: "",
    happy_customers_stat: "",
    certified_experts_stat: "",
    customer_satisfaction_stat: "",
    cities_covered_stat: "",
    service_warranty_days: "",
    satisfaction_guarantee_percent: "",
    followup_support_text: "",
  });

  useEffect(() => {
    if (siteSettings) {
      console.log("Setting form data from site settings:", siteSettings);
      setFormData({
        name: siteSettings.name || "",
        description: siteSettings.description || "",
        email: siteSettings.email || "",
        contactphone: siteSettings.contactphone || "",
        address: siteSettings.address || "",
        response_time_stat: siteSettings.response_time_stat || "",
        rating_stat: siteSettings.rating_stat || "",
        satisfaction_stat: siteSettings.satisfaction_stat || "",
        happy_customers_stat: siteSettings.happy_customers_stat || "",
        certified_experts_stat: siteSettings.certified_experts_stat || "",
        customer_satisfaction_stat: siteSettings.customer_satisfaction_stat || "",
        cities_covered_stat: siteSettings.cities_covered_stat || "",
        service_warranty_days: siteSettings.service_warranty_days || "",
        satisfaction_guarantee_percent: siteSettings.satisfaction_guarantee_percent || "",
        followup_support_text: siteSettings.followup_support_text || "",
      });
    }
  }, [siteSettings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("Form field changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      await updateSiteSettings(formData);
      console.log("Site settings updated successfully");
      toast.success(
        "Site settings updated and will reflect across the website!"
      );
    } catch (error: unknown) {
      console.error("Error updating site settings:", error);
      const errorMessage =
        (error as { message?: string })?.message || "Please try again.";
      toast.error(`Failed to update settings: ${errorMessage}`);
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
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Settings className="w-5 h-5 text-onassist-primary" />
                Manage Your Site
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Update your business information and customer stats that appear
                throughout the website.
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-6 w-full bg-gray-50">
                  <TabsTrigger
                    value="general"
                    className="flex-1 text-sm gap-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-500" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1 text-sm gap-2">
                    <UsersIcon className="w-4 h-4 text-yellow-500" />
                    Customer Stats
                  </TabsTrigger>
                  <TabsTrigger value="category" className="flex-1 text-sm gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    Category Stats
                  </TabsTrigger>
                  <TabsTrigger value="service" className="flex-1 text-sm gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    Service Stats
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-lg">
                        Business Information
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-base font-medium flex items-center gap-2"
                      >
                        <Building2 className="w-4 h-4 text-blue-500" /> Business
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter business name"
                        required
                        className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-base font-medium flex items-center gap-2"
                      >
                        <MailIcon className="w-4 h-4 text-gray-400" /> Business
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter business description"
                        rows={3}
                        className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <MailIcon className="w-4 h-4 text-purple-500" />{" "}
                          Contact Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="support@example.com"
                          className="focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="contactphone"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <PhoneIcon className="w-4 h-4 text-green-500" />{" "}
                          Contact Phone
                        </Label>
                        <Input
                          id="contactphone"
                          name="contactphone"
                          value={formData.contactphone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-base font-medium flex items-center gap-2"
                      >
                        <MapPinIcon className="w-4 h-4 text-pink-500" />{" "}
                        Business Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, State, ZIP"
                        className="focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="stats">
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                      <UsersIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-lg">
                        Customer Stats
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="response_time_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Timer className="w-4 h-4 text-blue-500" /> Response
                          Time
                        </Label>
                        <Input
                          id="response_time_stat"
                          name="response_time_stat"
                          value={formData.response_time_stat}
                          onChange={handleChange}
                          placeholder="15 Min"
                          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="rating_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Star className="w-4 h-4 text-yellow-500" /> Customer
                          Rating
                        </Label>
                        <Input
                          id="rating_stat"
                          name="rating_stat"
                          value={formData.rating_stat}
                          onChange={handleChange}
                          placeholder="4.9/5"
                          className="focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="satisfaction_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-green-500" />{" "}
                          Satisfaction
                        </Label>
                        <Input
                          id="satisfaction_stat"
                          name="satisfaction_stat"
                          value={formData.satisfaction_stat}
                          onChange={handleChange}
                          placeholder="100%"
                          className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="happy_customers_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <UsersIcon className="w-4 h-4 text-pink-500" /> Happy
                          Customers
                        </Label>
                        <Input
                          id="happy_customers_stat"
                          name="happy_customers_stat"
                          value={formData.happy_customers_stat}
                          onChange={handleChange}
                          placeholder="10K+"
                          className="focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="category">
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-lg">
                        Category Page Stats
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="certified_experts_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Award className="w-4 h-4 text-blue-500" /> Certified
                          Experts
                        </Label>
                        <Input
                          id="certified_experts_stat"
                          name="certified_experts_stat"
                          value={formData.certified_experts_stat}
                          onChange={handleChange}
                          placeholder="50+"
                          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="customer_satisfaction_stat"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Star className="w-4 h-4 text-yellow-500" /> Customer
                          Satisfaction
                        </Label>
                        <Input
                          id="customer_satisfaction_stat"
                          name="customer_satisfaction_stat"
                          value={formData.customer_satisfaction_stat}
                          onChange={handleChange}
                          placeholder="4.9/5"
                          className="focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cities_covered_stat"
                        className="text-base font-medium flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-green-500" /> Cities
                        Covered
                      </Label>
                      <Input
                        id="cities_covered_stat"
                        name="cities_covered_stat"
                        value={formData.cities_covered_stat}
                        onChange={handleChange}
                        placeholder="100+"
                        className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="service">
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold text-lg">
                        Service Guarantee Section
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="service_warranty_days"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4 text-blue-500" /> Service
                          Warranty (Days)
                        </Label>
                        <Input
                          id="service_warranty_days"
                          name="service_warranty_days"
                          value={formData.service_warranty_days}
                          onChange={handleChange}
                          placeholder="30"
                          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="satisfaction_guarantee_percent"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          <Percent className="w-4 h-4 text-green-500" /> Satisfaction
                          Guarantee (%)
                        </Label>
                        <Input
                          id="satisfaction_guarantee_percent"
                          name="satisfaction_guarantee_percent"
                          value={formData.satisfaction_guarantee_percent}
                          onChange={handleChange}
                          placeholder="100"
                          className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="followup_support_text"
                        className="text-base font-medium flex items-center gap-2"
                      >
                        <HeadphonesIcon className="w-4 h-4 text-purple-500" /> Follow-up
                        Support Text
                      </Label>
                      <Input
                        id="followup_support_text"
                        name="followup_support_text"
                        value={formData.followup_support_text}
                        onChange={handleChange}
                        placeholder="Free follow-up support"
                        className="focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button
                type="submit"
                className="w-full mt-8 bg-onassist-primary hover:bg-onassist-primary/90 text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isUpdating}
                onClick={handleSubmit}
              >
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUpdating ? "Updating..." : "Update Site Settings"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSiteSettings;
