// src/state/ChatContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";

const ChatContext = createContext(null);

const makeChatId = () => crypto.randomUUID();

export function ChatProvider({ children }) {
  // chats: [{ id, title, messages: [{sender:'user', text} | {sender:'assistant', response}] }]
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const firstMessage = (message) => {
    if (!message || !message.trim()) return null;
    const id = makeChatId();
    const title = message.split(" ").slice(0, 5).join(" ");
    const newChat = { id, title, messages: [{ sender: "user", text: message }] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(id);
    return id;
  };

  const appendUser = (message) => {
    if (!message || !message.trim()) return;
    if (!activeChat) {
      // Fallback: create a chat if somehow none is active
      return firstMessage(message);
    }
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat ? { ...c, messages: [...c.messages, { sender: "user", text: message }] } : c
      )
    );
  };

  const appendAssistant = (response, targetChatId) => {
    const targetId = targetChatId || activeChat;
    if (!targetId) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === targetId ? { ...c, messages: [...c.messages, { sender: "assistant", response }] } : c
      )
    );
  };

  const openChat = (chatId) => {
    setActiveChat(chatId);
  };

  const newChat = () => {
    setActiveChat(null);
  };

  // NEW: Delete chat function
  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    // If the deleted chat was active, clear the active chat
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };

  const value = useMemo(
    () => ({
      chats,
      activeChat,
      setActiveChat,
      firstMessage,
      appendUser,
      appendAssistant,
      openChat,
      newChat,
      deleteChat, // NEW: Add deleteChat to context
    }),
    [chats, activeChat]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
