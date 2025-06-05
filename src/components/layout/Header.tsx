
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { siteConfig } from '@/config/site';
import ServicesMegaMenu from './ServicesMegaMenu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMegaMenuOpen, setIsServicesMegaMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleCallNow = () => {
    window.open(`tel:${siteConfig.contactPhone}`, '_self');
  };

  const closeMegaMenu = () => {
    setIsServicesMegaMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-onassist-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-onassist-primary transition-colors">
              Home
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesMegaMenuOpen(true)}
              onMouseLeave={() => setIsServicesMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-onassist-primary transition-colors">
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <ServicesMegaMenu isOpen={isServicesMegaMenuOpen} onClose={closeMegaMenu} />
            </div>
            
            <Link to="/about" className="text-gray-600 hover:text-onassist-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-onassist-primary transition-colors">
              Contact
            </Link>
            <Link to="/membership" className="text-gray-600 hover:text-onassist-primary transition-colors">
              Membership
            </Link>
            <Link to="/partner" className="text-gray-600 hover:text-onassist-primary transition-colors">
              Partner With Us
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-onassist-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm" className="bg-onassist-primary hover:bg-onassist-dark">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Call Button with Phone Number */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-medium"
              onClick={handleCallNow}
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{siteConfig.contactPhone}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/membership"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/partner"
                className="text-gray-600 hover:text-onassist-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partner With Us
              </Link>
              
              {/* Mobile Call Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center items-center gap-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white"
                onClick={() => {
                  handleCallNow();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Phone className="w-4 h-4" />
                {siteConfig.contactPhone}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
