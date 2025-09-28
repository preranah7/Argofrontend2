// src/pages/Chat.jsx - Made fully responsive for all screen sizes
import React, { useState, useMemo } from "react";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/SideBar"; 
import { useNavigate } from "react-router-dom";
import { useChat } from "../states/ChatContext";

export default function Chat() {
  const [resetTrigger, setResetTrigger] = useState(false);
  const navigate = useNavigate();

  const {
    chats,
    activeChat,
    openChat,
    newChat,
    deleteChat,
    firstMessage,
    appendUser,
    appendAssistant,
  } = useChat();

  const handleNewChat = () => {
    newChat();                 
    setResetTrigger((p) => !p); 
  };

  const handleOpenChat = (chatId) => {
    openChat(chatId);
    setResetTrigger((p) => !p);
  };

  const handleToggleTheme = (isDark) => {
    // Add theme toggle functionality if needed
    console.log("Toggle theme:", isDark);
  };

  const currentMessages = useMemo(
    () => chats.find((c) => c.id === activeChat)?.messages || [],
    [chats, activeChat]
  );

  const userHistory = useMemo(
    () => currentMessages.filter((m) => m.sender === "user").map((m) => ({ query: m.text })),
    [currentMessages]
  );

  return (
    // RESPONSIVE: Enhanced container with proper overflow handling
    <div className="h-screen w-screen flex bg-[#0B1622] overflow-hidden">
      
      {/* RESPONSIVE: Sidebar with proper flex handling */}
      <div className="flex-shrink-0 z-10">
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onOpenChat={handleOpenChat}
          onDeleteChat={deleteChat}
          onToggleTheme={handleToggleTheme}
          activeChat={activeChat}
          profileName="User" // Add default profile name
          brandName="ARGO FloatChat" // Add brand name
          logoText="🌊" // Add logo text
        />
      </div>

      {/* RESPONSIVE: Main chat interface with proper overflow */}
      <div className="flex-1 min-w-0 h-screen overflow-hidden">
        <div className="w-full h-full">
          <ChatInterface
            resetTrigger={resetTrigger}
            onFirstMessage={(msg) => firstMessage(msg)}
            onMessage={(msg) => appendUser(msg)}
            onAssistantMessage={(resp, chatId) => appendAssistant(resp, chatId)}
            messages={currentMessages}
            userHistory={userHistory}
          />
        </div>
      </div>
    </div>
  );
}
