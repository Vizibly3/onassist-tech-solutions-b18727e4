
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import CategoryPage from "./pages/CategoryPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CountryPage from "./pages/CountryPage";
import CityCategoryPage from "./pages/CityCategoryPage";
import CityServicePage from "./pages/CityServicePage";
import LocationServiceDetailPage from "./pages/LocationServiceDetailPage";
import StateServicePage from "./pages/StateServicePage";
import StateServiceDetailPage from "./pages/StateServiceDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ReturnsPage from "./pages/ReturnsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import SitemapPage from "./pages/SitemapPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AddService from "./pages/admin/AddService";
import AddCategory from "./pages/admin/AddCategory";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:categorySlug" element={<CategoryPage />} />
                  <Route path="/service/:serviceSlug" element={<ServiceDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/my-orders" element={<MyOrdersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/sitemap.xml" element={<SitemapPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/categories" element={<AdminCategories />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/add-service" element={<AddService />} />
                  <Route path="/admin/add-category" element={<AddCategory />} />
                  
                  {/* Location-based Routes */}
                  <Route path="/:country" element={<CountryPage />} />
                  <Route path="/:country/:state" element={<StateServicePage />} />
                  <Route path="/:country/:state/:city" element={<CityServicePage />} />
                  <Route path="/:country/:state/:city/services/:categorySlug" element={<CityCategoryPage />} />
                  <Route path="/:country/:state/:city/service/:serviceSlug" element={<LocationServiceDetailPage />} />
                  <Route path="/:country/:state/service/:serviceSlug" element={<StateServiceDetailPage />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
