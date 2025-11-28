"use client";

import Card from "@/components/ui/Card";
import { DashboardStats } from "@/lib/dashboardTypes";

interface WeightStatsProps {
  stats: DashboardStats;
}

export function WeightStats({ stats }: WeightStatsProps) {
  // Só mostrar se há dados de peso
  if (!stats.totalWeightUsed || stats.totalWeightUsed === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card className="p-4 text-center">
        <div className="text-xl font-bold text-purple-400">
          {stats.totalWeightUsed?.toFixed(1)}kg
        </div>
        <div className="text-xs text-gray-400">Peso Total Utilizado</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-xl font-bold text-orange-400">
          {stats.avgWeightPerSession?.toFixed(1)}kg
        </div>
        <div className="text-xs text-gray-400">Peso Médio por Sessão</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-xl font-bold text-teal-400">
          {stats.sessionsWithWeight}
        </div>
        <div className="text-xs text-gray-400">Sessões com Peso</div>
      </Card>
    </div>
  );
}
