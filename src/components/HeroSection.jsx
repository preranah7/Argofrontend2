
// // src/components/HeroWithProblemSolution.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { FaChevronDown, FaDatabase, FaWater, FaExclamationTriangle, FaCheck, FaUpload, FaBook } from "react-icons/fa";
// import { HiSparkles, HiLightBulb, HiGlobeAlt, HiChartBar, HiX } from "react-icons/hi";
// import { Link } from "react-router-dom";

// export default function HeroSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [scrollY, setScrollY] = useState(0);

//   // Performance-optimized scroll handler
//   const handleScroll = useCallback(() => {
//     setScrollY(window.pageYOffset);
//   }, []);

//   // Intersection Observer for entrance animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsVisible(entry.isIntersecting),
//       { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
//     );

//     const heroElement = document.getElementById("hero");
//     if (heroElement) observer.observe(heroElement);

//     return () => observer.disconnect();
//   }, []);

//   // Throttled scroll listener for performance
//   useEffect(() => {
//     let ticking = false;
//     const requestTick = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", requestTick, { passive: true });
//     return () => window.removeEventListener("scroll", requestTick);
//   }, [handleScroll]);

//   const stats = [
//     { value: "50K+", label: "Active Floats", icon: <FaWater /> },
//     { value: "180+", label: "Countries", icon: <HiGlobeAlt /> },
//     { value: "99.9%", label: "Uptime", icon: <HiChartBar /> },
//   ];

//   const problems = [
//     {
//       icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
//       title: "Fragmented Data Sources",
//       desc: "Ocean data scattered across dozens of incompatible platforms and formats"
//     },
//     {
//       icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
//       title: "Complex Technical Barriers", 
//       desc: "NetCDF, GRIB, and HDF formats require specialized knowledge and tools"
//     },
//     {
//       icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
//       title: "Time-Intensive Analysis",
//       desc: "Hours of manual processing for basic ocean parameter queries"
//     },
//     {
//       icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
//       title: "Limited Visualization Tools",
//       desc: "Static charts can't capture the dynamic nature of ocean systems"
//     }
//   ];

//   const solutions = [
//     {
//       icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
//       title: "Unified Global Database",
//       desc: "All ARGO float data harmonized in one intelligent platform"
//     },
//     {
//       icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
//       title: "Natural Language Queries",
//       desc: "Ask questions in plain English, get scientific insights instantly"
//     },
//     {
//       icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
//       title: "Real-Time Processing",
//       desc: "AI-powered analysis delivers results in seconds, not hours"
//     },
//     {
//       icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
//       title: "Interactive 3D Visualization",
//       desc: "Dynamic maps and charts that reveal ocean patterns and anomalies"
//     }
//   ];

//   // Smooth scroll to section
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };

//   return (
//     <>
//       {/* HERO SECTION */}
//       <section
//         id="hero"
//         role="region"
//         aria-label="Hero section"
//         className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-black text-white"
//       >
//         {/* Advanced Background Effects */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 -z-10"
//           style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }}
//         >
//           <div className="absolute inset-0 [mask-image:radial-gradient(75%_65%_at_50%_40%,black,transparent)]">
//             {/* Primary glow */}
//             <div className="absolute left-1/2 -top-40 h-[60rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-indigo-600/15 blur-3xl animate-pulse" />
//             {/* Secondary glows */}
//             <div className="absolute left-1/3 -bottom-32 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-cyan-400/20 via-teal-500/15 to-blue-600/10 blur-2xl" />
//             <div className="absolute right-1/4 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tl from-indigo-500/15 to-purple-600/10 blur-xl" />
//           </div>
//         </div>

//         {/* Animated grid overlay */}
//         <div 
//           aria-hidden="true" 
//           className="absolute inset-0 -z-5 opacity-20"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px',
//             transform: `translate3d(0, ${scrollY * 0.1}px, 0)`
//           }}
//         />

//         <div className="relative z-10 px-6 lg:px-16 pt-20 pb-16 flex flex-col items-center justify-center min-h-screen">
//           {/* Trust indicators */}
//           <div 
//             className={`mb-8 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 ease-out ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//             }`}
//             style={{ transitionDelay: '100ms' }}
//           >
//             <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-500/30 backdrop-blur-sm">
//               <HiSparkles className="w-4 h-4" />
//               AI-Powered Ocean Intelligence
//             </span>
//             <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 ring-1 ring-blue-500/30 backdrop-blur-sm">
//               <FaDatabase className="w-4 h-4" />
//               Real-time Global Data
//             </span>
//           </div>

//           {/* Main headline - FIXED: Lighter font weight */}
//           <div className="mx-auto w-full max-w-6xl text-center">
//             <h1 
//               className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-8 transition-all duration-1200 ease-out ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
//               }`}
//               style={{ transitionDelay: '200ms' }}
//             >
//               <span className="block leading-[0.9] bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
//                 Unlock Ocean
//               </span>
//               <span className="block leading-[0.9] bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-medium">
//                 Intelligence
//               </span>
//               <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 font-medium bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
//                 with ARGO FloatChat
//               </span>
//             </h1>

//             {/* Value proposition */}
//             <p 
//               className={`text-lg sm:text-xl md:text-2xl text-gray-300/95 leading-relaxed mb-12 max-w-4xl mx-auto font-normal transition-all duration-1000 ease-out ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ transitionDelay: '400ms' }}
//               id="hero-desc"
//             >
//               Transform complex <strong className="text-cyan-300 font-semibold">oceanographic data</strong> into 
//               actionable insights through intelligent conversations and advanced visualization.
//             </p>

//             {/* FIXED: Glass Background Navigation with All 5 Buttons */}
//             <div 
//               className={`mb-20 transition-all duration-1000 ease-out ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ transitionDelay: '600ms' }}
//             >
//               <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
//                 <button
//                   onClick={() => scrollToSection('features')}
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
//                              bg-white/10 hover:bg-white/20 text-white hover:text-cyan-100
//                              transition-all duration-200 hover:scale-105"
//                 >
//                   <HiSparkles className="w-4 h-4" />
//                   Features
//                 </button>

//                 <button
//                   onClick={() => scrollToSection('problem-solution')}
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
//                              bg-white/10 hover:bg-white/20 text-white hover:text-cyan-100
//                              transition-all duration-200 hover:scale-105"
//                 >
//                   <HiGlobeAlt className="w-4 h-4" />
//                   Solutions
//                 </button>

//                 {/* AI Chat in the middle - Same styling as others but with gradient */}
//                 <Link
//                   to="/chat"
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
//                              bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
//                              text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
//                              transition-all duration-200 hover:scale-105"
//                 >
//                   <HiLightBulb className="w-4 h-4" />
//                   AI Chat
//                 </Link>

//                 <Link
//                   to="/upload"
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
//                              bg-white/10 hover:bg-white/20 text-white hover:text-cyan-100
//                              transition-all duration-200 hover:scale-105"
//                 >
//                   <FaUpload className="w-4 h-4" />
//                   Upload
//                 </Link>

//                 <Link
//                   to="/docs"
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
//                              bg-white/10 hover:bg-white/20 text-white hover:text-cyan-100
//                              transition-all duration-200 hover:scale-105"
//                 >
//                   <FaBook className="w-4 h-4" />
//                   Documentation
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced scroll indicator */}
//           <a
//             href="#problem-solution"
//             className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
//                        text-cyan-400/70 hover:text-cyan-300 focus-visible:outline-none
//                        focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-2xl p-4
//                        transform transition-all duration-300 hover:scale-110"
//             aria-label="Discover the problem we solve"
//           >
//             <span className="text-sm font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
//               See The Challenge
//             </span>
//             <div className="relative">
//               <FaChevronDown
//                 size={20}
//                 className="animate-bounce motion-reduce:animate-none group-hover:animate-pulse"
//                 aria-hidden="true"
//               />
//               <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//           </a>
//         </div>

//         {/* Performance optimized overlay */}
//         <div 
//           aria-hidden="true" 
//           className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none will-change-transform"
//         />
//       </section>

//       {/* PROBLEM/SOLUTION SECTION */}
//       <section
//         id="problem-solution"
//         aria-label="Problem and solution overview"
//         className="relative isolate py-24 lg:py-32 bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white"
//       >
//         {/* Background effects */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 -z-10"
//         >
//           <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-500/10 via-orange-500/5 to-yellow-500/5 blur-3xl" />
//           <div className="absolute right-1/4 bottom-0 h-[35rem] w-[35rem] rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 blur-2xl" />
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
//           {/* Section intro */}
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-200 ring-1 ring-red-500/30 backdrop-blur-sm mb-6">
//               <FaExclamationTriangle className="w-4 h-4" />
//               The Current Challenge
//             </div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
//                 Ocean Research
//               </span>{" "}
//               <span className="text-white">is</span>{" "}
//               <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
//                 Fragmented
//               </span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto font-normal">
//               Despite having the most comprehensive ocean monitoring system ever created, 
//               researchers still struggle with fundamental data accessibility challenges.
//             </p>
//           </div>

//           {/* Problem vs Solution Grid */}
//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             {/* PROBLEMS */}
//             <div className="space-y-8">
//               <div className="text-center lg:text-left">
//                 <div className="inline-flex items-center gap-3 mb-6">
//                   <HiX className="w-8 h-8 text-red-400" />
//                   <h3 className="text-2xl font-bold text-red-400">Current Problems</h3>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {problems.map((problem, index) => (
//                   <div 
//                     key={index}
//                     className="group p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-orange-500/5 
//                                border border-red-500/20 hover:border-red-500/30 
//                                backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/20 
//                                       flex items-center justify-center group-hover:scale-110 transition-transform">
//                         {problem.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
//                           {problem.title}
//                         </h4>
//                         <p className="text-gray-300 leading-relaxed">
//                           {problem.desc}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* SOLUTIONS */}
//             <div className="space-y-8">
//               <div className="text-center lg:text-left">
//                 <div className="inline-flex items-center gap-3 mb-6">
//                   <FaCheck className="w-8 h-8 text-cyan-400" />
//                   <h3 className="text-2xl font-bold text-cyan-400">Our Solution</h3>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {solutions.map((solution, index) => (
//                   <div 
//                     key={index}
//                     className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 
//                                border border-cyan-500/20 hover:border-cyan-500/30 
//                                backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 
//                                       flex items-center justify-center group-hover:scale-110 transition-transform">
//                         {solution.icon}
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
//                           {solution.title}
//                         </h4>
//                         <p className="text-gray-300 leading-relaxed">
//                           {solution.desc}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Transition statement */}
//           <div className="text-center mt-20">
//             <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl 
//                             bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
//                             border border-cyan-500/20 backdrop-blur-sm">
//               <div className="text-4xl">🌊</div>
//               <div className="text-left">
//                 <div className="text-lg font-semibold text-white mb-1">
//                   From Hours to Seconds
//                 </div>
//                 <div className="text-gray-300 text-sm">
//                   See how ARGO FloatChat transforms ocean research workflows
//                 </div>
//               </div>
//               <FaChevronDown className="w-5 h-5 text-cyan-400 animate-bounce" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// src/components/HeroWithProblemSolution.jsx
import React, { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaDatabase, FaExclamationTriangle, FaCheck, FaUpload, FaBook } from "react-icons/fa";
import { HiSparkles, HiLightBulb, HiGlobeAlt, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const heroElement = document.getElementById("hero");
    if (heroElement) observer.observe(heroElement);

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
      title: "Fragmented Data Sources",
      desc: "Ocean data scattered across dozens of incompatible platforms and formats"
    },
    {
      icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
      title: "Complex Technical Barriers", 
      desc: "NetCDF, GRIB, and HDF formats require specialized knowledge and tools"
    },
    {
      icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />,
      title: "Time-Intensive Analysis",
      desc: "Hours of manual processing for basic ocean parameter queries"
    }
  ];

  const solutions = [
    {
      icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
      title: "Unified Global Database",
      desc: "All ARGO float data harmonized in one intelligent platform"
    },
    {
      icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
      title: "Natural Language Queries",
      desc: "Ask questions in plain English, get scientific insights instantly"
    },
    {
      icon: <FaCheck className="w-5 h-5 text-cyan-400" />,
      title: "Real-Time Processing",
      desc: "AI-powered analysis delivers results in seconds, not hours"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* ASHNA-INSPIRED HERO - Clean Centered Layout */}
      <section
        id="hero"
        role="region"
        aria-label="Hero section"
        className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 -top-40 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-indigo-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 px-6 lg:px-16 pt-20 pb-16 flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div 
            className={`mb-8 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-400/30 backdrop-blur-sm">
              <HiSparkles className="w-4 h-4" />
              World's First AI Ocean Assistant
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="block leading-[0.9] text-white mb-4">
              Chat with the
            </span>
            <span className="block leading-[0.9] bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Ocean
            </span>
          </h1>

          {/* Value Proposition */}
          <p 
            className={`text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8 max-w-4xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            ARGO FloatChat makes oceanographic research accessible to everyone. 
            Ask questions in plain English and get instant insights from <strong className="text-cyan-300">50,000+ ocean sensors</strong> worldwide.
          </p>

          {/* Key Stats */}
          <div 
            className={`grid sm:grid-cols-3 gap-8 mb-12 max-w-4xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-gray-400">Active Ocean Floats</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">180+</div>
              <div className="text-gray-400">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">24/7</div>
              <div className="text-gray-400">Real-time Updates</div>
            </div>
          </div>

          {/* Main CTA */}
          <div 
            className={`mb-12 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-lg rounded-2xl
                         bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                         text-white shadow-xl hover:shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40
                         transition-all duration-300 hover:scale-105 mr-4"
            >
              <HiLightBulb className="w-5 h-5 mr-3" />
              Start Chatting
            </Link>
            
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-lg rounded-2xl
                         bg-white/10 hover:bg-white/20 ring-1 ring-white/20 hover:ring-white/30
                         backdrop-blur-sm text-white hover:text-cyan-100
                         transition-all duration-300 hover:scale-105"
            >
              <FaUpload className="w-5 h-5 mr-3" />
              Upload Data
            </Link>
          </div>

          {/* Use Cases */}
          <div 
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl text-center transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              "Marine Research",
              "Climate Analysis", 
              "Ocean Monitoring",
              "Educational Tools"
            ].map((useCase, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-medium text-white">{useCase}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <a
            href="#problem-solution"
            className="absolute bottom-8 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Scroll to learn more"
          >
            <FaChevronDown size={20} />
          </a>
        </div>
      </section>

      {/* PROBLEM/SOLUTION SECTION */}
      <section
        id="problem-solution"
        aria-label="Problem and solution overview"
        className="relative py-20 lg:py-24 bg-gradient-to-b from-black to-slate-950 text-white"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-500/5 to-cyan-400/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-300 ring-1 ring-red-500/20 mb-6">
              <FaExclamationTriangle className="w-3 h-3" />
              The Challenge
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium mb-6">
              <span className="text-red-400">Ocean Research</span>{" "}
              <span className="text-white">is</span>{" "}
              <span className="text-red-400">Fragmented</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Despite advanced monitoring systems, researchers face fundamental data accessibility challenges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <HiX className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-red-400">Current Problems</h3>
              </div>
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-red-500/10 hover:border-red-500/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        {problem.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{problem.title}</h4>
                        <p className="text-sm text-gray-400">{problem.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FaCheck className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-cyan-400">Our Solution</h3>
              </div>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-cyan-500/10 hover:border-cyan-500/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        {solution.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{solution.title}</h4>
                        <p className="text-sm text-gray-400">{solution.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-cyan-500/20">
              <span className="text-2xl">🌊</span>
              <div className="text-left">
                <div className="font-medium text-white">From Hours to Seconds</div>
                <div className="text-sm text-gray-400">Experience the transformation</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

