// src/components/CombinedFeatures.jsx - Enhanced responsive with repeatable animations
import React, { useState, useEffect } from "react";
import { FaRobot, FaGlobe, FaUpload, FaBolt, FaPlug, FaChartBar, FaExclamationTriangle } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function CombinedFeatures() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [visibleProblems, setVisibleProblems] = useState(new Set());

  const problems = [
    {
      icon: <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
      title: "Fragmented Data Sources",
      desc: "Ocean data scattered across dozens of incompatible platforms and formats",
    },
    {
      icon: <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
      title: "Complex Technical Barriers",
      desc: "NetCDF, GRIB, and HDF formats require specialized knowledge and tools",
    },
    {
      icon: <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
      title: "Time-Intensive Analysis",
      desc: "Hours of manual processing for basic ocean parameter queries",
    },
    {
      icon: <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
      title: "Limited Visualization Tools",
      desc: "Static charts can't capture the dynamic nature of ocean systems",
    },
  ];

  const features = [
    { 
      title: "AI Conversations", 
      desc: "Ask questions in natural language and get intelligent insights from global ocean datasets.",
      icon: <FaRobot />,
      category: "Intelligence",
      colorTheme: {
        border: "ring-purple-500/30 hover:ring-purple-400/60",
        iconBg: "from-purple-500/20 to-indigo-500/25",
        iconText: "text-purple-300",
        glow: "hover:shadow-purple-500/25",
        hoverOverlay: "rgba(139, 92, 246, 0.15)"
      }
    },
    { 
      title: "Real-Time Visualization", 
      desc: "Interactive maps with live ARGO float positions and ocean parameter visualizations.",
      icon: <FaGlobe />,
      category: "Visualization",
      colorTheme: {
        border: "ring-emerald-500/30 hover:ring-emerald-400/60",
        iconBg: "from-emerald-500/20 to-teal-500/25",
        iconText: "text-emerald-300",
        glow: "hover:shadow-emerald-500/25",
        hoverOverlay: "rgba(16, 185, 129, 0.15)"
      }
    },
    { 
      title: "Data Integration", 
      desc: "Upload NetCDF, CSV files and seamlessly integrate with ARGO global datasets.",
      icon: <FaUpload />,
      category: "Integration",
      colorTheme: {
        border: "ring-blue-500/30 hover:ring-blue-400/60",
        iconBg: "from-blue-500/20 to-sky-500/25",
        iconText: "text-blue-300",
        glow: "hover:shadow-blue-500/25",
        hoverOverlay: "rgba(59, 130, 246, 0.15)"
      }
    },
    { 
      title: "Smart Monitoring", 
      desc: "AI-powered alerts for ocean anomalies, heatwaves, and significant changes.",
      icon: <FaBolt />,
      category: "Monitoring",
      colorTheme: {
        border: "ring-amber-500/30 hover:ring-amber-400/60",
        iconBg: "from-amber-500/20 to-orange-500/25",
        iconText: "text-amber-300",
        glow: "hover:shadow-amber-500/25",
        hoverOverlay: "rgba(245, 158, 11, 0.15)"
      }
    },
    { 
      title: "Developer APIs", 
      desc: "Comprehensive APIs and SDKs for building custom oceanographic applications.",
      icon: <FaPlug />,
      category: "Development",
      colorTheme: {
        border: "ring-slate-500/30 hover:ring-slate-400/60",
        iconBg: "from-slate-500/20 to-gray-500/25",
        iconText: "text-slate-300",
        glow: "hover:shadow-slate-500/25",
        hoverOverlay: "rgba(100, 116, 139, 0.15)"
      }
    },
    { 
      title: "Advanced Analytics", 
      desc: "Publication-ready charts, statistical analysis, and regional comparisons.",
      icon: <FaChartBar />,
      category: "Analytics",
      colorTheme: {
        border: "ring-rose-500/30 hover:ring-rose-400/60",
        iconBg: "from-rose-500/20 to-pink-500/25",
        iconText: "text-rose-300",
        glow: "hover:shadow-rose-500/25",
        hoverOverlay: "rgba(244, 63, 94, 0.15)"
      }
    },
  ];

  // Intersection Observer for features (staggered animations) - repeatable
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            // Add to visible set when entering viewport
            setVisibleCards(prev => new Set([...prev, index]));
          } else {
            // Remove from visible set when leaving viewport (allows re-animation)
            setVisibleCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for problems (left/right animations) - repeatable
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.problemindex);
          if (entry.isIntersecting) {
            // Add to visible set when entering viewport
            setVisibleProblems(prev => new Set([...prev, index]));
          } else {
            // Remove from visible set when leaving viewport (allows re-animation)
            setVisibleProblems(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* PROBLEM SECTION - Black background with full responsiveness */}
      <section
        id="problem-solution"
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-black text-white"
      >
        {/* Subtle background effects on black */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]">
            <div className="absolute left-1/2 -top-32 h-[30rem] sm:h-[35rem] md:h-[40rem] w-[40rem] sm:w-[50rem] md:w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-500/10 via-orange-500/8 to-red-500/8 blur-3xl" />
            <div className="absolute right-1/3 bottom-0 h-[20rem] sm:h-[25rem] md:h-[30rem] w-[20rem] sm:w-[25rem] md:w-[30rem] rounded-full bg-gradient-to-br from-orange-400/8 to-red-400/6 blur-2xl" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section intro - fully responsive */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-200 ring-1 ring-red-500/30 backdrop-blur-sm mb-6 sm:mb-7 md:mb-8">
              <FaExclamationTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
              The Current Challenge
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Ocean Research
              </span>{" "}
              <span className="text-white">is</span>{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Fragmented
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
              Despite the world's most advanced ocean monitoring network, 
              researchers still face critical barriers in accessing and analyzing fundamental data.
            </p>
          </div>

          {/* Problems Grid - 2x2 Layout with enhanced responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {problems.map((problem, index) => (
              <div
                key={index}
                data-problemindex={index}
                className={`problem-card group p-4 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-orange-500/8 border border-red-500/20 
                hover:border-red-400/30 hover:scale-[1.02] transition-all duration-700 shadow-lg hover:shadow-red-500/20 backdrop-blur-sm
                ${visibleProblems.has(index) 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${
                    // Top row (index 0,1) comes from left/right, bottom row (index 2,3) comes from right/left
                    index === 0 || index === 2 
                      ? '-translate-x-12 sm:-translate-x-16' 
                      : 'translate-x-12 sm:translate-x-16'
                  }`
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/15 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-1 ring-red-500/30">
                    {problem.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-red-100 transition-colors leading-tight">
                      {problem.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {problem.desc}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Black background with full responsiveness */}
      <section
        id="features"
        aria-label="Platform features and capabilities"
        className="relative isolate px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-14 md:py-16 lg:py-20 bg-black text-white"
      >
        {/* Subtle background effects on black */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]">
            <div className="absolute left-1/2 -top-32 h-[30rem] sm:h-[35rem] md:h-[40rem] w-[40rem] sm:w-[50rem] md:w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/8 to-indigo-600/6 blur-3xl" />
            <div className="absolute right-1/3 bottom-0 h-[20rem] sm:h-[25rem] md:h-[30rem] w-[20rem] sm:w-[25rem] md:w-[30rem] rounded-full bg-gradient-to-br from-indigo-400/8 to-cyan-400/6 blur-2xl" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl w-full">
          {/* Section header - fully responsive */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-500/30 backdrop-blur-sm mb-5 sm:mb-6">
              <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Platform Capabilities
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 text-transparent bg-clip-text tracking-tight mb-4 sm:mb-6 px-2 sm:px-0">
              Our Solution
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-300/90 max-w-3xl mx-auto font-normal px-2 sm:px-4 md:px-0">
              Transform raw oceanographic data into 
              <strong className="text-cyan-300 font-semibold"> actionable scientific insights</strong> through 
              cutting-edge AI and visualization technology.
            </p>
          </div>

          {/* Rectangular Features Grid - fully responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center flex flex-col justify-center
                           bg-white/5 backdrop-blur-xl h-40 sm:h-44 md:h-48 lg:h-52
                           ring-1 ${feature.colorTheme.border}
                           transform transition-all duration-700 ease-out will-change-transform
                           hover:-translate-y-2 hover:shadow-xl ${feature.colorTheme.glow}
                           focus-within:outline-none focus-within:ring-4 focus-within:ring-cyan-400/40
                           ${visibleCards.has(index) 
                             ? 'opacity-100 translate-y-0' 
                             : 'opacity-0 translate-y-8'
                           }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Glass overlay effect */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent opacity-60 pointer-events-none"
                />

                {/* Category badge with matching colors - responsive */}
                <div className={`relative inline-flex px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold mb-2 sm:mb-3
                                bg-gradient-to-r ${feature.colorTheme.iconBg} ${feature.colorTheme.iconText} 
                                ring-1 ${feature.colorTheme.border.split(' ')[0]} backdrop-blur-sm self-center
                                border border-white/10`}>
                  {feature.category}
                </div>

                {/* Icon with themed colors - responsive */}
                <div className="relative mb-2 sm:mb-3 flex justify-center">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 grid place-items-center rounded-lg sm:rounded-xl
                                  bg-gradient-to-br ${feature.colorTheme.iconBg}
                                  ring-1 ring-white/20 ${feature.colorTheme.iconText} text-lg sm:text-xl
                                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                                  shadow-lg backdrop-blur-sm border border-white/10`}>
                    {feature.icon}
                  </div>
                  
                  {/* Icon glow effect */}
                  <div 
                    className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                    style={{
                      background: `radial-gradient(circle, ${feature.colorTheme.hoverOverlay} 0%, transparent 70%)`
                    }}
                  />
                </div>

                {/* Content - responsive */}
                <div className="flex flex-col items-center relative flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-white transition-colors leading-tight text-center">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-xs text-center">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover effect overlay with themed colors */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(60% 60% at 50% 30%, ${feature.colorTheme.hoverOverlay} 0%, rgba(0,0,0,0) 70%)`,
                    mixBlendMode: "screen",
                  }}
                />

                {/* Glass reflection effect */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 w-full h-1/2 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                {/* Subtle bottom border accent */}
                <div
                  aria-hidden="true" 
                  className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-2 sm:bottom-3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"
                />
              </div>
            ))}
          </div>

          {/* Bottom CTA - responsive and navigates to /chat */}
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 px-2">Ready to transform your oceanographic research?</p>
            <Link 
              to="/chat"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base
                         bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                         text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                         transform transition-all duration-300 hover:scale-[1.02]
                         ring-1 ring-white/20 backdrop-blur-sm"
            >
              <HiLightningBolt className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
