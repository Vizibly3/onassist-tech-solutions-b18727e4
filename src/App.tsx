
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import MembershipPage from "./pages/MembershipPage";
import PartnerPage from "./pages/PartnerPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ReturnsPage from "./pages/ReturnsPage";
import NotFound from "./pages/NotFound";
import SitemapPage from "./pages/SitemapPage";

// Location-based pages
import CountryPage from "./pages/CountryPage";
import StateServicePage from "./pages/StateServicePage";
import StateServiceDetailPage from "./pages/StateServiceDetailPage";
import CityCategoryPage from "./pages/CityCategoryPage";
import CityServicePage from "./pages/CityServicePage";
import LocationServiceDetailPage from "./pages/LocationServiceDetailPage";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AddService from "./pages/admin/AddService";
import AddCategory from "./pages/admin/AddCategory";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <HelmetProvider>
              <Toaster />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/service/:serviceSlug" element={<ServiceDetailPage />} />
                <Route path="/services/:categorySlug" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                
                {/* Sitemap Route */}
                <Route path="/sitemap.xml" element={<SitemapPage />} />

                {/* Location-based Routes */}
                <Route path="/:country" element={<CountryPage />} />
                <Route path="/:country/:state" element={<StateServicePage />} />
                <Route path="/:country/:state/:serviceSlug" element={<StateServiceDetailPage />} />
                <Route path="/:country/:state/:city/:categorySlug" element={<CityCategoryPage />} />
                <Route path="/:country/:state/:city" element={<CityServicePage />} />
                <Route path="/:country/:state/:city/:serviceSlug" element={<LocationServiceDetailPage />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                {/* Protected User Routes */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<MyOrdersPage />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/add-service" element={<AddService />} />
                <Route path="/admin/add-category" element={<AddCategory />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HelmetProvider>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
