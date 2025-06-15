
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Plus,
  Settings,
  MessageSquare,
  Package,
  BarChart3,
  UserPlus
} from "lucide-react";

const AdminDashboard = () => {
  // Fetch dashboard statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [usersRes, ordersRes, contactsRes, servicesRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("orders").select("id, total_amount", { count: "exact" }),
        supabase.from("contact_inquiries").select("id", { count: "exact" }),
        supabase.from("services").select("id", { count: "exact" })
      ]);

      const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;

      return {
        totalUsers: usersRes.count || 0,
        totalOrders: ordersRes.count || 0,
        totalRevenue,
        totalContacts: contactsRes.count || 0,
        totalServices: servicesRes.count || 0
      };
    },
  });

  const quickActions = [
    {
      title: "Add Service",
      description: "Create a new service offering",
      icon: Plus,
      href: "/admin/add-service",
      color: "bg-blue-500"
    },
    {
      title: "Add Category",
      description: "Create a new service category",
      icon: UserPlus,
      href: "/admin/add-category",
      color: "bg-green-500"
    },
    {
      title: "Site Settings",
      description: "Manage site configuration",
      icon: Settings,
      href: "/admin/site-settings",
      color: "bg-purple-500"
    },
    {
      title: "Analytics",
      description: "View detailed analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-orange-500"
    }
  ];

  const managementLinks = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      count: stats?.totalUsers
    },
    {
      title: "Manage Orders",
      description: "Process and track orders",
      icon: ShoppingBag,
      href: "/admin/orders",
      count: stats?.totalOrders
    },
    {
      title: "Manage Services",
      description: "Edit and organize services",
      icon: Package,
      href: "/admin/services",
      count: stats?.totalServices
    },
    {
      title: "Contact Inquiries",
      description: "Respond to customer inquiries",
      icon: MessageSquare,
      href: "/admin/contacts",
      count: stats?.totalContacts
    }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <a href="/admin/analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </a>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                Registered customers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
              <p className="text-xs text-muted-foreground">
                Orders processed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
              <p className="text-xs text-muted-foreground">
                Revenue generated
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalContacts || 0}</div>
              <p className="text-xs text-muted-foreground">
                Customer inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <a href={action.href} className="block">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Management Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {managementLinks.map((link) => (
              <Card key={link.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <a href={link.href} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <link.icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{link.title}</h3>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                      {link.count !== undefined && (
                        <div className="text-2xl font-bold text-onassist-primary">
                          {link.count}
                        </div>
                      )}
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
