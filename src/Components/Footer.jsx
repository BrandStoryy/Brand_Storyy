import React from 'react';
import { Zap, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BrandStoryy</span>
            </div>
            <p className="text-gray-400 mb-6">
              The next-generation marketing automation platform powered by AI agents. Transform your marketing workflow and scale your business with intelligent automation.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>hello@brandstoryy.com</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">AI Agents</a>
              <a href="#" className="block hover:text-white transition-colors">Dashboard</a>
              <a href="#" className="block hover:text-white transition-colors">Integrations</a>
              <a href="#" className="block hover:text-white transition-colors">Analytics</a>
              <a href="#" className="block hover:text-white transition-colors">API</a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">About Us</a>
              <a href="#" className="block hover:text-white transition-colors">Careers</a>
              <a href="#" className="block hover:text-white transition-colors">Press</a>
              <a href="#" className="block hover:text-white transition-colors">Blog</a>
              <a href="#" className="block hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block hover:text-white transition-colors">Docs</a>
              <a href="#" className="block hover:text-white transition-colors">Status</a>
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
