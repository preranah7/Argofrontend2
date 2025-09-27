// // src/components/Footer.jsx
// import React from "react";
// import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-black text-gray-400 pt-16 pb-8 px-6 lg:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//         {/* Brand */}
//         <div>
//           <h2 className="text-white font-bold text-xl mb-4">
//             ARGO FloatChat
//           </h2>
//           <p className="text-sm leading-relaxed">
//             Built with passion for ocean science and powered by multi-modal AI.
//           </p>
//         </div>

//         {/* Product */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Product</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="#features" className="hover:text-cyan-400 transition">
//                 Features
//               </a>
//             </li>
//             <li>
//               <a href="/dashboard" className="hover:text-cyan-400 transition">
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a href="/upload" className="hover:text-cyan-400 transition">
//                 Upload Data
//               </a>
//             </li>
//             <li>
//               <a href="/docs" className="hover:text-cyan-400 transition">
//                 Documentation
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Company */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Service</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="/about" className="hover:text-cyan-400 transition">
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a href="/contact" className="hover:text-cyan-400 transition">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a href="/about" className="hover:text-cyan-400 transition">
//                 About Us
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Legal & Social */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Legal</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="/privacy" className="hover:text-cyan-400 transition">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="/terms" className="hover:text-cyan-400 transition">
//                 Terms of Service
//               </a>
//             </li>
//           </ul>

//           <div className="flex space-x-4 mt-6">
//             <a href="https://twitter.com" target="_blank" rel="noreferrer">
//               <FaTwitter className="text-xl hover:text-cyan-400 transition" />
//             </a>
//             <a href="https://github.com" target="_blank" rel="noreferrer">
//               <FaGithub className="text-xl hover:text-cyan-400 transition" />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noreferrer">
//               <FaLinkedin className="text-xl hover:text-cyan-400 transition" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
//         © {new Date().getFullYear()} ARGO FloatChat. All rights reserved.
//       </div>
//     </footer>
//   );
// }



// src/components/Footer.jsx
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
    <footer className="relative bg-black text-gray-400 pt-20 pb-8">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute top-0 right-0 w-1/3 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-white font-black text-2xl mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                🌊 ARGO FloatChat
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Transforming oceanographic research through intelligent data conversations 
                and cutting-edge visualization technology.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <HiMail className="w-4 h-4 text-cyan-400" />
                <a href="mailto:hello@argofloatchat.com" className="hover:text-cyan-400 transition-colors">
                  hello@argofloatchat.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HiPhone className="w-4 h-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HiLocationMarker className="w-4 h-4 text-cyan-400" />
                <span>Marine Science Institute, California</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              <a href="https://twitter.com/argofloatchat" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center transition-colors group">
                <FaTwitter className="text-lg group-hover:text-cyan-400" />
              </a>
              <a href="https://github.com/argofloatchat" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gray-500/20 flex items-center justify-center transition-colors group">
                <FaGithub className="text-lg group-hover:text-gray-300" />
              </a>
              <a href="https://linkedin.com/company/argofloatchat" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 flex items-center justify-center transition-colors group">
                <FaLinkedin className="text-lg group-hover:text-blue-400" />
              </a>
              <a href="mailto:hello@argofloatchat.com"
                 className="w-10 h-10 rounded-lg bg-white/5 hover:bg-green-500/20 flex items-center justify-center transition-colors group">
                <FaEnvelope className="text-lg group-hover:text-green-400" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-cyan-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-cyan-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-cyan-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm hover:text-cyan-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-r-lg hover:from-cyan-400 hover:to-blue-400 transition-colors">
                  <HiMail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            <p>© {currentYear} ARGO FloatChat. All rights reserved.</p>
            <p className="mt-1">
              Powered by <strong className="text-cyan-400">ARGO Global Ocean Observing System</strong> • 
              Built with <span className="text-red-400">♥</span> for ocean science
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
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
