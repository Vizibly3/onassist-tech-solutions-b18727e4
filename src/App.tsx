
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

// Pages
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import CategoryPage from '@/pages/CategoryPage';
import CountryPage from '@/pages/CountryPage';
import CityCategoryPage from '@/pages/CityCategoryPage';
import CityServicePage from '@/pages/CityServicePage';
import LocationServiceDetailPage from '@/pages/LocationServiceDetailPage';
import StateServicePage from '@/pages/StateServicePage';
import StateServiceDetailPage from '@/pages/StateServiceDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ProfilePage from '@/pages/ProfilePage';
import MyOrdersPage from '@/pages/MyOrdersPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import ReturnsPage from '@/pages/ReturnsPage';
import FAQPage from '@/pages/FAQPage';
import PartnerPage from '@/pages/PartnerPage';
import MembershipPage from '@/pages/MembershipPage';
import NotFound from '@/pages/NotFound';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminServices from '@/pages/admin/AdminServices';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminSiteSettings from '@/pages/admin/AdminSiteSettings';
import AdminSitemap from '@/pages/admin/AdminSitemap';
import AddService from '@/pages/admin/AddService';
import AddCategory from '@/pages/admin/AddCategory';

// Sitemap pages
import SitemapPage from '@/pages/SitemapPage';
import SitemapMainPage from '@/pages/SitemapMainPage';
import SitemapChunkPage from '@/pages/SitemapChunkPage';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-white">
                <Routes>
                  {/* Main pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/services/:categorySlug/:serviceSlug" element={<ServiceDetailPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/my-orders" element={<MyOrdersPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/partner" element={<PartnerPage />} />
                  <Route path="/membership" element={<MembershipPage />} />

                  {/* Location-based pages */}
                  <Route path="/united-states" element={<CountryPage />} />
                  <Route path="/united-states/:stateSlug" element={<CountryPage />} />
                  <Route path="/united-states/:stateSlug/:citySlug" element={<CityCategoryPage />} />
                  <Route path="/united-states/:stateSlug/:citySlug/:serviceSlug" element={<LocationServiceDetailPage />} />
                  <Route path="/:stateSlug/:serviceSlug" element={<StateServiceDetailPage />} />
                  <Route path="/:stateSlug" element={<StateServicePage />} />
                  <Route path="/:stateSlug/:citySlug/:serviceSlug" element={<CityServicePage />} />

                  {/* Auth pages */}
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />

                  {/* Admin pages */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/categories" element={<AdminCategories />} />
                  <Route path="/admin/contacts" element={<AdminContacts />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/site-settings" element={<AdminSiteSettings />} />
                  <Route path="/admin/sitemap" element={<AdminSitemap />} />
                  <Route path="/admin/add-service" element={<AddService />} />
                  <Route path="/admin/add-category" element={<AddCategory />} />

                  {/* Sitemap pages */}
                  <Route path="/sitemap.xml" element={<SitemapMainPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  <Route path="/sitemap_:chunkNumber.xml" element={<SitemapChunkPage />} />

                  {/* 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
