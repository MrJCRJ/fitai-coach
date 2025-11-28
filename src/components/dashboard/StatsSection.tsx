"use client";

import { motion } from "framer-motion";
import { DashboardStats } from "@/lib/dashboardTypes";
import { StatsGrid } from "./StatsGrid";
import { AdvancedStats } from "./AdvancedStats";
import { MuscleGroupStats } from "./MuscleGroupStats";
import { WeightStats } from "./WeightStats";
import { AchievementDisplay } from "./AchievementDisplay";

interface StatsSectionProps {
  stats: DashboardStats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <StatsGrid stats={stats} />
      <AdvancedStats stats={stats} />
      <WeightStats stats={stats} />
      <MuscleGroupStats stats={stats} />
      {stats.unlockedAchievements && stats.lockedAchievements && (
        <AchievementDisplay
          unlockedAchievements={stats.unlockedAchievements}
          lockedAchievements={stats.lockedAchievements}
        />
      )}
    </motion.div>
  );
}
