"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  isAssessmentCompleted,
  getAssessmentAnswers,
} from "@/lib/workoutGenerator";
import {
  isChallengeCompleted,
  calculateLevelFromChallenge,
  loadChallengeResults,
} from "@/lib/challengeWorkout";
import ChallengeWorkoutModal from "@/components/ChallengeWorkoutModal";

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href?: string;
  color: string;
  badge?: string;
  stats?: string;
  action?: () => void;
}

export default function DashboardPage() {
  const [assessmentCompleted] = useState(isAssessmentCompleted());
  const [challengeCompleted, setChallengeCompleted] = useState(
    isChallengeCompleted(),
  );
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
    setShowChallengeModal(false);
    // O treino será gerado automaticamente quando o usuário acessar a página de workout
  };

  const getDashboardCards = (): DashboardCard[] => {
    if (!assessmentCompleted) {
      return [
        {
          title: "Avaliação Física Inicial",
          description:
            "Faça seu primeiro teste físico para personalizarmos seus treinos",
          icon: "📊",
          href: "/assessment",
          color: "from-green-500 to-green-600",
          badge: "Importante",
        },
      ];
    }

    if (assessmentCompleted && !challengeCompleted) {
      return [
        {
          title: "Teste de Nível Físico",
          description:
            "Faça este desafio rápido para determinarmos seu nível real de condicionamento",
          icon: "🏋️",
          color: "from-orange-500 to-red-600",
          badge: "Próximo Passo",
          action: () => setShowChallengeModal(true),
        },
      ];
    }

    if (assessmentCompleted && challengeCompleted) {
      return [
        {
          title: "Seu Plano de Treinos",
          description:
            "Plano mensal personalizado criado pela IA baseado na sua avaliação e desempenho",
          icon: "🤖",
          href: "/workout",
          color: "from-blue-500 to-purple-600",
          badge: "IA Gerado",
        },
      ];
    }

    return [];
  };

  const getStatsData = () => {
    if (!assessmentCompleted) {
      return [
        {
          label: "Avaliação",
          value: "Pendente",
          icon: "📋",
          color: "text-orange-400",
        },
        {
          label: "Objetivo",
          value: "Definir",
          icon: "🎯",
          color: "text-blue-400",
        },
        {
          label: "Nível",
          value: "Desconhecido",
          icon: "📊",
          color: "text-purple-400",
        },
        {
          label: "Pronto para começar",
          value: "Sim!",
          icon: "✅",
          color: "text-green-400",
        },
      ];
    }

    if (assessmentCompleted && !challengeCompleted) {
      return [
        {
          label: "Avaliação",
          value: "Completa",
          icon: "✅",
          color: "text-green-400",
        },
        {
          label: "Objetivo",
          value: getAssessmentAnswers()?.goal || "Definido",
          icon: "🎯",
          color: "text-blue-400",
        },
        {
          label: "Nível",
          value: "Sendo testado",
          icon: "🏋️",
          color: "text-orange-400",
        },
        {
          label: "Próximo passo",
          value: "Desafio físico",
          icon: "⚡",
          color: "text-purple-400",
        },
      ];
    }

    if (assessmentCompleted && challengeCompleted) {
      const challengeResults = loadChallengeResults();
      const levelInfo = challengeResults
        ? calculateLevelFromChallenge(challengeResults)
        : { level: "beginner", description: "Desconhecido", score: 0 };

      return [
        {
          label: "Avaliação",
          value: "Completa",
          icon: "✅",
          color: "text-green-400",
        },
        {
          label: "Objetivo",
          value: getAssessmentAnswers()?.goal || "Definido",
          icon: "🎯",
          color: "text-blue-400",
        },
        {
          label: "Nível",
          value: levelInfo.description,
          icon: "📊",
          color: "text-purple-400",
        },
        {
          label: "Treino",
          value: "Pronto!",
          icon: "💪",
          color: "text-green-400",
        },
      ];
    }

    return [];
  };

  const dashboardCards = getDashboardCards();
  const statsData = getStatsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Bem-vindo ao FitAI Coach
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Vamos começar com uma avaliação física para criar treinos
            personalizados perfeitos para você
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-lg font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Navigation Cards */}
        <motion.div
          className="grid gap-6 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {card.href ? (
                <Link href={card.href}>
                  <Card
                    className="p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer group"
                    hover
                    glow
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                      {card.badge && (
                        <Badge
                          variant={
                            card.badge === "Premium" ? "error" : "warning"
                          }
                        >
                          {card.badge}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {card.description}
                    </p>

                    {card.stats && (
                      <div className="text-sm text-blue-400 font-medium">
                        {card.stats}
                      </div>
                    )}

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 group-hover:border-blue-500 group-hover:text-blue-300 transition-all"
                      >
                        Acessar →
                      </Button>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div onClick={card.action} className="cursor-pointer">
                  <Card
                    className="p-8 h-full hover:scale-105 transition-all duration-300 group"
                    hover
                    glow
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                      {card.badge && (
                        <Badge
                          variant={
                            card.badge === "Premium" ? "error" : "warning"
                          }
                        >
                          {card.badge}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {card.description}
                    </p>

                    {card.stats && (
                      <div className="text-sm text-blue-400 font-medium">
                        {card.stats}
                      </div>
                    )}

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 group-hover:border-blue-500 group-hover:text-blue-300 transition-all"
                      >
                        Começar →
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-8 max-w-2xl mx-auto">
            <blockquote className="text-xl text-gray-300 italic mb-4">
              &ldquo;A única maneira ruim de fazer exercícios é não
              fazê-los.&rdquo;
            </blockquote>
            <cite className="text-gray-400">— Jerry Seinfeld</cite>
          </Card>
        </motion.div>
      </div>

      {/* Challenge Workout Modal */}
      <ChallengeWorkoutModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        onComplete={handleChallengeComplete}
      />
    </div>
  );
}
