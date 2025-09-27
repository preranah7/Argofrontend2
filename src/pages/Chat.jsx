// src/pages/Chat.jsx
import React, { useState, useMemo } from "react";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/SideBar"; // keep your existing import path/case
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
    newChat();                 // clear activeChat globally
    setResetTrigger((p) => !p); // reset composer locally
  };

  const handleOpenChat = (chatId) => {
    openChat(chatId);
    setResetTrigger((p) => !p);
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
    <div className="h-screen w-screen flex bg-[#0B1622]">
      <Sidebar
        chats={chats}
        onNewChat={handleNewChat}
        onOpenChat={handleOpenChat}
        onDeleteChat={deleteChat}
        activeChat={activeChat}
        onHome={() => navigate("/home")}
        onDiscover={() => navigate("/floats")}
      />

      <div className="flex-1">
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
  );
}
