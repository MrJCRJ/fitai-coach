"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";

interface WorkoutNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentSession: {
    [key: string]: {
      sets: { reps: number; time: number }[];
      totalTime: number;
    };
  };
}

export default function WorkoutNavbar({
  activeTab,
  onTabChange,
  currentSession,
}: WorkoutNavbarProps) {
  const tabs = [
    {
      id: "peito",
      name: "Peito",
      icon: "💪",
      exerciseId: "flexao",
    },
    {
      id: "costas",
      name: "Costas",
      icon: "🏋️",
      exerciseId: "barra",
    },
    {
      id: "pernas",
      name: "Pernas",
      icon: "🦵",
      exerciseId: "agachamento",
    },
  ];

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:scale-102"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.name}</span>
            {(currentSession[tab.exerciseId]?.sets?.length || 0) > 0 && (
              <Badge variant="success" className="ml-1">
                {currentSession[tab.exerciseId]!.sets.length}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
