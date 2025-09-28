// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import CursorGlow from "../components/CursorGlow";
import Features from "../components/Features";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}
