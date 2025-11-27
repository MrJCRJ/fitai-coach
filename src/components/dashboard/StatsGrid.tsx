"use client";

import Card from "@/components/ui/Card";
import { DashboardStats } from "@/lib/dashboardTypes";
import { formatTime } from "@/lib/dashboardUtils";

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-blue-400">
          {stats.totalSessions}
        </div>
        <div className="text-sm text-gray-400">Sessões</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-green-400">
          {formatTime(stats.totalTime)}
        </div>
        <div className="text-sm text-gray-400">Tempo Total</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-purple-400">
          {stats.totalReps}
        </div>
        <div className="text-sm text-gray-400">Reps Totais</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-orange-400">
          {formatTime(stats.totalRestTime)}
        </div>
        <div className="text-sm text-gray-400">Descanso Total</div>
      </Card>
    </div>
  );
}
