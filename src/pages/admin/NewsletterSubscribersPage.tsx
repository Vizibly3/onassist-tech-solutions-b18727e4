import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Search, Filter } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

const PAGE_SIZE = 10;

const NewsletterSubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      const query = supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      const { data, error } = await query;
      if (!error && data) {
        setSubscribers(data as Subscriber[]);
      }
      setLoading(false);
    };
    fetchSubscribers();
  }, []);

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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-8 text-gray-400"
                      >
                        Loading subscribers...
                      </td>
                    </tr>
                  ) : paginatedSubscribers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
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
      </div>
    </Layout>
  );
};

export default NewsletterSubscribersPage;
