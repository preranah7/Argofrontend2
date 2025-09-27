// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaGlobeAmericas, FaChevronDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Scroll detection for enhanced navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navigationItems = [
    {
      name: "Product",
      href: "#features",
      hasDropdown: true,
      dropdownItems: [
        { name: "Features", href: "#features", desc: "Core platform capabilities" },
        { name: "AI Chat", href: "/chat", desc: "Conversational data analysis" },
        { name: "Visualizations", href: "#map", desc: "Interactive ocean maps" },
        { name: "Analytics", href: "/analytics", desc: "Advanced data insights" }
      ]
    },
    {
      name: "Solutions",
      href: "#solutions",
      hasDropdown: true,
      dropdownItems: [
        { name: "For Researchers", href: "/researchers", desc: "Academic research tools" },
        { name: "For Institutions", href: "/institutions", desc: "Enterprise solutions" },
        { name: "For Students", href: "/students", desc: "Educational resources" }
      ]
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Documentation", href: "/docs" }
  ];

  const isActive = (href) => {
    if (href.startsWith('#')) {
      return false; // Handle scroll to sections differently
    }
    return location.pathname === href;
  };

  return (
    <>
      <div className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'top-0 pt-4' : ''
      }`}>
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* LEFT: Brand */}
          <Link 
            to="/"
            className={`flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 
                       rounded-full px-4 sm:px-6 shadow-lg hover:bg-white/15 transition-all duration-300
                       h-12 sm:h-14 group ${isScrolled ? 'bg-white/15 border-white/30' : ''}`}
          >
            {/* Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 
                            rounded-full flex items-center justify-center text-white font-bold 
                            text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform">
              🌊
            </div>

            {/* Brand Name - FIXED: Lighter font */}
            <span className="text-white font-bold text-lg sm:text-xl drop-shadow-sm">
              ARGO FloatChat
            </span>
          </Link>

          {/* RIGHT: Actions */}
          <div className={`flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 
                          rounded-full px-4 sm:px-6 shadow-lg h-12 sm:h-14 ${
                          isScrolled ? 'bg-white/15 border-white/30' : ''
                          }`}>
            
            {/* Globe - FIXED: Less distracting */}
            <Link 
              to="/floats" 
              title="Explore Global Floats"
              className="relative flex items-center justify-center p-2 rounded-full 
                         hover:bg-white/20 transition-colors group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="relative"
              >
                <FaGlobeAmericas className="text-white text-lg sm:text-xl group-hover:text-cyan-300 
                                          transition-colors" />
              </motion.div>
              
              {/* Subtle pulse instead of large glow */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-5 h-5 text-white" />
              ) : (
                <HiMenu className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <button className="px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm 
                               hover:bg-white/30 transition-all duration-200 focus:outline-none 
                               focus:ring-2 focus:ring-white/50">
                Login
              </button>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                          text-white font-semibold text-sm shadow-md hover:shadow-lg
                          hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 
                          focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                 onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-slate-900/95 
                         backdrop-blur-xl border-l border-white/20 shadow-2xl"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-cyan-300 bg-cyan-500/20' 
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                      </Link>
                      
                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdownItems.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              to={dropItem.href}
                              className="block px-4 py-2 text-sm text-white/70 hover:text-white/90 
                                        hover:bg-white/5 rounded-lg transition-colors"
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile Auth */}
                <div className="mt-8 space-y-3">
                  <button className="w-full px-4 py-3 rounded-xl bg-white/20 text-white font-medium 
                                   hover:bg-white/30 transition-colors">
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 
                             text-white font-semibold text-center hover:from-cyan-400 hover:to-blue-500 
                             transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
