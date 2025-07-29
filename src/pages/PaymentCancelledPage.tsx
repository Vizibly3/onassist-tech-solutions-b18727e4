import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const PaymentCancelledPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Payment Cancelled | {siteConfig.name}</title>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="text-center">
              <XCircle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-yellow-800">
                Payment Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-yellow-700">
                Your payment has been cancelled. Your cart items are still saved
                and you can complete your purchase anytime.
              </p>

              <div className="flex gap-4 justify-center mt-6">
                <Button asChild>
                  <Link to="/cart">Return to Cart</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancelledPage;
