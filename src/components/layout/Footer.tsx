
import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { serviceCategories } from '@/config/services';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{siteConfig.name}</h3>
            <p className="text-gray-300">
              Professional tech support services for your home and business.
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{siteConfig.contactPhone}</span>
              </p>
              <p className="flex items-center text-gray-300">
                <span className="font-medium">Email:</span>
                <span className="ml-2">{siteConfig.email}</span>
              </p>
              <p className="flex items-center text-gray-300">
                <span className="font-medium">Address:</span>
                <span className="ml-2">{siteConfig.address}</span>
              </p>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Services</h3>
            <ul className="space-y-2">
              {serviceCategories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/services/${category.id}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/services"
                  className="text-onassist-secondary hover:text-white transition-colors font-medium"
                >
                  View All Services
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/membership"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link 
                  to="/partner"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-lg font-medium mb-2">Join Our Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-800 text-white rounded-l focus:outline-none w-full"
                />
                <button className="bg-onassist-primary px-4 py-2 rounded-r hover:bg-onassist-dark transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <Link to={siteConfig.social.twitter} className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link to={siteConfig.social.facebook} className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </Link>
            <Link to={siteConfig.social.instagram} className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </Link>
            <Link to={siteConfig.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
