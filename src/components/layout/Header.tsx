import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User,
  ShoppingCart,
  ChevronDown, 
  Phone,
  LogOut,
} from "lucide-react";
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useServiceCategories } from '@/hooks/useServices';
import { slugify } from '@/utils/slugify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { data: serviceCategories } = useServiceCategories();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-onassist-primary">
                {siteConfig.name}
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-medium">Services</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              
              {/* Services Dropdown */}
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md p-4 min-w-[200px] animate-fade-in">
                <ul className="space-y-2">
                  {serviceCategories?.map((category) => (
                    <li key={category.id} className="hover:bg-gray-50 rounded">
                      <Link 
                        to={`/services/${slugify(category.title)}`}
                        className="block px-3 py-2 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                  <li className="hover:bg-gray-50 rounded">
                    <Link 
                      to="/services" 
                      className="block px-3 py-2 text-sm font-medium text-onassist-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      View All Services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <Link to="/pricing" className="font-medium">Pricing</Link>
            <Link to="/about" className="font-medium">About</Link>
            <Link to="/contact" className="font-medium">Contact</Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-onassist-primary">
              <Phone className="h-4 w-4" />
              <span className="font-medium">{siteConfig.contactPhone}</span>
            </a>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-onassist-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Admin</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <div className="py-2">
                <div 
                  className="flex items-center justify-between cursor-pointer px-2 py-1"
                  onClick={() => {}}
                >
                  <span className="font-medium">Services</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 mt-2 border-l-2 border-gray-100 space-y-2">
                  {serviceCategories?.map((category) => (
                    <Link 
                      key={category.id} 
                      to={`/services/${slugify(category.title)}`}
                      className="block px-2 py-1 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                  <Link 
                    to="/services"
                    className="block px-2 py-1 text-sm font-medium text-onassist-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Services
                  </Link>
                </div>
              </div>
              
              <Link 
                to="/pricing" 
                className="px-2 py-1 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className="px-2 py-1 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="px-2 py-1 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Actions */}
              <div className="border-t pt-4 mt-2 space-y-4">
                <Link 
                  to="/cart"
                  className="flex items-center gap-2 px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/profile"
                      className="flex items-center gap-2 px-2 py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>My Account</span>
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </>
                ) : (
                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
                
                <div className="flex items-center gap-2 text-onassist-primary px-2 py-1">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, '')}`} className="font-medium">
                    {siteConfig.contactPhone}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
