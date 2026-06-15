"use client";

import React, { useState } from "react";
import CircularNavigation from "@/components/CircularNavigation";
import OnboardingForm from "@/components/OnboardingForm";
import WellnessHub from "@/components/WellnessHub";
import SmartInsights from "@/components/SmartInsights";
import FutureSelf from "@/components/FutureSelf";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Onboarding");

  const renderContent = () => {
    switch (activeTab) {
      case "Onboarding":
        return <OnboardingForm key="onboarding" onComplete={() => setActiveTab("Wellness Hub")} />;
      case "Wellness Hub":
        return <WellnessHub key="wellness" />;
      case "Smart Insights":
        return <SmartInsights key="insights" />;
      case "Future-Self":
        return <FutureSelf key="future" />;
      default:
        return (
          <motion.h1 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-5xl font-bold text-[#2F2E32]"
          >
            Hello, {activeTab}
          </motion.h1>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7F8] flex items-center justify-center relative overflow-hidden">
      {/* Fixed Left Navigation */}
      <CircularNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="w-full flex justify-center py-6 md:py-10 px-4 md:px-20 mb-20 md:mb-0">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
}
