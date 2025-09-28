// src/components/Footer.jsx - Fixed responsive layout for all screen sizes
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: "Platform Features", href: "#features" },
    { name: "Interactive Maps", href: "#map" },
    { name: "Data Analytics", href: "/analytics" },
    { name: "API Documentation", href: "/docs" },
    { name: "Python SDK", href: "/sdk" },
  ];

  const companyLinks = [
    { name: "About ARGO FloatChat", href: "/about" },
    { name: "Research Partners", href: "/partners" },
    { name: "Case Studies", href: "/cases" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
  ];

  const resourceLinks = [
    { name: "Getting Started", href: "/getting-started" },
    { name: "User Guide", href: "/guide" },
    { name: "Video Tutorials", href: "/tutorials" },
    { name: "Community Forum", href: "/forum" },
    { name: "Status Page", href: "/status" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Data Usage Policy", href: "/data-policy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="relative bg-black text-gray-400 w-full overflow-hidden" style={{ maxWidth: '100vw' }}>
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute top-0 right-0 w-1/3 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent blur-3xl" />
      </div>

      {/* FIXED: Enhanced responsive container */}
      <div className="relative z-10 w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md 
                      lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto 
                      px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 
                      pt-16 sm:pt-18 md:pt-20 lg:pt-24 xl:pt-28 pb-6 sm:pb-8">
        
        {/* FIXED: Main footer content with better responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 
                        mb-12 sm:mb-14 md:mb-16">
          
          {/* Brand section - Enhanced responsive */}
          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-white font-black text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 
                           bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                🌊 ARGO FloatChat
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                Transforming oceanographic research through intelligent data conversations 
                and cutting-edge visualization technology.
              </p>
            </div>

            {/* Contact info - Enhanced responsive */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <HiMail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
                <a href="mailto:hello@argofloatchat.com" 
                   className="hover:text-cyan-400 transition-colors break-all">
                  hello@argofloatchat.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <HiPhone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
                <span>Marine Science Institute, California</span>
              </div>
            </div>

            {/* Social links - Enhanced responsive */}
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://twitter.com/argofloatchat" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white/5 hover:bg-cyan-500/20 
                          flex items-center justify-center transition-colors group">
                <FaTwitter className="text-sm sm:text-base md:text-lg group-hover:text-cyan-400" />
              </a>
              <a href="https://github.com/argofloatchat" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white/5 hover:bg-gray-500/20 
                          flex items-center justify-center transition-colors group">
                <FaGithub className="text-sm sm:text-base md:text-lg group-hover:text-gray-300" />
              </a>
              <a href="https://linkedin.com/company/argofloatchat" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white/5 hover:bg-blue-500/20 
                          flex items-center justify-center transition-colors group">
                <FaLinkedin className="text-sm sm:text-base md:text-lg group-hover:text-blue-400" />
              </a>
              <a href="mailto:hello@argofloatchat.com"
                 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white/5 hover:bg-green-500/20 
                          flex items-center justify-center transition-colors group">
                <FaEnvelope className="text-sm sm:text-base md:text-lg group-hover:text-green-400" />
              </a>
            </div>
          </div>

          {/* Product links - Enhanced responsive */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Platform</h3>
            <ul className="space-y-2 sm:space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} 
                     className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors 
                              block leading-relaxed">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links - Enhanced responsive */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} 
                     className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors 
                              block leading-relaxed">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Enhanced responsive */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} 
                     className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors 
                              block leading-relaxed">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Enhanced responsive */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} 
                     className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors 
                              block leading-relaxed">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter signup - Enhanced responsive */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">Stay Updated</h4>
              <div className="flex max-w-full">
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 bg-white/10 border border-white/20 
                           rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 
                           text-xs sm:text-sm min-w-0"
                />
                <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 
                                 text-white rounded-r-lg hover:from-cyan-400 hover:to-blue-400 
                                 transition-colors flex-shrink-0">
                  <HiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FIXED: Bottom section with better responsive behavior */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 
                        flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left flex-1">
            <p>© {currentYear} ARGO FloatChat. All rights reserved.</p>
            <p className="mt-1 leading-relaxed">
              Powered by <strong className="text-cyan-400">ARGO Global Ocean Observing System</strong> • 
              Built with <span className="text-red-400">♥</span> for ocean science
            </p>
          </div>

          {/* Back to top - Enhanced responsive */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
                     bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 
                     transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
            aria-label="Back to top"
          >
            Back to top
            <FaArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
