import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  ClipboardList,
  Search,
  Download,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

type CategoryLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  category_slug: string;
  category_name: string;
  preferred_time: string;
  message: string | null;
  created_at: string;
  status: "pending" | "contacted" | "completed" | "cancelled";
  notes: string | null;
  updated_at?: string;
};

const ITEMS_PER_PAGE = 10;

const CategoryLeadsPage = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof CategoryLead>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  // Fetch leads with better error handling
  const {
    data: leads = [],
    isLoading: leadsLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["category-leads"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("category_service_leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        return (data as CategoryLead[]) || [];
      } catch (error) {
        console.error("Error fetching leads:", error);
        toast.error("Failed to fetch leads");
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  // Check authentication
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

  // Filter and sort leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.category_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = sortedLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleStatusChange = async (
    leadId: string,
    newStatus: CategoryLead["status"]
  ) => {
    try {
      console.log(`Updating lead ${leadId} to status: ${newStatus}`);

      // Update the database with updated_at timestamp
      const { data, error } = await supabase
        .from("category_service_leads")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", leadId)
        .select(); // Add select to get the updated row back

      if (error) {
        console.error("Database update error:", error);
        throw error;
      }

      console.log("Database update successful:", data);

      // Refetch the data to ensure consistency
      await refetch();

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        `Failed to update status: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleExport = () => {
    if (!sortedLeads.length) return;

    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Category",
        "Preferred Time",
        "Message",
        "Status",
        "Created At",
      ],
      ...sortedLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.category_name,
        lead.preferred_time,
        lead.message || "",
        lead.status,
        format(new Date(lead.created_at), "yyyy-MM-dd HH:mm:ss"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `category-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  const getStatusColor = (status: CategoryLead["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hover:bg-gray-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Category Leads
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track category inquiries
              </p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={`${sortField}-${sortDirection}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split("-");
                    setSortField(field as keyof CategoryLead);
                    setSortDirection(direction as "asc" | "desc");
                  }}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="status-asc">Status (A-Z)</option>
                  <option value="status-desc">Status (Z-A)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Preferred Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leadsLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4">
                        <div className="animate-pulse space-y-4">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="h-12 bg-gray-200 rounded"
                            ></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-red-500"
                      >
                        Failed to load leads. Please try again.
                      </td>
                    </tr>
                  ) : paginatedLeads.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No leads found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedLeads.map((lead) => (
                      <React.Fragment key={lead.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mr-3">
                                <ClipboardList className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {lead.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lead.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {lead.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {lead.category_name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {format(
                                new Date(lead.preferred_time),
                                "MMM d, yyyy"
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(lead.preferred_time), "h:mm a")}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  lead.id,
                                  e.target.value as CategoryLead["status"]
                                )
                              }
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                lead.status
                              )} border-0 focus:ring-2 focus:ring-blue-400`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {format(new Date(lead.created_at), "MMM d, yyyy")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(lead.created_at), "h:mm a")}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setExpandedLead(
                                  expandedLead === lead.id ? null : lead.id
                                )
                              }
                            >
                              {expandedLead === lead.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </Button>
                          </td>
                        </tr>
                        {expandedLead === lead.id && (
                          <tr>
                            <td colSpan={7} className="bg-gray-50 p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    Message
                                  </h4>
                                  <p className="text-gray-600">
                                    {lead.message || "No message provided"}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    Last Updated
                                  </h4>
                                  <p className="text-gray-600">
                                    {format(
                                      new Date(
                                        lead.updated_at || lead.created_at
                                      ),
                                      "MMM d, yyyy 'at' h:mm a"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + ITEMS_PER_PAGE, sortedLeads.length)}{" "}
                    of {sortedLeads.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <div className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CategoryLeadsPage;
