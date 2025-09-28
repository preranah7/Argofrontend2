// src/pages/Upload.jsx 
import React from "react";
import Sidebar from "../components/SideBar";    
import UploadContent from "../components/Upload"; 
import { useNavigate } from "react-router-dom";
import { useChat } from "../states/ChatContext";

export default function Upload() {
  const navigate = useNavigate();
  const { chats, openChat, newChat, activeChat } = useChat();

  return (
    // RESPONSIVE: Enhanced container with proper overflow handling
    <div className="h-screen w-screen flex bg-black overflow-hidden">
      
      {/* RESPONSIVE: Sidebar with adaptive visibility */}
      <div className="flex-shrink-0">
        <Sidebar
          chats={chats}
          onNewChat={() => {
            newChat();
            navigate("/chat"); 
          }}
          onOpenChat={(id) => {
            openChat(id);
            navigate("/chat"); 
          }}
          onDeleteChat={(id) => {
            // Add delete functionality if needed
            console.log("Delete chat:", id);
          }}
          onToggleTheme={(isDark) => {
            // Add theme toggle functionality if needed
            console.log("Toggle theme:", isDark);
          }}
          activeChat={activeChat}
          onHome={() => navigate("/home")}
          onDiscover={() => navigate("/floats")}
          profileName="User" // Add default profile name
        />
      </div>

      {/* RESPONSIVE: Main content area with proper overflow and spacing */}
      <div className="flex-1 h-screen overflow-hidden flex flex-col min-w-0">
        {/* RESPONSIVE: Scrollable content container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full">
            <UploadContent />
          </div>
        </div>
      </div>
    </div>
  );
}
