"use client";

import Card from "@/components/ui/Card";
import { DashboardStats } from "@/lib/dashboardTypes";

interface MuscleGroupStatsProps {
  stats: DashboardStats;
}

export function MuscleGroupStats({ stats }: MuscleGroupStatsProps) {
  if (Object.keys(stats.muscleGroupStats).length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-3">
        Por Grupo Muscular
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(stats.muscleGroupStats).map(([group, data]) => (
          <Card key={group} className="p-3">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-300 capitalize mb-1">
                {group === "pushup"
                  ? "Peito"
                  : group === "pullup"
                    ? "Costas"
                    : "Pernas"}
              </div>
              <div className="text-lg font-bold text-blue-400">
                {data.totalReps}
              </div>
              <div className="text-xs text-gray-400">
                {data.totalSets} sets • {data.sessions} sessões
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
