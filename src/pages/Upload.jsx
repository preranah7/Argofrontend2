// src/pages/Upload.jsx
import React from "react";
import Sidebar from "../components/SideBar";    // same Sidebar
import UploadContent from "../components/Upload"; // the UI component you built
import { useNavigate } from "react-router-dom";
import { useChat } from "../states/ChatContext";

export default function Upload() {
  const navigate = useNavigate();
  const { chats, openChat, newChat, activeChat } = useChat();

  return (
    <div className="h-screen w-screen flex bg-[#0B1622]">
      <Sidebar
        chats={chats}
        onNewChat={() => {
          newChat();
          navigate("/chat"); // start a fresh chat
        }}
        onOpenChat={(id) => {
          openChat(id);
          navigate("/chat"); // jump to the chat page with selected chat
        }}
        activeChat={activeChat}
        onHome={() => navigate("/home")}
        onDiscover={() => navigate("/floats")}
      />

  <div className="flex-1 h-screen overflow-y-auto ">
    <UploadContent />
  </div>

    </div>
  );
}
