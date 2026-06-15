"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Zap,
  Info,
  CheckCircle2,
  Brain
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const smartInsightsData = {
  predictionGraphData: [
    { date: "Jun 14", score: 72 },
    { date: "Jun 16", score: 74 },
    { date: "Jun 18", score: 73 },
    { date: "Jun 20", score: 78 },
    { date: "Jun 22", score: 82 },
    { date: "Jun 24", score: 81 },
    { date: "Jun 26", score: 85 },
    { date: "Jun 28", score: 88 },
    { date: "Jun 30", score: 87 },
    { date: "Jul 02", score: 91 },
    { date: "Jul 04", score: 94 },
    { date: "Jul 06", score: 95 },
    { date: "Jul 08", score: 93 },
    { date: "Jul 10", score: 96 },
    { date: "Jul 12", score: 98 },
  ],
  alerts: [
    { 
      id: 1,
      title: "Potential Overtraining Risk", 
      type: "risk", 
      description: "Neural fatigue markers are elevated. Consider reducing volume by 15% tomorrow." 
    },
    { 
      id: 2,
      title: "Recovery Optimization Opportunity", 
      type: "opportunity", 
      description: "Projected high-quality sleep window tonight. Ideal for systemic recovery." 
    },
    { 
      id: 3,
      title: "VO2 Max Breakthrough", 
      type: "opportunity", 
      description: "Performance trend indicates a new threshold peak within 7 days." 
    }
  ],
  factorImpact: [
    { name: "Sleep", impact: 88, color: "#8B5CF6" },
    { name: "Nutrition", impact: 74, color: "#10B981" },
    { name: "Training", impact: 92, color: "#3B82F6" }
  ]
};

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/50 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2F2E32] text-white p-3 rounded-xl border border-white/10 shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <p className="text-lg font-black text-[#10b981]">{payload[0].value}<span className="text-[10px] text-gray-400 ml-1">SCORE</span></p>
      </div>
    );
  }
  return null;
};

export default function SmartInsights() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl w-full mx-auto space-y-6 pb-12"
    >
      {/* Header with AI Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2 md:px-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2F2E32] text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <Brain size={10} fill="currentColor" />
            AI Intelligence Active
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2F2E32]">Smart Insights</h1>
          <p className="text-gray-500 text-sm mt-1">Predictive Performance & Biological Impact Analysis</p>
        </div>
      </div>

      {/* Projection Chart */}
      <GlassCard className="h-[300px] md:h-[400px] flex flex-col p-4 md:p-6 mx-2 md:mx-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#3B82F6] rounded-xl text-white">
              <TrendingUp size={20} className="w-[18px] h-[18px] md:w-5 md:h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">Performance Projection</h2>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">Next 30 Days Forecast</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl md:text-2xl font-black text-[#10b981]">Peak 98</div>
            <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Estimated Peak</div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={smartInsightsData.predictionGraphData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 9, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                hide 
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 md:px-0">
        {/* Predictive Alerts */}
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#2F2E32] rounded-xl text-white">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">Predictive Alerts</h2>
          </div>

          <div className="space-y-4">
            {smartInsightsData.alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-[1.5rem] border ${
                  alert.type === 'risk' 
                    ? 'bg-yellow-50/50 border-yellow-100 text-yellow-800' 
                    : 'bg-[#10b981]/5 border-[#10b981]/10 text-[#0da673]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {alert.type === 'risk' ? <Info size={18} /> : <CheckCircle2 size={18} />}
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-tight">{alert.title}</h3>
                    <p className="text-xs md:text-sm opacity-80 mt-1 leading-relaxed">{alert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Factor Impact */}
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#2F2E32] rounded-xl text-white">
              <Zap size={20} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#2F2E32]">Factor Impact</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 h-full content-center pb-8">
            {smartInsightsData.factorImpact.map((factor, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* SVG Radial Progress */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="38%"
                      className="stroke-gray-100 fill-none"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="38%"
                      initial={{ strokeDasharray: "0 251.2" }}
                      animate={{ strokeDasharray: `${(factor.impact / 100) * 251.2} 251.2` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="fill-none"
                      stroke={factor.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg md:text-2xl font-black text-[#2F2E32]">{factor.impact}%</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{factor.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-white/40 rounded-2xl border border-white/50 text-[10px] md:text-xs text-gray-500 leading-relaxed italic text-center">
            &quot;These factors represent the AI-modeled influence of each habit on your current performance trajectory.&quot;
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
