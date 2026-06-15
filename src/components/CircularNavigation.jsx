"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardList, 
  LayoutDashboard, 
  Brain, 
  Sparkles 
} from "lucide-react";

const TABS = [
  { id: "Onboarding", icon: ClipboardList, label: "Onboarding" },
  { id: "Wellness Hub", icon: LayoutDashboard, label: "Wellness Hub" },
  { id: "Smart Insights", icon: Brain, label: "Smart Insights" },
  { id: "Future-Self", icon: Sparkles, label: "Future-Self" },
];

export default function CircularNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="fixed md:left-6 md:top-0 md:h-screen bottom-0 left-0 w-full md:w-auto md:h-auto flex md:flex-col flex-row justify-around md:justify-center items-center gap-6 z-50 bg-white/80 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none border-t md:border-t-0 border-gray-100 p-4 md:p-0">
      {TABS.map((tab) => (
        <NavigationIcon 
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
          aria-label={`Go to ${tab.label}`}
        />
      ))}
    </div>
  );
}

function NavigationIcon({ tab, isActive, onClick, "aria-label": ariaLabel }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button 
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className="relative flex items-center justify-center min-w-[44px] min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-[#2F2E32] rounded-full transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Circular Icon */}
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer text-white shadow-lg transition-colors ${
          isActive ? "bg-[#2F2E32]" : "bg-[#2F2E32]/90 hover:bg-[#2F2E32]"
        }`}
      >
        <tab.icon size={isActive ? 22 : 20} className="md:size-5" aria-hidden="true" />
      </motion.div>

      {/* Slide-out Label - Hidden on mobile */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 10 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden md:block absolute left-12 ml-2 px-4 py-2 bg-[#2F2E32] text-white rounded-lg whitespace-nowrap pointer-events-none shadow-xl border border-white/10"
          >
            <span className="text-sm font-medium">{tab.label}</span>
            <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2F2E32] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
