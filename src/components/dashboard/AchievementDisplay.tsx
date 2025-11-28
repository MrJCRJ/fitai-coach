"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/lib/dashboardTypes";
import Card from "@/components/ui/Card";

interface AchievementDisplayProps {
  unlockedAchievements: Achievement[];
  lockedAchievements: Achievement[];
}

export function AchievementDisplay({
  unlockedAchievements,
  lockedAchievements,
}: AchievementDisplayProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          🏆 Conquistas
        </h3>

        {/* Conquistas Desbloqueadas */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-green-400 mb-3">
              Conquistas Desbloqueadas ({unlockedAchievements.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="bg-green-900/20 border border-green-500/30 rounded-lg p-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h5 className="font-semibold text-green-400">
                        {achievement.name}
                      </h5>
                      <span className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">
                        +{achievement.xpReward} XP
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Conquistas Bloqueadas */}
        {lockedAchievements.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-400 mb-3">
              Próximas Conquistas ({lockedAchievements.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.slice(0, 6).map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 opacity-60"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl grayscale">
                      {achievement.icon}
                    </span>
                    <div>
                      <h5 className="font-semibold text-gray-500">
                        {achievement.name}
                      </h5>
                      <span className="text-xs text-gray-500 bg-gray-600/20 px-2 py-1 rounded">
                        +{achievement.xpReward} XP
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
            {lockedAchievements.length > 6 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                E mais {lockedAchievements.length - 6} conquistas para
                desbloquear...
              </p>
            )}
          </div>
        )}

        {unlockedAchievements.length === 0 &&
          lockedAchievements.length === 0 && (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🎯</span>
              <p className="text-gray-400">
                Comece seus treinos para desbloquear suas primeiras conquistas!
              </p>
            </div>
          )}
      </Card>
    </motion.div>
  );
}
