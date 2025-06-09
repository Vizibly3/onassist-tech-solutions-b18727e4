
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, User, Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react';
import ServicesDropdown from './ServicesDropdown';

const DynamicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const closeDropdown = () => {
    setIsServicesDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-onassist-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-gray-900">OnAssist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to={isAdmin ? "/admin/dashboard" : "/"} 
              className={`font-medium transition-colors hover:text-onassist-primary ${
                isActive(isAdmin ? '/admin/dashboard' : '/') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              {isAdmin ? 'Dashboard' : 'Home'}
            </Link>
            
            {!isAdmin && (
              <>
                <div 
                  className="relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button className={`flex items-center gap-1 font-medium transition-colors hover:text-onassist-primary ${
                    location.pathname.startsWith('/services') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}>
                    Services
                    <ChevronDown className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <ServicesDropdown isOpen={isServicesDropdownOpen} onClose={closeDropdown} />
                </div>
                
                <Link 
                  to="/membership" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/membership') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Membership
                </Link>
                
                <Link 
                  to="/partner" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/partner') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Partner With Us
                </Link>
              </>
            )}
            
            {isAdmin && (
              <>
                <Link 
                  to="/admin/categories" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/categories') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Categories
                </Link>
                <Link 
                  to="/admin/services" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/services') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Services
                </Link>
                <Link 
                  to="/admin/users" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/users') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Users
                </Link>
                <Link 
                  to="/admin/orders" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/orders') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Orders
                </Link>
                <Link 
                  to="/admin/contacts" 
                  className={`font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/contacts') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Contacts
                </Link>
              </>
            )}
            
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-onassist-primary ${
                isActive('/about') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`font-medium transition-colors hover:text-onassist-primary ${
                isActive('/contact') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart - Only show for non-admin users */}
            {!isAdmin && (
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-onassist-primary transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-onassist-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="hidden lg:flex items-center space-x-2">
                <Link to={isAdmin ? "/admin/dashboard" : "/profile"}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    {isAdmin ? <LayoutDashboard className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    {isAdmin ? 'Dashboard' : 'Profile'}
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-onassist-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 space-y-4">
            <Link 
              to={isAdmin ? "/admin/dashboard" : "/"} 
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                isActive(isAdmin ? '/admin/dashboard' : '/') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              {isAdmin ? 'Dashboard' : 'Home'}
            </Link>
            
            {!isAdmin && (
              <>
                <Link 
                  to="/services" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    location.pathname.startsWith('/services') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Services
                </Link>
                
                <Link 
                  to="/membership" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/membership') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Membership
                </Link>
                
                <Link 
                  to="/partner" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/partner') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Partner With Us
                </Link>
              </>
            )}
            
            {isAdmin && (
              <>
                <Link 
                  to="/admin/categories" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/categories') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Categories
                </Link>
                <Link 
                  to="/admin/services" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/services') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Services
                </Link>
                <Link 
                  to="/admin/users" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/users') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Users
                </Link>
                <Link 
                  to="/admin/orders" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/orders') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Orders
                </Link>
                <Link 
                  to="/admin/contacts" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                    isActive('/admin/contacts') ? 'text-onassist-primary' : 'text-gray-700'
                  }`}
                >
                  Contacts
                </Link>
              </>
            )}
            
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                isActive('/about') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 font-medium transition-colors hover:text-onassist-primary ${
                isActive('/contact') ? 'text-onassist-primary' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
            
            <div className="border-t border-gray-200 pt-4">
              {user ? (
                <div className="space-y-2">
                  <Link to={isAdmin ? "/admin/dashboard" : "/profile"} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {isAdmin ? <LayoutDashboard className="h-4 w-4 mr-2" /> : <User className="h-4 w-4 mr-2" />}
                      {isAdmin ? 'Dashboard' : 'Profile'}
                    </Button>
                  </Link>
                  <Button onClick={handleSignOut} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default DynamicHeader;
