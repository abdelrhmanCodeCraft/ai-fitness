"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  Clock,
  Zap
} from "lucide-react";
import { wellnessData } from "@/data/dummyData";

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/50 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

export default function WellnessHub() {
  const { 
    wellnessScore, 
    aiCoachingEngine, 
    workoutPlan, 
    nutritionalBiofeedback, 
    biometrics,
    metadata 
  } = wellnessData;

  // Transform macros object to array for mapping
  const macrosArray = [
    { 
      name: "Protein", 
      current: nutritionalBiofeedback.macros.protein.grams, 
      target: nutritionalBiofeedback.macros.protein.target, 
      color: "#3B82F6" 
    },
    { 
      name: "Carbs", 
      current: nutritionalBiofeedback.macros.carbs.grams, 
      target: nutritionalBiofeedback.macros.carbs.target, 
      color: "#F59E0B" 
    },
    { 
      name: "Fats", 
      current: nutritionalBiofeedback.macros.fats.grams, 
      target: nutritionalBiofeedback.macros.fats.target, 
      color: "#EF4444" 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl w-full mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2 md:px-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2F2E32]">Wellness Hub</h1>
          <p className="text-gray-500 text-sm mt-1">AI-Powered Health Nexus &bull; {metadata.aiModelVersion}</p>
        </div>
        <div className="flex items-center w-fit gap-2 bg-[#2F2E32] text-white px-4 py-2 rounded-xl text-sm font-medium">
          <Clock size={16} />
          {metadata.lastSync}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 md:px-0">
        
        {/* Hero Widget: Wellness Score */}
        <GlassCard className="flex flex-col justify-between h-full p-6 md:p-8">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#2F2E32] rounded-2xl text-white">
              <Activity size={24} />
            </div>
            <div className="flex items-center gap-1 text-[#10b981] font-bold text-sm">
              <TrendingUp size={16} />
              {wellnessScore.trend === "up" ? "+" : ""}{wellnessScore.current - wellnessScore.previous} pts
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <div className="text-6xl md:text-7xl font-black text-[#2F2E32]">{wellnessScore.current}</div>
            <div className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Wellness Score</div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase text-gray-400">
            <div>
              <div className="text-[#2F2E32] text-xs md:text-sm">{wellnessScore.subMetrics.recovery}%</div>
              Recovery
            </div>
            <div className="border-x border-gray-100">
              <div className="text-[#2F2E32] text-xs md:text-sm">{wellnessScore.subMetrics.readiness}%</div>
              Readiness
            </div>
            <div>
              <div className="text-[#2F2E32] text-xs md:text-sm">{wellnessScore.subMetrics.performance}%</div>
              Power
            </div>
          </div>
          <div className="mt-6 p-3 bg-white/40 rounded-2xl text-center font-bold text-[#2F2E32] text-sm">
            {wellnessScore.status}
          </div>
        </GlassCard>

        {/* AI Recommendation Section */}
        <GlassCard className="lg:col-span-2 bg-gradient-to-br from-white/60 to-white/30 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-xl text-white">
                <Brain size={20} />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">AI Coaching: {aiCoachingEngine.primaryFocus}</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2F2E32] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Zap size={10} fill="currentColor" />
              Priority
            </div>
          </div>
          <p className="text-[#2F2E32] text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">
            &quot;{aiCoachingEngine.priorityAdvice}&quot;
          </p>
          
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action Items</h3>
            {aiCoachingEngine.actionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white/40 rounded-xl border border-white/50">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.priority === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
                <span className="text-xs md:text-sm font-medium text-[#2F2E32]">{item.task}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Workout Section */}
        <GlassCard className="lg:col-span-2 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#10b981] rounded-xl text-white">
                <Dumbbell size={20} />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">{workoutPlan.title}</h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:text-xs text-gray-500 font-medium">
                  <span>Focus: {workoutPlan.focus}</span>
                  <span>Duration: {workoutPlan.metrics.duration}</span>
                  <span>Est. Burn: {workoutPlan.metrics.burn} kcal</span>
                </div>
              </div>
            </div>
            <div className="w-fit text-xs font-bold text-[#10b981] px-3 py-1 bg-[#10b981]/10 rounded-lg">
              RPE {workoutPlan.metrics.rpe}
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-2 md:mx-0">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 font-semibold">Exercise</th>
                  <th className="pb-3 font-semibold text-center">Sets</th>
                  <th className="pb-3 font-semibold text-center">Reps</th>
                  <th className="pb-3 font-semibold text-right">Load</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                {workoutPlan.exercises.map((ex, i) => (
                  <tr key={i} className="group border-b border-gray-50 last:border-0">
                    <td className="py-4">
                      <div className="font-bold text-[#2F2E32]">{ex.name}</div>
                      <div className="text-[9px] md:text-[10px] text-gray-400 font-medium">{ex.notes}</div>
                    </td>
                    <td className="py-4 text-center text-gray-500">{ex.sets}</td>
                    <td className="py-4 text-center text-gray-500">{ex.reps}</td>
                    <td className="py-4 text-right font-mono font-medium text-[#10b981]">{ex.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Nutrition & Biometrics Section */}
        <div className="space-y-6">
          {/* Nutrition */}
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-400 rounded-xl text-white">
                <Utensils size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#2F2E32]">Nutrition</h2>
            </div>

            <div className="space-y-6">
              {macrosArray.map((macro, i) => {
                const percentage = Math.min((macro.current / macro.target) * 100, 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>{macro.name}</span>
                      <span className="text-[#2F2E32]">{macro.current}g / {macro.target}g</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: macro.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex gap-4">
              <div className="flex-1 p-3 bg-white/40 rounded-xl border border-white/50">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Hydration</div>
                <div className="text-sm font-bold text-[#2F2E32]">{nutritionalBiofeedback.hydration.current}{nutritionalBiofeedback.hydration.unit} / {nutritionalBiofeedback.hydration.target}{nutritionalBiofeedback.hydration.unit}</div>
              </div>
              <div className="flex-1 p-3 bg-white/40 rounded-xl border border-white/50">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Glycemic</div>
                <div className="text-sm font-bold text-[#2F2E32]">{nutritionalBiofeedback.glycemicLoad}</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#2F2E32] rounded-2xl text-white">
              <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Daily Calories</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black">{nutritionalBiofeedback.calories.consumed}</span>
                <span className="text-xs text-gray-400">/ {nutritionalBiofeedback.calories.total} kcal</span>
              </div>
            </div>
          </GlassCard>

          {/* Biometrics */}
          <GlassCard className="bg-[#2F2E32] text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-xl">
                <Zap size={20} className="text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold">Biometrics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-gray-400">Sleep Quality</span>
                <span className="font-bold">{biometrics.sleep.quality} ({biometrics.sleep.duration})</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-gray-400">Resting HR</span>
                <span className="font-bold">{biometrics.restingHeartRate} BPM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-400">Blood Oxygen</span>
                <span className="font-bold text-[#10b981]">{biometrics.bloodOxygen}%</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </motion.div>
  );
}

