

// src/components/Features.jsx
import React, { useState, useEffect } from "react";
import { FaRobot, FaGlobe, FaUpload, FaBolt, FaPlug, FaChartBar, FaArrowRight } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

export default function Features() {
  const [visibleCards, setVisibleCards] = useState(new Set());

  const features = [
    { 
      title: "AI Conversations", 
      desc: "Ask questions in natural language and get intelligent insights from global ocean datasets.",
      icon: <FaRobot />,
      category: "Intelligence",
      colorTheme: {
        gradient: "from-purple-500/20 via-indigo-500/15 to-blue-500/20",
        border: "ring-purple-500/30 hover:ring-purple-400/60",
        iconBg: "from-purple-500/20 to-indigo-500/25",
        iconText: "text-purple-300",
        glow: "hover:shadow-purple-500/25",
        hoverOverlay: "rgba(139, 92, 246, 0.15)" // purple-500
      }
    },
    { 
      title: "Real-Time Visualization", 
      desc: "Interactive maps with live ARGO float positions and ocean parameter visualizations.",
      icon: <FaGlobe />,
      category: "Visualization",
      colorTheme: {
        gradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/20",
        border: "ring-emerald-500/30 hover:ring-emerald-400/60",
        iconBg: "from-emerald-500/20 to-teal-500/25",
        iconText: "text-emerald-300",
        glow: "hover:shadow-emerald-500/25",
        hoverOverlay: "rgba(16, 185, 129, 0.15)" // emerald-500
      }
    },
    { 
      title: "Data Integration", 
      desc: "Upload NetCDF, CSV files and seamlessly integrate with ARGO global datasets.",
      icon: <FaUpload />,
      category: "Integration",
      colorTheme: {
        gradient: "from-blue-500/20 via-sky-500/15 to-cyan-500/20",
        border: "ring-blue-500/30 hover:ring-blue-400/60",
        iconBg: "from-blue-500/20 to-sky-500/25",
        iconText: "text-blue-300",
        glow: "hover:shadow-blue-500/25",
        hoverOverlay: "rgba(59, 130, 246, 0.15)" // blue-500
      }
    },
    { 
      title: "Smart Monitoring", 
      desc: "AI-powered alerts for ocean anomalies, heatwaves, and significant changes.",
      icon: <FaBolt />,
      category: "Monitoring",
      colorTheme: {
        gradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
        border: "ring-amber-500/30 hover:ring-amber-400/60",
        iconBg: "from-amber-500/20 to-orange-500/25",
        iconText: "text-amber-300",
        glow: "hover:shadow-amber-500/25",
        hoverOverlay: "rgba(245, 158, 11, 0.15)" // amber-500
      }
    },
    { 
      title: "Developer APIs", 
      desc: "Comprehensive APIs and SDKs for building custom oceanographic applications.",
      icon: <FaPlug />,
      category: "Development",
      colorTheme: {
        gradient: "from-slate-500/20 via-gray-500/15 to-zinc-500/20",
        border: "ring-slate-500/30 hover:ring-slate-400/60",
        iconBg: "from-slate-500/20 to-gray-500/25",
        iconText: "text-slate-300",
        glow: "hover:shadow-slate-500/25",
        hoverOverlay: "rgba(100, 116, 139, 0.15)" // slate-500
      }
    },
    { 
      title: "Advanced Analytics", 
      desc: "Publication-ready charts, statistical analysis, and regional comparisons.",
      icon: <FaChartBar />,
      category: "Analytics",
      colorTheme: {
        gradient: "from-rose-500/20 via-pink-500/15 to-fuchsia-500/20",
        border: "ring-rose-500/30 hover:ring-rose-400/60",
        iconBg: "from-rose-500/20 to-pink-500/25",
        iconText: "text-rose-300",
        glow: "hover:shadow-rose-500/25",
        hoverOverlay: "rgba(244, 63, 94, 0.15)" // rose-500
      }
    },
  ];

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      aria-label="Platform features and capabilities"
      className="relative isolate px-6 sm:px-12 lg:px-20 py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
    >
      {/* Enhanced background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]">
          <div className="absolute left-1/2 -top-32 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-indigo-600/10 blur-3xl animate-pulse" />
          <div className="absolute right-1/3 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-indigo-400/15 to-cyan-400/10 blur-2xl" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-500/30 backdrop-blur-sm mb-6">
            <HiSparkles className="w-4 h-4" />
            Platform Capabilities
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 text-transparent bg-clip-text tracking-tight mb-6">
            Enterprise-Grade Ocean Intelligence
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300/90 max-w-3xl mx-auto font-normal">
            Discover how our platform transforms raw oceanographic data into 
            <strong className="text-cyan-300 font-semibold"> actionable scientific insights</strong> through 
            cutting-edge AI and visualization technology.
          </p>
        </div>

        {/* Features Grid with Glass Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-card group relative aspect-square rounded-3xl p-6 text-left flex flex-col
                         bg-gradient-to-br ${feature.colorTheme.gradient} backdrop-blur-xl 
                         ring-1 ${feature.colorTheme.border}
                         transform transition-all duration-700 ease-out will-change-transform
                         hover:-translate-y-2 hover:shadow-2xl ${feature.colorTheme.glow}
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
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent opacity-60 pointer-events-none"
              />

              {/* Category badge with matching colors */}
              <div className={`relative inline-flex px-3 py-1.5 rounded-full text-xs font-semibold mb-4
                              bg-gradient-to-r ${feature.colorTheme.gradient} ${feature.colorTheme.iconText} 
                              ring-1 ${feature.colorTheme.border.split(' ')[0]} backdrop-blur-sm self-start
                              border border-white/10`}>
                {feature.category}
              </div>

              {/* Icon with themed colors */}
              <div className="relative mb-4">
                <div className={`h-14 w-14 grid place-items-center rounded-2xl
                                bg-gradient-to-br ${feature.colorTheme.iconBg}
                                ring-1 ring-white/20 ${feature.colorTheme.iconText} text-xl
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                                shadow-lg backdrop-blur-sm border border-white/10`}>
                  {feature.icon}
                </div>
                
                {/* Icon glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{
                    background: `radial-gradient(circle, ${feature.colorTheme.hoverOverlay} 0%, transparent 70%)`
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 relative">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-300/90 leading-relaxed text-sm mb-6 flex-1">
                  {feature.desc}
                </p>

                {/* Learn more link with themed hover */}
                <button className={`inline-flex items-center gap-2 ${feature.colorTheme.iconText} hover:text-white 
                                   font-medium text-sm group-hover:gap-3 transition-all self-start
                                   hover:underline decoration-2 underline-offset-4`}>
                  Learn more
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover effect overlay with themed colors */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(60% 60% at 50% 30%, ${feature.colorTheme.hoverOverlay} 0%, rgba(0,0,0,0) 70%)`,
                  mixBlendMode: "screen",
                }}
              />

              {/* Glass reflection effect */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-1/2 rounded-t-3xl bg-gradient-to-b from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Subtle bottom border accent */}
              <div
                aria-hidden="true" 
                className="absolute left-6 right-6 bottom-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to transform your oceanographic research?</p>
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold
                             bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                             text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                             transform transition-all duration-300 hover:scale-[1.02]
                             ring-1 ring-white/20 backdrop-blur-sm">
            <HiLightningBolt className="w-5 h-5" />
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
