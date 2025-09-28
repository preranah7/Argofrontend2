// src/components/Navbar.jsx - Navigation items moved to hamburger menu
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

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <div className={`fixed top-2 sm:top-3 lg:top-4 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'top-0 pt-2 sm:pt-3 lg:pt-4' : ''
      }`}>
        <div className="flex justify-between items-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 
                        max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          
          {/* LEFT: Brand - Responsive sizing */}
          <Link 
            to="/"
            className={`flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 
                       rounded-full px-3 sm:px-4 md:px-5 lg:px-6 shadow-lg hover:bg-white/15 transition-all duration-300
                       h-10 sm:h-12 md:h-13 lg:h-14 xl:h-16 group ${isScrolled ? 'bg-white/15 border-white/30' : ''}`}
          >
            {/* Logo - Responsive sizing */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 
                            bg-gradient-to-tr from-cyan-400 to-blue-600 
                            rounded-full flex items-center justify-center text-white font-bold 
                            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl shadow-md 
                            group-hover:scale-105 transition-transform">
              🌊
            </div>

            {/* Brand Name - Responsive font sizing */}
            <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                           drop-shadow-sm whitespace-nowrap">
              ARGO FloatChat
            </span>
          </Link>

          {/* RIGHT: Actions - Responsive sizing */}
          <div className={`flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 
                          rounded-full px-3 sm:px-4 md:px-5 lg:px-6 shadow-lg 
                          h-10 sm:h-12 md:h-13 lg:h-14 xl:h-16 ${
                          isScrolled ? 'bg-white/15 border-white/30' : ''
                          }`}>
            
            {/* Globe - Responsive sizing */}
            <Link 
              to="/floats" 
              title="Explore Global Floats"
              className="relative flex items-center justify-center p-1.5 sm:p-2 md:p-2.5 rounded-full 
                         hover:bg-white/20 transition-colors group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="relative"
              >
                <FaGlobeAmericas className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                                          group-hover:text-cyan-300 transition-colors" />
              </motion.div>
              
              {/* Subtle pulse */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300" />
            </Link>

            {/* Hamburger Menu Button - Now shows on all screens */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-neutral-900 sm:p-2 md:p-2.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              ) : (
                <HiMenu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              )}
            </button>

            {/* Auth Buttons (Desktop) - Responsive sizing */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3 ml-3">
              <button className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/20 
                               text-white font-medium text-xs sm:text-sm md:text-base 
                               hover:bg-white/30 transition-all duration-200 focus:outline-none 
                               focus:ring-2 focus:ring-white/50 whitespace-nowrap">
                Login
              </button>

              <Link
                to="/signup"
                className="px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full 
                          bg-gradient-to-r from-cyan-500 to-blue-600 
                          text-white font-semibold text-xs sm:text-sm md:text-base 
                          shadow-md hover:shadow-lg hover:from-cyan-400 hover:to-blue-500 
                          transition-all duration-200 focus:outline-none focus:ring-2 
                          focus:ring-cyan-400/50 whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu - Now contains all navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                 onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 right-0 h-full w-80 sm:w-96 md:w-[28rem] max-w-[90vw] 
                         bg-slate-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-y-auto"
            >
              <div className="p-4 sm:p-6 pt-16 sm:pt-20">
                
                {/* Navigation Items */}
                <nav className="space-y-1">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      {/* Main Navigation Item */}
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          className={`flex-1 px-4 py-3 rounded-xl text-base sm:text-lg 
                                    font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-cyan-300 bg-cyan-500/20' 
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.name}
                        </Link>
                        
                        {/* Dropdown Toggle */}
                        {item.hasDropdown && (
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <FaChevronDown 
                              className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                                activeDropdown === index ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        )}
                      </div>
                      
                      {/* Dropdown Items */}
                      <AnimatePresence>
                        {item.hasDropdown && activeDropdown === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
                              {item.dropdownItems.map((dropItem, dropIndex) => (
                                <Link
                                  key={dropIndex}
                                  to={dropItem.href}
                                  className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                  <div className="text-white/90 font-medium text-sm sm:text-base group-hover:text-white">
                                    {dropItem.name}
                                  </div>
                                  <div className="text-white/60 text-xs sm:text-sm mt-0.5">
                                    {dropItem.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-white/10"></div>

                {/* Mobile Auth */}
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 rounded-xl bg-white/20 
                                   text-white font-medium text-base sm:text-lg
                                   hover:bg-white/30 transition-colors">
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="block w-full px-4 py-3 rounded-xl 
                             bg-gradient-to-r from-cyan-500 to-blue-600 
                             text-white font-semibold text-base sm:text-lg text-center 
                             hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-white/70 font-medium text-sm uppercase tracking-wider mb-4">
                    Quick Access
                  </h3>
                  <div className="space-y-2">
                    <Link
                      to="/chat"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-xs">
                        💬
                      </div>
                      <span className="text-white/90 font-medium">AI Chat</span>
                    </Link>
                    <Link
                      to="/floats"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-xs">
                        🌍
                      </div>
                      <span className="text-white/90 font-medium">Explore Floats</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
