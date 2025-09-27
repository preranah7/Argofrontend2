// src/components/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlinePlus,
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiSun,
  HiMoon,
  HiOutlineMenuAlt2,
  HiX,
  HiOutlineUpload,
  HiOutlineChat, // NEW: Message icon
  HiOutlineTrash, // NEW: Delete icon
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";


export default function Sidebar({
  logoText = "🌊",
  brandName = "ARGO FloatChat",
  chats = [],
  onNewChat,
  onOpenChat,
  onDeleteChat, // NEW: Add delete handler prop
  onToggleTheme,
  profileName = "User",
}) {
  const location = useLocation();
  const userRef = useRef(null);

  const railRef = useRef(null);
  const drawerRef = useRef(null);
  const hoverTimer = useRef(null);

  const [isDark, setIsDark] = useState(true);
  const [userOpen, setUserOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [forceDrawer, setForceDrawer] = useState(false); // mobile toggle

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  // Close drawer on outside click (rail + drawer)
  useEffect(() => {
    const onDocDown = (e) => {
      if (!drawerOpen) return;
      const rail = railRef.current;
      const drawer = drawerRef.current;
      if (rail && rail.contains(e.target)) return;
      if (drawer && drawer.contains(e.target)) return;
      setDrawerOpen(false);
      setForceDrawer(false);
    };
    document.addEventListener("pointerdown", onDocDown);
    return () => document.removeEventListener("pointerdown", onDocDown);
  }, [drawerOpen]);

  const openDrawer = () => {
    clearTimeout(hoverTimer.current);
    setDrawerOpen(true);
  };

  const scheduleCloseDrawer = () => {
    if (forceDrawer) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setDrawerOpen(false), 120);
  };

  const cancelCloseDrawer = () => {
    clearTimeout(hoverTimer.current);
  };

  const handleThemeToggle = () => {
    setIsDark((v) => {
      onToggleTheme?.(!v);
      return !v;
    });
  };

  const ICON_COLOR = "text-cyan-400";

  // Accessible key handler for icon-only controls
  const onIconKey = (e, cb) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cb?.();
    }
  };

  return (
    <div className="relative h-screen flex">
      {/* Rail */}
      <aside
        ref={railRef}
        className="h-screen w-16 bg-neutral-950 text-white flex flex-col items-center py-3 select-none ring-1 ring-white/10"
        aria-label="Primary sidebar"
        onMouseEnter={openDrawer}
        onMouseLeave={scheduleCloseDrawer}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 ring-1 ring-white/10 grid place-items-center text-base font-semibold">
            {logoText}
          </div>
        </div>

        {/* New Chat (icon-only) */}
        <span
          onClick={onNewChat}
          onKeyDown={(e) => onIconKey(e, onNewChat)}
          role="button"
          tabIndex={0}
          className="mb-4 mt-1 w-10 h-10 grid place-items-center cursor-pointer text-cyan-400 hover:text-white transition-colors leading-none
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 rounded-md
                     [&>svg]:block [&>svg]:w-5 [&>svg]:h-5 [&>svg]:shrink-0"
          aria-label="Start new chat"
          title="New Chat"
        >
          <HiOutlinePlus />
        </span>

        {/* Nav + History control */}
        <nav className="flex-1 flex flex-col items-center gap-2" aria-label="Main navigation">
          <SidebarIcon
            to="/chat"
            active={location.pathname === "/chat"}
            icon={<HiOutlineHome className={`w-5 h-5 ${ICON_COLOR}`} />}
            label="Home"
          />
          <SidebarIcon
            to="/floats"
            active={location.pathname === "/floats"}
            icon={<HiOutlineGlobeAlt className={`w-5 h-5 ${ICON_COLOR}`} />}
            label="Discover"
          />
          {/* Data Pipeline / Upload */}
          <SidebarIcon
            to="/upload"
            active={location.pathname === "/upload"}
            icon={<HiOutlineUpload className={`w-5 h-5 ${ICON_COLOR}`} />}
            label="Upload"
          />

          {/* Mobile: open/close history drawer */}
          <button
            onClick={() => {
              setForceDrawer((v) => {
                const next = !v;
                setDrawerOpen(next);
                return next;
              });
            }}
            className="mt-2 sm:hidden w-10 h-10 grid place-items-center rounded-lg bg-neutral-900
                       ring-1 ring-white/10 hover:bg-neutral-800 transition-colors leading-none
                       [&>svg]:block [&>svg]:w-5 [&>svg]:h-5 [&>svg]:shrink-0"
            aria-label="Toggle chat history"
            title="Chat history"
          >
            <HiOutlineMenuAlt2 className="text-gray-300" />
          </button>
        </nav>

        {/* Bottom controls */}
        <div className="flex flex-col items-center gap-2 mb-2">
          {/* Theme Toggle (icon-only) */}
          <span
            onClick={handleThemeToggle}
            onKeyDown={(e) => onIconKey(e, handleThemeToggle)}
            role="button"
            tabIndex={0}
            className="w-10 h-10 grid place-items-center cursor-pointer text-slate-200 hover:text-white transition-colors leading-none
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 rounded-md
                       [&>svg]:block [&>svg]:w-5 [&>svg]:h-5 [&>svg]:shrink-0"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark ? <HiMoon /> : <HiSun className="text-yellow-400" />}
          </span>

          <UserMenu
            profileName={profileName}
            userOpen={userOpen}
            setUserOpen={setUserOpen}
            userRef={userRef}
          />
        </div>
      </aside>

      {/* Drawer Backdrop (mobile) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.button
            aria-label="Close chat drawer"
            onClick={() => {
              setDrawerOpen(false);
              setForceDrawer(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <ChatDrawer
            innerRef={drawerRef}
            brandName={brandName}
            chats={chats}
            onHoverEnter={() => {
              openDrawer();
              cancelCloseDrawer();
            }}
            onHoverLeave={scheduleCloseDrawer}
            setDrawerOpen={() => {
              setDrawerOpen(false);
              setForceDrawer(false);
            }}
            onOpenChat={(id) => {
              onOpenChat?.(id);
              setDrawerOpen(false);
              setForceDrawer(false);
            }}
            onDeleteChat={onDeleteChat} // NEW: Pass delete handler
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const SidebarIcon = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg
                transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-cyan-400/40 ${
                  active
                    ? "text-white bg-neutral-900 ring-1 ring-white/10"
                    : "text-gray-400 hover:text-white hover:bg-neutral-900 ring-1 ring-transparent hover:ring-white/10"
                }`}
    title={label}
    aria-current={active ? "page" : undefined}
  >
    <span className="[&>svg]:block [&>svg]:w-5 [&>svg]:h-5 [&>svg]:shrink-0">{icon}</span>
    <span className="text-[11px] font-medium">{label}</span>
  </Link>
);

const UserMenu = ({ profileName, userOpen, setUserOpen, userRef }) => (
  <div className="relative" ref={userRef}>
    <button
      onClick={() => setUserOpen((s) => !s)}
      className="w-10 h-10 rounded-lg grid place-items-center bg-neutral-900
                 ring-1 ring-white/10 hover:bg-neutral-800 transition-colors
                 text-sm font-medium"
      aria-haspopup="menu"
      aria-expanded={userOpen}
      aria-label="Account menu"
      title="Account"
    >
      {profileName?.[0] || "U"}
    </button>

    <AnimatePresence>
      {userOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 rounded-xl z-50
                     shadow-2xl bg-neutral-950 ring-1 ring-white/10 overflow-hidden"
          role="menu"
        >
          <MenuItem label="Profile" onClick={() => setUserOpen(false)} />
          <MenuItem label="Settings" onClick={() => setUserOpen(false)} />
          <MenuItem label="Incognito Mode" onClick={() => setUserOpen(false)} />
          <div className="h-px bg-white/10 my-1" />
          <MenuItem label="Sign out" onClick={() => setUserOpen(false)} danger />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// src/components/Sidebar.jsx - Updated ChatDrawer component only

// src/components/Sidebar.jsx - Updated ChatDrawer component

const ChatDrawer = ({
  innerRef,
  brandName,
  chats,
  setDrawerOpen,
  onOpenChat,
  onDeleteChat,
  onHoverEnter,
  onHoverLeave,
}) => (
  <motion.aside
    ref={innerRef}
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -8 }}
    transition={{ duration: 0.18, ease: "easeOut" }}
    className="fixed top-0 left-16 h-full w-[300px] bg-neutral-950/95 backdrop-blur
               supports-[backdrop-filter]:bg-neutral-950/80 ring-1 ring-white/10 z-30
               shadow-xl flex flex-col"
    aria-label="Chat history"
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {/* Drawer header (mobile close) */}
    <div className="flex items-center justify-between px-4 h-12 border-b border-white/10 sm:hidden flex-shrink-0">
      <div className="text-white font-semibold text-sm">{brandName}</div>
      <button onClick={setDrawerOpen} aria-label="Close chat drawer" className="p-2 rounded-lg hover:bg-white/5">
        <HiX className="w-5 h-5 text-gray-300" />
      </button>
    </div>

    {/* Main content container */}
    <div className="flex flex-col flex-1 min-h-0">
      {/* Brand name header */}
      <div className="px-4 py-4 flex-shrink-0">
        <div className="mb-3 hidden sm:block">
          <div className="text-white font-semibold text-base">{brandName}</div>
        </div>
        <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">
          History
        </div>
      </div>

      {/* Scrollable chat list - THIS IS THE KEY PART */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 thin-scroll" style={{ minHeight: '0' }}>
        {chats?.length ? (
          chats.map((c) => (
            <div key={c.id} className="relative group mb-2">
              {/* Main chat button */}
              <button
                onClick={() => onOpenChat?.(c.id)}
                className="w-full text-left pl-10 pr-10 py-2.5 rounded-lg text-sm bg-neutral-900
                           ring-1 ring-white/10 hover:bg-neutral-850 hover:ring-white/20
                           transition-colors duration-150 truncate text-gray-200 hover:text-white"
                title={c.title}
              >
                {c.title}
              </button>
              
              {/* Message Icon */}
              <HiOutlineChat className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
              
              {/* Delete Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat?.(c.id);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           p-1 rounded-md hover:bg-red-500/20 transition-colors duration-150"
                title="Delete chat"
                aria-label={`Delete chat: ${c.title}`}
              >
                <HiOutlineTrash className="w-4 h-4 text-red-400 hover:text-red-300" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm px-3 py-2">No recent chats</div>
        )}
      </div>
    </div>
  </motion.aside>
);



const MenuItem = ({ label, onClick, danger = false }) => (
  <button
    onClick={onClick}
    role="menuitem"
    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
      danger ? "text-rose-400 hover:text-rose-300" : "text-gray-300 hover:text-white"
    }`}
  >
    {label}
  </button>
);


