import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-purple-600 font-semibold block py-2" : "text-gray-600 hover:text-purple-600 block py-2 transition-colors";

  // Close menu after clicking a link
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  BrandStoryy
                </span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/ai-agents" className={navLinkClass}>AI Agents</NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/integrations" className={navLinkClass}>Integrations</NavLink>
              <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/login" className={navLinkClass}>Sign In</NavLink>
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup">Start Free Trial</Link>
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-b border-purple-100 px-4 py-4 space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <NavLink to="/ai-agents" className={navLinkClass} onClick={handleLinkClick}>AI Agents</NavLink>
            <NavLink to="/dashboard" className={navLinkClass} onClick={handleLinkClick}>Dashboard</NavLink>
            <NavLink to="/integrations" className={navLinkClass} onClick={handleLinkClick}>Integrations</NavLink>
            <NavLink to="/pricing" className={navLinkClass} onClick={handleLinkClick}>Pricing</NavLink>
            <NavLink to="/login" className={navLinkClass} onClick={handleLinkClick}>Sign In</NavLink>
            <Link to="/signup" onClick={handleLinkClick}>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                Start Free Trial
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
