import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ReturnsPage from "./pages/ReturnsPage";
import PartnerPage from "./pages/PartnerPage";
import MembershipPage from "./pages/MembershipPage";
import CategoryPage from "./pages/CategoryPage";
import CountryPage from "./pages/CountryPage";
import StateServicePage from "./pages/StateServicePage";
import StateServiceDetailPage from "./pages/StateServiceDetailPage";
import CityServicePage from "./pages/CityServicePage";
import CityCategoryPage from "./pages/CityCategoryPage";
import LocationServiceDetailPage from "./pages/LocationServiceDetailPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelledPage from "./pages/PaymentCancelledPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSiteSettings from "./pages/admin/AdminSiteSettings";
import AdminSitemap from "./pages/admin/AdminSitemap";
import AddService from "./pages/admin/AddService";
import AddCategory from "./pages/admin/AddCategory";

// Sitemap Pages
import SitemapPage from "./pages/SitemapPage";
import SitemapMainPage from "./pages/SitemapMainPage";
import SitemapChunkPage from "./pages/SitemapChunkPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <CartProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/service/:serviceSlug"
                  element={<ServiceDetailPage />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/membership" element={<MembershipPage />} />

                {/* Category and Location Routes */}
                <Route
                  path="/services/:categorySlug"
                  element={<CategoryPage />}
                />
                <Route path="/united-states" element={<CountryPage />} />
                <Route path="/:stateSlug" element={<StateServicePage />} />
                <Route
                  path="/:stateSlug/:serviceSlug"
                  element={<StateServiceDetailPage />}
                />
                <Route
                  path="/:stateSlug/:citySlug"
                  element={<CityServicePage />}
                />
                <Route
                  path="/:stateSlug/:citySlug/:categorySlug"
                  element={<CityCategoryPage />}
                />
                <Route
                  path="/:stateSlug/:citySlug/:categorySlug/:serviceSlug"
                  element={<LocationServiceDetailPage />}
                />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                {/* User Routes */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/payment-success"
                  element={<PaymentSuccessPage />}
                />
                <Route
                  path="/payment-cancelled"
                  element={<PaymentCancelledPage />}
                />
                <Route path="/my-orders" element={<MyOrdersPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route
                  path="/admin/site-settings"
                  element={<AdminSiteSettings />}
                />
                <Route path="/admin/sitemap" element={<AdminSitemap />} />
                <Route path="/admin/add-service" element={<AddService />} />
                <Route path="/admin/add-category" element={<AddCategory />} />

                {/* Sitemap Routes */}
                <Route path="/sitemap.xml" element={<SitemapPage />} />
                <Route
                  path="/sitemap_index.xml"
                  element={<SitemapMainPage />}
                />
                <Route
                  path="/sitemap_:chunkNumber.xml"
                  element={<SitemapChunkPage />}
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
