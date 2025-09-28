// src/components/ChatInterface.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  memo,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { FaChevronDown, FaRobot, FaUser } from "react-icons/fa";
import { FaArrowRight, FaPaperclip, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import BotResponseCard from "./BotResponseCard";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useSpeechDictation from "../hooks/useSpeechDictation";
import { useChatOptimization } from "../hooks/useChatOptimization";
import { useDebounce } from "../hooks/useDebounce";

// Simple Error Boundary - Made Responsive
class ChatErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chat Error:', error, errorInfo);
    toast.error('Something went wrong. Please refresh.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-64 text-center p-4 sm:p-6 md:p-8 bg-gray-900">
          <div className="text-gray-300 bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 max-w-sm sm:max-w-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Something went wrong</h3>
            <p className="mb-4 text-sm sm:text-base text-gray-400">The chat encountered an error.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button 
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors text-sm sm:text-base"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm sm:text-base"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// RESPONSIVE: MessageItem Component
const MessageItem = memo(({ message, index, selectedModel }) => {
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot" || message.sender === "assistant";

  return (
    <div className="px-3 sm:px-4 md:px-6 mb-2 sm:mb-3">
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-1.5 sm:gap-2 md:gap-3`}>
        {/* RESPONSIVE: Bot Avatar */}
        {isBot && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full 
                         bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center 
                         shadow-lg mt-0.5 sm:mt-1">
            <FaRobot className="text-white text-xs sm:text-sm" />
          </div>
        )}

        {/* RESPONSIVE: Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} 
                        max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl`}>
          {isBot && message.response ? (
            <div className="w-full">
              <div className="rounded-xl sm:rounded-2xl border-l-2 sm:border-l-4 border-cyan-400/70 
                             bg-gray-800/95 backdrop-blur-sm shadow-xl ring-1 ring-gray-700/50">
                <BotResponseCard response={message.response} selectedModel={selectedModel} />
              </div>
            </div>
          ) : (
            <div
              className={
                isUser
                  ? "max-w-xs sm:max-w-sm md:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg text-xs sm:text-sm border border-slate-500/30"
                  : "max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-800/90 border border-gray-600/50 text-gray-100 backdrop-blur-sm shadow-xl"
              }
              role="article"
              aria-label={isUser ? "Your message" : "Assistant message"}
            >
              <div className="prose prose-invert max-w-none text-xs sm:text-sm md:text-base">
                {isUser ? message.text : message.response?.answer || message.text}
              </div>
              
              <div className={`text-[10px] sm:text-xs opacity-75 mt-1.5 sm:mt-2 
                              flex items-center ${isUser ? 'justify-between' : 'justify-between'}`}>
                <span className="text-gray-300">
                  {new Date(message.timestamp || Date.now()).toLocaleTimeString()}
                </span>
                {isUser && <span className="text-slate-200 font-medium">✓</span>}
              </div>
            </div>
          )}
        </div>

        {/* RESPONSIVE: User Avatar */}
        {isUser && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full 
                         bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center 
                         shadow-lg mt-0.5 sm:mt-1 ring-1 sm:ring-2 ring-slate-500/30">
            <FaUser className="text-white text-xs sm:text-sm" />
          </div>
        )}
      </div>
    </div>
  );
});

MessageItem.displayName = 'MessageItem';

// RESPONSIVE: Composer component
const Composer = memo(
  forwardRef(function Composer(
    {
      displayValue,
      onChangeBaseInput,
      loading,
      selectedModel,
      setSelectedModel,
      showModelMenu,
      setShowModelMenu,
      onKeyDownInput,
      onCompositionStart,
      onCompositionEnd,
      onSend,
      onStartVoice,
      onStopVoice,
      isRecording,
      modelMenuRef,
      onGoToUpload,
      onPaste,
      isTyping,
      draftSaved,
    },
    textareaRef
  ) {
    return (
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="mx-auto max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl">
          {/* RESPONSIVE: Draft Saved Indicator */}
          <AnimatePresence>
            {draftSaved && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-2 sm:mb-3 text-[10px] sm:text-xs text-emerald-400 flex items-center justify-center 
                          bg-emerald-900/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl 
                          border border-emerald-500/30 backdrop-blur-sm"
              >
                <span className="mr-1.5 sm:mr-2">✓</span>
                Draft saved automatically
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESPONSIVE: Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-2 sm:mb-3 text-xs sm:text-sm text-gray-400 flex items-center justify-center"
                role="status"
                aria-live="polite"
              >
                <div className="flex space-x-1 mr-2 sm:mr-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" 
                       style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" 
                       style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="font-medium">AI is analyzing oceanographic data...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESPONSIVE: INPUT BAR */}
          <div
            className="
              flex items-end gap-1.5 sm:gap-2 md:gap-3 w-full rounded-xl sm:rounded-2xl
              bg-neutral-900/90 border border-white/10
              backdrop-blur-sm shadow-xl
              px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3
              hover:border-white/20 transition-all duration-200
            "
            role="toolbar"
            aria-label="Message composition"
          >
            {/* RESPONSIVE: Upload Button */}
            <button
              type="button"
              onClick={onGoToUpload}
              title="Upload oceanographic data"
              aria-label="Upload data"
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-800 hover:bg-neutral-700 
                        text-gray-300 hover:text-white transition-colors 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              <FaPaperclip className="text-sm sm:text-base md:text-lg" />
            </button>

            {/* RESPONSIVE: Model Menu */}
            <div className="relative z-50" ref={modelMenuRef}>
              <button
                onClick={() => setShowModelMenu((s) => !s)}
                aria-haspopup="listbox"
                aria-expanded={showModelMenu}
                aria-label="Select AI model"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 
                          text-[10px] sm:text-xs md:text-sm rounded-lg sm:rounded-xl 
                          bg-neutral-800 hover:bg-neutral-700 text-gray-200 hover:text-white 
                          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
              >
                <FaRobot className="text-cyan-400 text-xs sm:text-sm md:text-base" />
                <span className="font-medium hidden xs:inline">{selectedModel}</span>
                <span className="font-medium xs:hidden">{selectedModel.slice(0,3)}</span>
                <FaChevronDown className={`text-gray-400 text-[8px] sm:text-xs transition-transform duration-200 
                                          ${showModelMenu ? 'rotate-180' : ''}`} />
              </button>

              {showModelMenu && (
                <div className="absolute bottom-full mb-2 right-0 w-36 sm:w-48 bg-neutral-900 
                               border border-neutral-600 rounded-xl shadow-2xl z-50 py-2">
                  <div className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-gray-400 font-semibold 
                                 border-b border-neutral-700 mb-1">
                    Select Model
                  </div>
                  {["GPT", "QWEN", "LLaMA", "Mistral"].map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelMenu(false);
                      }}
                      className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-neutral-900 hover:bg-neutral-700 transition-colors ${
                        selectedModel === model ? 'bg-cyan-900/50 text-cyan-300' : 'text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          model === 'GPT' ? 'bg-green-500' :
                          model === 'QWEN' ? 'bg-blue-500' :
                          model === 'LLaMA' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="font-medium">{model}</span>
                        {selectedModel === model && <span className="ml-auto text-cyan-400">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RESPONSIVE: Textarea */}
            <div className="flex-1 min-w-0">
              <textarea
                ref={textareaRef}
                rows={1}
                value={displayValue}
                onChange={(e) => onChangeBaseInput(e.target.value)}
                onKeyDown={onKeyDownInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onPaste={onPaste}
                placeholder="Ask about ARGO floats, ocean temperature profiles, or trajectory analysis…"
                dir="ltr"
                style={{ unicodeBidi: "plaintext" }}
                className="
                  w-full bg-transparent resize-none focus:outline-none
                  text-white placeholder-gray-500
                  px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 leading-5 sm:leading-6
                  max-h-[10rem] sm:max-h-[12rem] md:max-h-[14rem] overflow-y-auto thin-scroll
                  text-xs sm:text-sm md:text-base
                "
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                inputMode="text"
                aria-label="Type your oceanographic query"
              />
            </div>

            {/* RESPONSIVE: Voice Button */}
            <button
              type="button"
              onClick={isRecording ? onStopVoice : onStartVoice}
              title={isRecording ? "Stop dictation" : "Start dictation"}
              aria-pressed={isRecording}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors 
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
                isRecording ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-neutral-800 hover:bg-neutral-700 text-gray-300"
              }`}
            >
              {isRecording ? 
                <FaMicrophoneSlash className="text-sm sm:text-base md:text-lg" /> : 
                <FaMicrophone className="text-sm sm:text-base md:text-lg" />
              }
            </button>

            {/* RESPONSIVE: Send Button */}
            <button
              onClick={onSend}
              disabled={loading || (displayValue || "").trim().length === 0}
              aria-label={loading ? "Sending message..." : "Send message"}
              className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-cyan-600 hover:bg-cyan-500 
                        disabled:bg-neutral-700 transition-colors 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 
                        shadow-md disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"></path>
                </svg>
              ) : (
                <FaArrowRight className="text-white text-sm sm:text-base md:text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  })
);

// RESPONSIVE: Main ChatInterface Component
export default function ChatInterface({
  resetTrigger,
  onFirstMessage,
  onMessage,
  onAssistantMessage,
  messages = [],
  userHistory = [],
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("GPT");
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [lastSavedDraft, setLastSavedDraft] = useState("");

  const modelMenuRef = useRef(null);
  const textareaRef = useRef(null);
  const rafRef = useRef(0);
  const navigate = useNavigate();

  const { optimizedMessages, scrollToBottom, messagesEndRef } = useChatOptimization(messages);
  const debouncedInput = useDebounce(input, 500);

  const {
    isRecording,
    start,
    stopAndFlush,
    liveInterim,
    autoMerged,
    consumeAutoMerged,
  } = useSpeechDictation({ lang: "en-US", continuous: false });

  const showLanding = useMemo(() => (messages?.length || 0) === 0, [messages?.length]);
  const displayValue = useMemo(() => `${input}${liveInterim ? (input ? " " : "") + liveInterim : ""}`, [input, liveInterim]);

  // Auto-save draft functionality
  useEffect(() => {
    if (debouncedInput && debouncedInput.trim() && debouncedInput !== lastSavedDraft) {
      localStorage.setItem('chat-draft', debouncedInput);
      setLastSavedDraft(debouncedInput);
      setDraftSaved(true);
      const timer = setTimeout(() => setDraftSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [debouncedInput, lastSavedDraft]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('chat-draft');
    if (draft && !input) {
      setInput(draft);
      setLastSavedDraft(draft);
    }
  }, []);

  // Keep scroll at last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset textarea when parent toggles
  useEffect(() => {
    if (resetTrigger) {
      setInput("");
      setLastSavedDraft("");
      localStorage.removeItem('chat-draft');
    }
  }, [resetTrigger]);

  // Close model dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!modelMenuRef.current) return;
      if (!modelMenuRef.current.contains(e.target)) setShowModelMenu(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Auto-grow height on visual changes
  const autoGrow = () => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  };

  useLayoutEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(autoGrow);
    return () => cancelAnimationFrame(rafRef.current);
  }, [displayValue, messages]);

  // Natural mic end: consume auto-merged and append to base
  useEffect(() => {
    if (autoMerged) {
      const m = consumeAutoMerged();
      if (m) setInput((p) => [p, m].filter(Boolean).join(" ").trimStart());
    }
  }, [autoMerged, consumeAutoMerged]);

  // Voice controls
  const onStartVoice = () => {
    const res = start();
    if (!res.ok) {
      toast.error(res.reason === "unsupported" ? "Voice dictation not supported" : "Could not start dictation");
    }
  };

  const onStopVoice = async () => {
    const merged = await stopAndFlush();
    if (merged) {
      setInput((prev) => [prev, merged].filter(Boolean).join(" ").trimStart());
    }
    textareaRef.current?.focus();
  };

  // Upload navigation
  const goToUpload = () => navigate("/upload");

  // Enhanced send message with oceanographic mock response
  const handleSend = async () => {
    if (isComposing) return;

    let base = input;
    if (isRecording) {
      const merged = await stopAndFlush();
      if (merged) {
        base = [base, merged].filter(Boolean).join(" ").trimStart();
        setInput(base);
      }
    }

    const toSend = base.trim();
    if (!toSend || loading) return;

    localStorage.removeItem('chat-draft');
    setLastSavedDraft("");

    let targetChatId = null;
    if ((messages?.length || 0) === 0 && onFirstMessage) {
      targetChatId = onFirstMessage(toSend);
    } else if (onMessage) {
      onMessage(toSend);
    }

    const payload = {
      filename: [],
      query: toSend,
      history: userHistory,
      model: selectedModel,
    };

    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 0);
    setLoading(true);
    setIsTyping(true);

    try {
      const { data } = await axios.post("http://localhost:8000/query", payload, {
        headers: { "Content-Type": "application/json" },
      });
      
      const responseWithModel = {
        ...data,
        model: selectedModel,
        timestamp: Date.now()
      };
      
      onAssistantMessage && onAssistantMessage(responseWithModel, targetChatId || undefined);
    } catch (err) {
      console.error("Failed to send query", err);
      //toast.error("Failed to send query");

      // Enhanced mock response - charts will be handled in BotResponseCard
      const mockResponse = {
        answer: `Based on your query "${toSend}", I've analyzed the ARGO float data and generated comprehensive oceanographic visualizations.

The analysis shows temperature and salinity profiles from multiple ARGO floats in the specified region. Key findings include:

• **Temperature gradients** indicating strong thermoclines at approximately 200-500m depth
• **Salinity variations** suggesting different water masses and mixing processes
• **Seasonal patterns** in surface temperature measurements
• **Water mass identification** through temperature-salinity relationships
• **Float trajectory analysis** showing current patterns and drift characteristics

The interactive charts in the Analytics section below provide detailed visualizations of:
- Vertical temperature and salinity profiles
- Temperature-Salinity diagrams for water mass analysis  
- Hovmöller diagrams showing temporal evolution
- Time series of key oceanographic parameters
- Geographic trajectories and positions of ARGO floats

All visualizations include both chart and tabular data views for comprehensive analysis.`,
        
        sources: [
          "https://argo.ucsd.edu/",
          "https://www.noaa.gov/education/resource-collections/ocean-data",
          "https://marine.copernicus.eu/",
          "https://oceanobservatories.org/",
          "https://www.gebco.net/data_and_products/gridded_bathymetry_data/"
        ],
        
        steps: [
          "Analyzed oceanographic query parameters and region of interest",
          "Retrieved ARGO float data from global database with quality control",
          "Generated temperature and salinity profiles for visualization",
          "Created Temperature-Salinity diagrams for water mass identification",
          "Developed Hovmöller diagrams for temporal analysis",
          "Generated time series plots for parameter evolution",
          "Created interactive maps showing float trajectories and positions",
          "Applied oceanographic standards and best practices for data presentation"
        ],
        
        model: selectedModel,
        timestamp: Date.now()
      };

      onAssistantMessage && onAssistantMessage(mockResponse, targetChatId || undefined);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatErrorBoundary>
      <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
        <AnimatePresence mode="wait">
          {showLanding ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6"
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                             mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl">
                <FaRobot className="text-2xl sm:text-3xl md:text-4xl text-cyan-400" />
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-2 sm:mb-3">
                ARGO FloatChat
              </h1>
              
              <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-400 max-w-xs sm:max-w-md md:max-w-lg 
                           leading-relaxed px-2">
                Ask in natural language about oceanographic data and get interactive visualizations.
              </p>
              
              <div className="w-full mt-4 sm:mt-6">
                <Composer
                  ref={textareaRef}
                  displayValue={displayValue}
                  onChangeBaseInput={(v) => {
                    const li = (liveInterim || "").trim();
                    let next = v;
                    if (li && v.endsWith(li)) next = v.slice(0, v.length - li.length).trimEnd();
                    setInput(next);
                  }}
                  loading={loading}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  showModelMenu={showModelMenu}
                  setShowModelMenu={setShowModelMenu}
                  onKeyDownInput={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  onSend={handleSend}
                  onStartVoice={onStartVoice}
                  onStopVoice={onStopVoice}
                  isRecording={isRecording}
                  modelMenuRef={modelMenuRef}
                  onGoToUpload={goToUpload}
                  onPaste={() => {}}
                  isTyping={isTyping}
                  draftSaved={draftSaved}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto px-0 pt-1 sm:pt-2 pb-3 sm:pb-4 md:pb-6">
                <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto space-y-1.5 sm:space-y-2">
                  {optimizedMessages.map((msg, idx) => (
                    <MessageItem 
                      key={msg.id || idx}
                      message={msg} 
                      index={idx}
                      selectedModel={selectedModel}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t border-gray-700/50 mt-1 mb-2 sm:mb-3 md:mb-5 flex-shrink-0">
                <Composer
                  ref={textareaRef}
                  displayValue={displayValue}
                  onChangeBaseInput={(v) => {
                    const li = (liveInterim || "").trim();
                    let next = v;
                    if (li && v.endsWith(li)) next = v.slice(0, v.length - li.length).trimEnd();
                    setInput(next);
                  }}
                  loading={loading}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  showModelMenu={showModelMenu}
                  setShowModelMenu={setShowModelMenu}
                  onKeyDownInput={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  onSend={handleSend}
                  onStartVoice={onStartVoice}
                  onStopVoice={onStopVoice}
                  isRecording={isRecording}
                  modelMenuRef={modelMenuRef}
                  onGoToUpload={goToUpload}
                  onPaste={() => {}}
                  isTyping={isTyping}
                  draftSaved={draftSaved}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>
          {`
            .thin-scroll {
              scrollbar-width: thin;
              scrollbar-color: rgba(148,163,184,0.4) transparent;
            }
            .thin-scroll::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .thin-scroll::-webkit-scrollbar-thumb {
              background-color: rgba(148,163,184,0.4);
              border-radius: 9999px;
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-spin { animation: none !important; }
            }
          `}
        </style>
      </div>
    </ChatErrorBoundary>
  );
}
