
import React, { useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminSiteSettings = () => {
  const { data, isLoading, updateSiteSettings } = useSiteSettings();
  const [form, setForm] = useState<any>(data);

  React.useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (e: any) => {
    setForm((f: any) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateSiteSettings(form);
      toast({ title: "Success!", description: "Site settings updated." });
    } catch (err) {
      toast({ title: "Error", description: (err as any).message, variant: "destructive" });
    }
  };

  if (isLoading || !form) return (
    <Layout>
      <div className="p-8">Loading...</div>
    </Layout>
  );

  return (
    <Layout>
      <Card className="max-w-xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Name</Label><Input name="name" value={form.name} onChange={handleChange} /></div>
            <div><Label>Description</Label><Input name="description" value={form.description} onChange={handleChange} /></div>
            <div><Label>Contact Phone</Label><Input name="contactPhone" value={form.contactPhone} onChange={handleChange} /></div>
            <div><Label>Email</Label><Input name="email" value={form.email} onChange={handleChange} /></div>
            <div><Label>Address</Label><Input name="address" value={form.address} onChange={handleChange} /></div>
            <Button type="submit" className="w-full">Update Settings</Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}
export default AdminSiteSettings;
