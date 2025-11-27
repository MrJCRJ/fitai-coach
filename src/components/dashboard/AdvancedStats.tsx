"use client";

import Card from "@/components/ui/Card";
import { DashboardStats } from "@/lib/dashboardTypes";
import { formatTime } from "@/lib/dashboardUtils";

interface AdvancedStatsProps {
  stats: DashboardStats;
}

export function AdvancedStats({ stats }: AdvancedStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-3 text-center">
        <div className="text-lg font-bold text-cyan-400">
          {formatTime(Math.round(stats.avgSessionDuration))}
        </div>
        <div className="text-xs text-gray-400">Média por Sessão</div>
      </Card>
      <Card className="p-3 text-center">
        <div className="text-lg font-bold text-pink-400">
          {stats.avgSetsPerSession.toFixed(1)}
        </div>
        <div className="text-xs text-gray-400">Sets por Sessão</div>
      </Card>
      <Card className="p-3 text-center">
        <div className="text-lg font-bold text-yellow-400">
          {stats.avgRepsPerSet.toFixed(1)}
        </div>
        <div className="text-xs text-gray-400">Reps por Set</div>
      </Card>
      <Card className="p-3 text-center">
        <div className="text-lg font-bold text-indigo-400">
          {formatTime(Math.round(stats.avgRestTimePerSession))}
        </div>
        <div className="text-xs text-gray-400">Descanso Médio</div>
      </Card>
    </div>
  );
}
