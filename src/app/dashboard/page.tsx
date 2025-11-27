"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { calculateDashboardStats } from "@/lib/dashboardUtils";
import {
  DashboardHeader,
  StartWorkoutButton,
  StatsSection,
  WorkoutHistory,
} from "@/components/dashboard";

export default function DashboardPage() {
  const { workoutSessions } = useDashboardData();
  const stats = calculateDashboardStats(workoutSessions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <DashboardHeader />
        <StatsSection stats={stats} />
        <StartWorkoutButton />
        <WorkoutHistory workoutSessions={workoutSessions} />
      </div>
    </div>
  );
}
