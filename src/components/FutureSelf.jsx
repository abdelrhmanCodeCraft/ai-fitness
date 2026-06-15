"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Clock,
  Zap,
  ChevronRight
} from "lucide-react";

const futureSelfData = {
  projections: [
    { 
      id: "3m", 
      label: "3 Months", 
      bodyFat: "18%", 
      muscleMass: "+2.5kg", 
      summaryText: "Initial physiological adaptation complete. Metabolic rate increased by 12%. Posture and core stability stabilized.",
      silhouetteScale: 1.02,
      silhouetteGlow: "#10b98133"
    },
    { 
      id: "6m", 
      label: "6 Months", 
      bodyFat: "15%", 
      muscleMass: "+4.8kg", 
      summaryText: "Peak hypertrophy phase. Visible muscular definition in primary groups. Significant increase in VO2 Max and strength benchmarks.",
      silhouetteScale: 1.05,
      silhouetteGlow: "#10b98166"
    },
    { 
      id: "12m", 
      label: "12 Months", 
      bodyFat: "12%", 
      muscleMass: "+7.2kg", 
      summaryText: "Mastery of physical ecosystem. Subcutaneous fat levels minimized. Elite-level metabolic efficiency and systemic resilience.",
      silhouetteScale: 1.08,
      silhouetteGlow: "#10b981aa"
    }
  ],
  milestones: [
    { id: 1, title: "Consistent RPE 8-9 Intensity", progress: 100, status: "Complete" },
    { id: 2, title: "Optimized REM/Deep Sleep Ratios", progress: 75, status: "In Progress" },
    { id: 3, title: "Metabolic Threshold Breakthrough", progress: 40, status: "Targeted" },
    { id: 4, title: "Sustained Peak Power Output", progress: 10, status: "Targeted" }
  ]
};

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/50 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

export default function FutureSelf() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentProjection = futureSelfData.projections[selectedIdx];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <div className="text-center space-y-2 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981] text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 shadow-lg shadow-[#10b981]/20">
          <Sparkles size={10} fill="currentColor" />
          Neural Projection Engine
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2F2E32]">Future Self</h1>
        <p className="text-sm md:text-base text-gray-500">Visualizing your physical evolution through AI-modeled biological trends.</p>
      </div>

      {/* Time Slider */}
      <div className="flex justify-center px-4">
        <div className="bg-white/60 backdrop-blur-sm p-1 md:p-1.5 rounded-2xl border border-white/50 flex gap-1 md:gap-2 relative w-full max-w-sm md:max-w-none overflow-x-auto no-scrollbar">
          {futureSelfData.projections.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex-1 px-4 md:px-8 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all z-10 whitespace-nowrap min-h-[44px] ${
                selectedIdx === idx ? "text-white" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {p.label}
              {selectedIdx === idx && (
                <motion.div 
                  layoutId="slider-bg"
                  className="absolute inset-0 bg-[#2F2E32] rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4">
        {/* Left Stats */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 order-2 lg:order-1">
          <GlassCard className="text-center p-4 md:p-6">
            <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Body Fat</div>
            <motion.div 
              key={`bf-${selectedIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black text-[#2F2E32]"
            >
              {currentProjection.bodyFat}
            </motion.div>
          </GlassCard>
          <GlassCard className="text-center p-4 md:p-6">
            <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Muscle Mass</div>
            <motion.div 
              key={`mm-${selectedIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black text-[#10b981]"
            >
              {currentProjection.muscleMass}
            </motion.div>
          </GlassCard>
        </div>

        {/* Central Silhouette Avatar */}
        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[220px] md:max-w-[300px] aspect-[1/2] flex items-center justify-center">
            {/* Background Glow */}
            <motion.div 
              animate={{ 
                backgroundColor: currentProjection.silhouetteGlow,
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-[50px] md:blur-[80px] -z-10"
            />

            {/* Silhouette SVG */}
            <motion.div
              animate={{ scale: currentProjection.silhouetteScale }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full"
            >
              <svg 
                viewBox="0 0 200 400" 
                className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                {/* Simplified Human Silhouette */}
                <path 
                  d="M100 40 C115 40 125 50 125 65 C125 80 115 90 100 90 C85 90 75 80 75 65 C75 50 85 40 100 40 Z" 
                  fill="#2F2E32" 
                />
                <path 
                  d="M60 100 C80 90 120 90 140 100 C155 110 160 140 160 180 C160 220 150 240 140 240 L130 380 C130 390 120 400 110 400 L90 400 C80 400 70 390 70 380 L60 240 C50 240 40 220 40 180 C40 140 45 110 60 100 Z" 
                  fill="#2F2E32" 
                />
                
                {/* Muscle Highlights - These shift based on selected index */}
                <motion.path 
                  animate={{ opacity: (selectedIdx + 1) * 0.3 }}
                  d="M75 120 Q100 110 125 120 L120 180 Q100 170 80 180 Z" 
                  fill="#10b981" 
                />
                <motion.path 
                  animate={{ opacity: (selectedIdx + 1) * 0.2 }}
                  d="M50 130 Q65 120 75 140 L70 200 Q60 190 55 200 Z" 
                  fill="#10b981" 
                />
                <motion.path 
                  animate={{ opacity: (selectedIdx + 1) * 0.2 }}
                  d="M150 130 Q135 120 125 140 L130 200 Q140 190 145 200 Z" 
                  fill="#10b981" 
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-3 order-3 text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[#10b981]">
                <Target size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Projection Summary</span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed italic">
                &quot;{currentProjection.summaryText}&quot;
              </p>
              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-2">
                {["Elite Readiness", "Metabolic Peak"].map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-1 bg-gray-100 rounded-md text-gray-400 font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Milestone Progress Card */}
      <GlassCard className="max-w-2xl mx-auto p-6 md:p-8 mx-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2F2E32] rounded-xl text-white">
              <Clock size={20} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">Milestones to 6-Month Goal</h2>
          </div>
          <div className="w-fit text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-lg">
            72% Total Progress
          </div>
        </div>

        <div className="space-y-6">
          {futureSelfData.milestones.map((milestone) => (
            <div key={milestone.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {milestone.progress === 100 ? (
                    <CheckCircle2 size={16} className="text-[#10b981]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                  )}
                  <span className={`text-xs md:text-sm font-bold ${milestone.progress === 100 ? "text-[#2F2E32]" : "text-gray-400"}`}>
                    {milestone.title}
                  </span>
                </div>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {milestone.status}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${milestone.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${milestone.progress === 100 ? "bg-[#10b981]" : "bg-[#2F2E32]"}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#10b981] hover:underline uppercase tracking-widest min-h-[44px]">
            View Evolutionary Roadmap
            <ChevronRight size={14} />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
