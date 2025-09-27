// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatProvider } from "./states/ChatContext";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Floats from "./pages/Floats";
import SignupPage from "./pages/SignUp";
import Upload from "./pages/Upload";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <>
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/floats" element={<Floats />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </ChatProvider>

      {/* Global toast (available across all routes) */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 2500,
          style: { background: "#1f2937", color: "#fff", border: "1px solid #374151" }, // gray-800/700
          success: { iconTheme: { primary: "#22d3ee", secondary: "#111827" } }, // cyan-400 on gray-900
        }}
      />
    </>
  );
}
