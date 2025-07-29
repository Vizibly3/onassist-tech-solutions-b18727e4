import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
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
  UserPlus,
  Globe,
  Activity,
  Star,
  Calendar,
  Zap,
  ClipboardList,
  FileText,
  Mail,
} from "lucide-react";

interface Order {
  id: string;
  total_amount: number;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();

  // Fetch dashboard statistics with better error handling
  const {
    data: stats,
    isLoading: statsLoading,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      console.log("Fetching admin stats...");

      try {
        // Use Promise.allSettled instead of Promise.all to handle individual failures
        const [
          usersRes,
          ordersRes,
          contactsRes,
          servicesRes,
          categoryLeadsRes,
          serviceLeadsRes,
        ] = await Promise.allSettled([
          supabase.from("profiles").select("id", { count: "exact" }),
          supabase
            .from("orders")
            .select("id, total_amount", { count: "exact" }),
          supabase.from("contact_inquiries").select("id", { count: "exact" }),
          supabase.from("services").select("id", { count: "exact" }),
          supabase
            .from("category_service_leads")
            .select("id", { count: "exact" }),
          supabase.from("service_leads").select("id", { count: "exact" }),
        ]);

        console.log("Stats results:", {
          usersRes,
          ordersRes,
          contactsRes,
          servicesRes,
          categoryLeadsRes,
          serviceLeadsRes,
        });

        // Extract data from settled promises
        const users =
          usersRes.status === "fulfilled" && !usersRes.value.error
            ? usersRes.value
            : { count: 0, data: [] };
        const orders =
          ordersRes.status === "fulfilled" && !ordersRes.value.error
            ? ordersRes.value
            : { count: 0, data: [] };
        const contacts =
          contactsRes.status === "fulfilled" && !contactsRes.value.error
            ? contactsRes.value
            : { count: 0, data: [] };
        const services =
          servicesRes.status === "fulfilled" && !servicesRes.value.error
            ? servicesRes.value
            : { count: 0, data: [] };
        const categoryLeads =
          categoryLeadsRes.status === "fulfilled" &&
          !categoryLeadsRes.value.error
            ? categoryLeadsRes.value
            : { count: 0, data: [] };
        const serviceLeads =
          serviceLeadsRes.status === "fulfilled" && !serviceLeadsRes.value.error
            ? serviceLeadsRes.value
            : { count: 0, data: [] };

        // Fix the totalRevenue calculation
        let totalRevenue = 0;
        if (orders.data && Array.isArray(orders.data)) {
          totalRevenue = orders.data
            .map(
              (order: { total_amount: number }) =>
                parseFloat(String(order.total_amount)) || 0
            )
            .reduce((sum: number, amount: number) => sum + amount, 0);
        }

        return {
          totalUsers: users.count || 0,
          totalOrders: orders.count || 0,
          totalRevenue,
          totalContacts: contacts.count || 0,
          totalServices: services.count || 0,
          totalCategoryLeads: categoryLeads.count || 0,
          totalServiceLeads: serviceLeads.count || 0,
        };
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Return default values instead of throwing
        return {
          totalUsers: 0,
          totalOrders: 0,
          totalRevenue: 0,
          totalContacts: 0,
          totalServices: 0,
          totalCategoryLeads: 0,
          totalServiceLeads: 0,
        };
      }
    },
  });

  // Check authentication first
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

  const quickActions = [
    {
      title: "Add Service",
      description: "Create a new service offering",
      icon: Plus,
      href: "/admin/add-service",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Add Category",
      description: "Create a new service category",
      icon: UserPlus,
      href: "/admin/add-category",
      gradient: "from-emerald-500 to-emerald-600",
      shadowColor: "shadow-emerald-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Site Settings",
      description: "Manage site configuration",
      icon: Settings,
      href: "/admin/site-settings",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Manage Sitemap",
      description: "Generate and manage sitemaps",
      icon: Globe,
      href: "/admin/sitemap",
      gradient: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Category Leads",
      description: "View category inquiries",
      icon: ClipboardList,
      href: "/admin-category-leads",
      gradient: "from-violet-500 to-violet-600",
      shadowColor: "shadow-violet-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Service Leads",
      description: "View service inquiries",
      icon: FileText,
      href: "/admin-service-leads",
      gradient: "from-rose-500 to-rose-600",
      shadowColor: "shadow-rose-200",
      iconBg: "bg-white/20",
    },
    {
      title: "Newsletter Subscribers",
      description: "View and manage newsletter signups",
      icon: Mail,
      href: "/admin/newsletter-subscribers",
      gradient: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-200",
      iconBg: "bg-white/20",
    },
  ];

  const managementLinks = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      count: stats?.totalUsers,
      gradient: "from-indigo-50 to-indigo-100",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
    },
    {
      title: "Manage Orders",
      description: "Process and track orders",
      icon: ShoppingBag,
      href: "/admin/orders",
      count: stats?.totalOrders,
      gradient: "from-green-50 to-green-100",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "Manage Services",
      description: "Edit and organize services",
      icon: Package,
      href: "/admin/services",
      count: stats?.totalServices,
      gradient: "from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Contact Inquiries",
      description: "Respond to customer inquiries",
      icon: MessageSquare,
      href: "/admin/contacts",
      count: stats?.totalContacts,
      gradient: "from-pink-50 to-pink-100",
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
    },
    {
      title: "Category Leads",
      description: "Manage category inquiries",
      icon: ClipboardList,
      href: "/admin-category-leads",
      count: stats?.totalCategoryLeads,
      gradient: "from-violet-50 to-violet-100",
      iconColor: "text-violet-600",
      iconBg: "bg-violet-100",
    },
    {
      title: "Service Leads",
      description: "Manage service inquiries",
      icon: FileText,
      href: "/admin-service-leads",
      count: stats?.totalServiceLeads,
      gradient: "from-rose-50 to-rose-100",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-100",
    },
    {
      title: "Newsletter Subscribers",
      description: "Manage newsletter signups",
      icon: Mail,
      href: "/admin/newsletter-subscribers",
      count: undefined,
      gradient: "from-cyan-50 to-cyan-100",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-100",
    },
  ];

  // Show loading state
  if (statsLoading) {
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

  // Show error state but still render the dashboard with default values
  if (error) {
    console.error("Dashboard error:", error);
  }

  return (
    <Layout>
      <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 shadow-lg"
          >
            <Link to="/admin/analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                Total Users
              </CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-blue-100 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Registered customers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">
                Total Orders
              </CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.totalOrders || 0}
              </div>
              <p className="text-xs text-emerald-100 flex items-center mt-1">
                <Activity className="w-3 h-3 mr-1" />
                Orders processed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-100">
                Total Revenue
              </CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${stats?.totalRevenue?.toFixed(2) || "0.00"}
              </div>
              <p className="text-xs text-yellow-100 flex items-center mt-1">
                <Star className="w-3 h-3 mr-1" />
                Revenue generated
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">
                Contact Inquiries
              </CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.totalContacts || 0}
              </div>
              <p className="text-xs text-purple-100 flex items-center mt-1">
                <Zap className="w-3 h-3 mr-1" />
                Customer inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-onassist-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br ${action.gradient} ${action.shadowColor} shadow-lg hover:scale-105`}
              >
                <CardContent className="p-6">
                  <Link to={action.href} className="block">
                    <div
                      className={`w-14 h-14 ${action.iconBg} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                    >
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 text-white text-center">
                      {action.title}
                    </h3>
                    <p className="text-sm text-white/80 text-center">
                      {action.description}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Management Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-onassist-primary" />
            Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementLinks.map((link) => (
              <Card
                key={link.title}
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${link.gradient} border border-gray-200 hover:scale-105`}
              >
                <CardContent className="p-6">
                  <Link to={link.href} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-14 h-14 ${link.iconBg} rounded-xl flex items-center justify-center`}
                        >
                          <link.icon className={`w-7 h-7 ${link.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {link.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {link.description}
                          </p>
                        </div>
                      </div>
                      {link.count !== undefined && (
                        <div className="text-3xl font-bold text-onassist-primary">
                          {link.count}
                        </div>
                      )}
                    </div>
                  </Link>
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
