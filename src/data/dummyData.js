export const wellnessData = {
  metadata: {
    lastSync: "June 13, 2026 - 01:45 AM",
    aiModelVersion: "Armah-Health-Nexus-v4.2"
  },
  wellnessScore: {
    current: 88,
    previous: 82,
    status: "Optimized",
    trend: "up",
    subMetrics: {
      recovery: 90,
      readiness: 85,
      performance: 89
    }
  },
  aiCoachingEngine: {
    primaryFocus: "Hypertrophy Phase",
    priorityAdvice: "Your HRV (Heart Rate Variability) is high today, which means your CNS (Central Nervous System) is fully recovered. Recommend hitting PRs in compound lifts.",
    actionItems: [
      { id: 1, task: "Increase protein intake by 15g post-workout", priority: "high" },
      { id: 2, task: "Add 10 mins of hip mobility work", priority: "medium" }
    ]
  },
  workoutPlan: {
    title: "Upper Body - Power & Volume",
    focus: "Chest & Back",
    metrics: { duration: "55m", burn: 640, rpe: 8.5 },
    exercises: [
      { name: "Incline Bench Press", sets: 4, reps: "6-8", load: "85kg", notes: "Focus on eccentric control" },
      { name: "Weighted Pull-ups", sets: 3, reps: "8", load: "BW+10kg", notes: "Full range of motion" },
      { name: "Cable Flyes", sets: 3, reps: "15", load: "20kg", notes: "Squeeze at peak contraction" },
      { name: "Barbell Rows", sets: 4, reps: "10", load: "70kg", notes: "Keep spine neutral" },
      { name: "Dumbbell Lateral Raises", sets: 4, reps: "12-15", load: "12kg", notes: "Controlled movement, no swinging" },
      { name: "Face Pulls", sets: 3, reps: "15", load: "15kg", notes: "Focus on rear delts" }
    ]
  },
  nutritionalBiofeedback: {
    calories: { total: 2800, consumed: 1450, remaining: 1350 },
    macros: {
      protein: { grams: 185, target: 200, unit: "g" },
      carbs: { grams: 260, target: 300, unit: "g" },
      fats: { grams: 75, target: 80, unit: "g" }
    },
    hydration: { current: 2.1, target: 3.5, unit: "L" },
    glycemicLoad: "Low-Moderate"
  },
  biometrics: {
    sleep: { duration: "7h 45m", quality: "Deep 2h 15m", status: "Optimal" },
    restingHeartRate: 52,
    bloodOxygen: 98
  }
};