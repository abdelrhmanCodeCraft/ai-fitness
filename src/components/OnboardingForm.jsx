"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Loader2,
  ChevronDown,
  Sparkles,
  Brain
} from "lucide-react";

export default function OnboardingForm({ onComplete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [formData, setFormData] = useState({
    fitnessGoal: "",
    gender: "Male",
    weight: "",
    height: "",
    fitnessLevel: "Beginner",
    injuries: "",
    noInjuries: false,
    nutritionStyle: "",
    stressLevel: "",
    motivationalStyles: []
  });

  // Validation Logic
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      
      // Goals
      if (!formData.fitnessGoal) newErrors.fitnessGoal = "Goal selection is required";
      
      // Weight: 30-200kg
      if (!formData.weight) {
        newErrors.weight = "Weight is required";
      } else {
        const w = Number(formData.weight);
        if (w < 30 || w > 200) newErrors.weight = "Logical range: 30-200kg";
      }
      
      // Height: 100-250cm
      if (!formData.height) {
        newErrors.height = "Height is required";
      } else {
        const h = Number(formData.height);
        if (h < 100 || h > 250) newErrors.height = "Logical range: 100-250cm";
      }
      
      // Gender & Fitness Level are required (already have defaults, but let's be safe)
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.fitnessLevel) newErrors.fitnessLevel = "Level is required";
      
      // Injuries: If not 'None', must not be empty
      if (!formData.noInjuries && (!formData.injuries || formData.injuries.trim() === "")) {
        newErrors.injuries = "Please describe injuries or select 'None'";
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsLoading(true);
    
    // Simulate AI processing phase
    setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, 5000);
  };

  const toggleMotivation = (style) => {
    setFormData(prev => ({
      ...prev,
      motivationalStyles: prev.motivationalStyles.includes(style)
        ? prev.motivationalStyles.filter(s => s !== style)
        : [...prev.motivationalStyles, style]
    }));
  };

  const getInputClasses = (fieldName) => {
    const base = "w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ";
    if (errors[fieldName]) {
      return base + "border-red-100 focus:ring-red-200 bg-red-50/30";
    }
    if (formData[fieldName] && !errors[fieldName]) {
      return base + "border-emerald-100 focus:ring-emerald-200 bg-emerald-50/30";
    }
    return base + "border-transparent focus:ring-[#10b981]";
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading-screen" />
      ) : (
          <motion.div 
          key="onboarding-form"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl w-full mx-auto p-2 md:p-0"
        >
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
            
            {/* Header Section */}
            <div className="space-y-2 mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F2E32]">Personalize Your Smart Journey</h2>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Provide your baseline metrics and preferences. Our AI will analyze this data to craft your unique fitness ecosystem.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Fitness Goals */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fitness Goals</label>
                <div className="relative min-h-[44px]">
                  <select 
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData({...formData, fitnessGoal: e.target.value})}
                    className={getInputClasses("fitnessGoal")}
                  >
                    <option value="">Select a goal</option>
                    <option value="Muscle Building">Muscle Building</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Fitness Improvement">Fitness Improvement</option>
                  </select>
                  {/* <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} /> */}
                </div>
                <ErrorLabel error={errors.fitnessGoal} />
              </div>

              {/* Gender Segmented Control */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gender</label>
                <div className={`flex p-1 rounded-xl transition-all border-2 min-h-[44px] ${errors.gender ? "bg-red-50/30 border-red-100" : "bg-gray-50 border-transparent"}`}>
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({...formData, gender: g})}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        formData.gender === g ? "bg-white shadow-sm text-[#2F2E32]" : "text-gray-400"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <ErrorLabel error={errors.gender} />
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Weight (kg)</label>
                <input 
                  type="number"
                  placeholder="00"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className={`${getInputClasses("weight")} min-h-[44px]`}
                />
                <ErrorLabel error={errors.weight} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Height (cm)</label>
                <input 
                  type="number"
                  placeholder="000"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className={`${getInputClasses("height")} min-h-[44px]`}
                />
                <ErrorLabel error={errors.height} />
              </div>

              {/* Fitness Level Radio Cards */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fitness Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, fitnessLevel: level})}
                      className={`p-4 rounded-xl text-left border-2 transition-all min-h-[44px] ${
                        formData.fitnessLevel === level 
                          ? "border-[#10b981] bg-[#10b981]/5" 
                          : errors.fitnessLevel ? "border-red-100 bg-red-50/30" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <p className={`text-sm font-bold ${formData.fitnessLevel === level ? "text-[#10b981]" : "text-[#2F2E32]"}`}>
                        {level}
                      </p>
                    </button>
                  ))}
                </div>
                <ErrorLabel error={errors.fitnessLevel} />
              </div>

              {/* Injuries */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Previous Injuries</label>
                  <div 
                    className="flex items-center gap-2 cursor-pointer min-h-[44px]"
                    onClick={() => setFormData({...formData, noInjuries: !formData.noInjuries, injuries: formData.noInjuries ? "" : "None"})}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.noInjuries ? "bg-[#10b981] border-[#10b981]" : "border-gray-300"}`}>
                      {formData.noInjuries && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-xs text-gray-500">None</span>
                  </div>
                </div>
                <input 
                  type="text"
                  disabled={formData.noInjuries}
                  placeholder="Details (e.g., Back, Knee)"
                  value={formData.injuries}
                  onChange={(e) => setFormData({...formData, injuries: e.target.value})}
                  className={`${getInputClasses("injuries")} min-h-[44px]`}
                />
                <ErrorLabel error={errors.injuries} />
              </div>

              {/* Nutrition Style */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nutrition Style</label>
                <div className="relative min-h-[44px]">
                  <select 
                    value={formData.nutritionStyle}
                    onChange={(e) => setFormData({...formData, nutritionStyle: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-[#10b981] outline-none min-h-[44px]"
                  >
                    <option value="">Select style</option>
                    <option value="Keto">Keto</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Stress Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Stress</label>
                <div className="relative min-h-[44px]">
                  <select 
                    value={formData.stressLevel}
                    onChange={(e) => setFormData({...formData, stressLevel: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-[#10b981] outline-none min-h-[44px]"
                  >
                    <option value="">Select level</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} {i === 0 ? "(Low)" : i === 9 ? "(High)" : ""}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Motivational Style */}
              <div className="md:col-span-2 space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Motivational Style</label>
                <div className="flex flex-wrap gap-3">
                  {["Stats & Numbers", "Community Support", "Visual Projections"].map((style) => (
                    <div 
                      key={style}
                      onClick={() => toggleMotivation(style)}
                      className="flex items-center gap-2 cursor-pointer group min-h-[44px]"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        formData.motivationalStyles.includes(style) 
                          ? "bg-[#10b981] border-[#10b981]" 
                          : "border-gray-300 group-hover:border-[#10b981]"
                      }`}>
                        {formData.motivationalStyles.includes(style) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-600">{style}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="flex justify-end items-center mt-8 md:mt-12">
              <button 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg group min-h-[44px] ${
                  isFormValid 
                    ? "bg-[#10b981] hover:bg-[#0da673] text-white shadow-[#10b981]/20 active:scale-95 cursor-pointer" 
                    : "bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed shadow-none"
                }`}
              >
                Submit & Analyze
                <Sparkles size={18} className={isFormValid ? "group-hover:animate-pulse" : ""} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ErrorLabel = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.p
        initial={{ opacity: 0, height: 0, y: -5 }}
        animate={{ opacity: 1, height: "auto", y: 0 }}
        exit={{ opacity: 0, height: 0, y: -5 }}
        className="text-[10px] text-red-400 font-semibold mt-1 ml-1"
      >
        {error}
      </motion.p>
    )}
  </AnimatePresence>
);

function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-8 min-h-[400px] w-full"
    >
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-[#10b981]/10 flex items-center justify-center"
        >
          <Brain className="text-[#10b981]" size={48} />
        </motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-transparent border-t-[#10b981] rounded-full"
        />
      </div>
      
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-[#2F2E32]">AI Profile Analysis</h2>
        <p className="text-gray-500 max-w-sm mx-auto font-medium">
          AI Agents are processing your wellness profile...
        </p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="w-2.5 h-2.5 rounded-full bg-[#10b981]"
          />
        ))}
      </div>
    </motion.div>
  );
}
