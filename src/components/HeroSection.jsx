// src/components/Hero.jsx - Fixed responsive image sizing
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaPlay, FaQuoteLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/15 blur-2xl animate-float-delayed" />
      </div>

      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 sm:px-8 py-16">
        {/* Centered Pill */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 ring-1 ring-cyan-400/30 backdrop-blur-xl">
            <HiSparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-200">AI-Powered Ocean Intelligence</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left lg:pr-8">
            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.1] transition-all duration-1000 mb-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                Explore the Oceans
              </span>
              <span className="block text-white font-medium mb-3">with</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                ARGO FloatChat
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light mb-10">
              Query, visualize, and discover oceanographic data with{" "}
              <span className="text-cyan-400 font-medium">AI-powered chat</span> and{" "}
              <span className="text-blue-400 font-medium">real-time insights</span>.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                to="/chat"
                className="group inline-flex items-center justify-center px-7 py-3.5 text-base font-medium rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                Try the Chat
                <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/upload"
                className="group inline-flex items-center justify-center px-7 py-3.5 text-base rounded-2xl bg-white/10 hover:bg-white/20 ring-1 ring-white/30 hover:ring-cyan-400/50 backdrop-blur-sm"
              >
                Upload Data
              </Link>
            </div>
            {/* Quote */}
            <div className="group relative max-w-lg mx-auto lg:mx-0">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 border border-cyan-500/20 hover:border-cyan-400/30 backdrop-blur-sm hover:backdrop-blur-md hover:bg-gradient-to-r hover:from-white/8 hover:via-white/5 hover:to-white/8 transition-all duration-300">
                <FaQuoteLeft className="w-5 h-5 text-cyan-400/50 mb-3" />
                <blockquote className="text-cyan-300/90 italic text-lg leading-relaxed font-light">
                  "Built with passion for ocean science and powered by multi-modal AI, we transform ARGO's
                  complexity into clarity."
                </blockquote>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - Fixed responsive sizing */}
          <div className="lg:col-span-5 flex flex-col items-center mb-10">
            {/* Main Image Container - Properly sized */}
            <Link
              to="/floats"
              className="group relative p-8 lg:p-10 mb-10"
            >
              <div className="relative">
                {/* Fixed Image - responsive sizing instead of fixed pixels */}
                <img
                  src="/Argo_wld.png"
                  alt="ARGO Float Global Distribution"
                  className="w-full h-auto max-w-sm lg:max-w-md xl:max-w-lg rounded-2xl animate-spin-ultra-slow group-hover:animate-spin-slow"
                  style={{ filter: "brightness(1.1) contrast(1.2)" }}
                />

                {/* Three dots */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg" />
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }} />
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-purple font-medium text-sm">
                    Click to explore floats →
                  </div>
                </div>
              </div>

              {/* Global ARGO Network - Below image with cyan text */}
              <div className="mt-5 mb-10 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 text-center">
                <div className="text-sm font-medium text-cyan-300 mb-1">Global ARGO Network</div>
                <div className="text-xs text-gray-300 font-light">Real-time oceanographic data coverage</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-1deg); }
        }
        @keyframes spin-ultra-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-spin-ultra-slow { animation: spin-ultra-slow 60s linear infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </section>
  );
}

