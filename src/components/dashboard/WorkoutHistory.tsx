"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { WorkoutSessionCard } from "./WorkoutSessionCard";

interface WorkoutHistoryProps {
  workoutSessions: DetailedWorkoutSession[];
}

export function WorkoutHistory({ workoutSessions }: WorkoutHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );

  const INITIAL_SESSIONS = 5;
  const displayedSessions = showAll
    ? workoutSessions
    : workoutSessions.slice(0, INITIAL_SESSIONS);
  const hasMoreSessions = workoutSessions.length > INITIAL_SESSIONS;

  const toggleSessionExpansion = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Histórico de Evolução</h2>
        <div className="text-sm text-gray-400">
          {workoutSessions.length} sessões totais
        </div>
      </div>

      <div className="space-y-4">
        {displayedSessions.map((session, index) => (
          <motion.div
            key={session.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <WorkoutSessionCard
              session={session}
              index={index}
              isExpanded={expandedSessions.has(
                session.id || `session-${index}`
              )}
              onToggleExpansion={() =>
                toggleSessionExpansion(session.id || `session-${index}`)
              }
            />
          </motion.div>
        ))}

        {workoutSessions.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-gray-400">
              Nenhum treino realizado ainda. Comece seu primeiro treino!
            </div>
          </Card>
        )}
      </div>

      {hasMoreSessions && !showAll && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => setShowAll(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg"
          >
            Ver Todos os Treinos ({workoutSessions.length - INITIAL_SESSIONS}{" "}
            restantes)
          </Button>
        </motion.div>
      )}

      {showAll && hasMoreSessions && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => setShowAll(false)}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg"
          >
            Mostrar Menos
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
