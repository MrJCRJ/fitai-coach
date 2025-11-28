"use client";

import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { calculateDashboardStats } from "@/lib/dashboardUtils";
import {
  DashboardHeader,
  StartWorkoutButton,
  StatsSection,
  WorkoutHistory,
  DataManagement,
} from "@/components/dashboard";

export default function DashboardPage() {
  const { workoutSessions, userProgress, setWorkoutSessions, setUserProgress } =
    useDashboardData();
  const [refreshKey, setRefreshKey] = useState(0);
  const stats = calculateDashboardStats(workoutSessions, userProgress);

  const handleDataImported = () => {
    // Forçar recarregamento dos dados
    setRefreshKey((prev) => prev + 1);
    // Recarregar dados do localStorage (fallback)
    const saved = localStorage.getItem("detailedWorkoutSessions");
    if (saved) {
      setWorkoutSessions(JSON.parse(saved));
    }
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <DashboardHeader />
        <StatsSection stats={stats} />
        <StartWorkoutButton />
        <WorkoutHistory workoutSessions={workoutSessions} />
        <DataManagement onDataImported={handleDataImported} />
      </div>
    </div>
  );
}
