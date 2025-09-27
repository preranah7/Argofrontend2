// src/hooks/useChatOptimization.js
import { useMemo, useCallback, useRef, useEffect } from 'react';

export const useChatOptimization = (messages) => {
  const messagesEndRef = useRef(null);
  const observerRef = useRef(null);

  // Optimize messages with unique IDs and timestamps
  const optimizedMessages = useMemo(() => 
    messages.map((msg, index) => ({
      ...msg,
      id: msg.id || `msg-${index}-${msg.timestamp || Date.now()}`,
      timestamp: msg.timestamp || Date.now(),
      // Add display optimizations
      _isOptimized: true
    })), [messages]
  );

  // Smooth scroll to bottom
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure DOM has updated
      const timeoutId = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, scrollToBottom]);

  // Intersection observer for auto-scroll detection
  useEffect(() => {
    if (messagesEndRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          // If user has scrolled away from bottom, don't auto-scroll
          if (!entry.isIntersecting) {
            // Could implement "scroll to bottom" button here
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(messagesEndRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    optimizedMessages,
    scrollToBottom,
    messagesEndRef
  };
};
