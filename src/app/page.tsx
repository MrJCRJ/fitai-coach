'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { usePWAInstall } from '@/lib/usePWAInstall'

export default function HomePage() {
  const { installPWA, isInstallable } = usePWAInstall()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl w-full mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="warning" className="mb-6" animate>
              🚧 MVP - App em Desenvolvimento
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              FitAI Coach
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
              Seu treinador pessoal inteligente que evolui com você. Este é um projeto em desenvolvimento -
              uma demonstração das possibilidades da IA no fitness.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="info">Next.js 14</Badge>
              <Badge variant="success">TypeScript</Badge>
              <Badge variant="warning">Framer Motion</Badge>
              <Badge variant="error">Tailwind CSS</Badge>
            </div>

            {/* Install Button */}
            {isInstallable && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={installPWA}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl animate-pulse"
                >
                  📱 Instalar App Agora
                </Button>
                <p className="text-sm text-gray-400 mt-2">
                  Rápido • Offline • Sem anúncios
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Status Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 max-w-4xl mx-auto glass">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🏗️ Projeto em Construção
                </h3>
                <p className="text-gray-300 mb-4">
                  Este é um MVP (Minimum Viable Product) demonstrando conceitos de IA aplicada ao fitness.
                  Nem todas as funcionalidades estão implementadas ainda.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Interface moderna e responsiva</li>
                  <li>✅ Componentes reutilizáveis</li>
                  <li>✅ API stubs para IA</li>
                  <li>🚧 Sistema de autenticação</li>
                  <li>🚧 Geração real de treinos</li>
                  <li>🚧 Dashboard de progresso</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <p className="text-sm text-gray-400">
                  Versão Alpha 0.1.0
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="p-8 text-center group" hover glow>
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Treinos Personalizados</h3>
            <p className="text-gray-300 leading-relaxed mb-4">Algoritmos de IA criam rotinas adaptadas ao seu nível e objetivos específicos, evoluindo conforme seu progresso.</p>
            <Badge variant="warning" className="text-xs">Em Desenvolvimento</Badge>
          </Card>

          <Card className="p-8 text-center group" hover glow>
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Acompanhamento em Tempo Real</h3>
            <p className="text-gray-300 leading-relaxed mb-4">Monitore seu progresso, métricas e ajustes automáticos baseados no seu desempenho e feedback contínuo.</p>
            <Badge variant="warning" className="text-xs">Planejado</Badge>
          </Card>

          <Card className="p-8 text-center group" hover glow>
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Evolução Constante</h3>
            <p className="text-gray-300 leading-relaxed mb-4">O sistema aprende com seus hábitos e se adapta para maximizar seus resultados e manter a motivação.</p>
            <Badge variant="warning" className="text-xs">Futuro</Badge>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-12 max-w-2xl mx-auto" glow>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Interessado no Projeto?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Este é um projeto open-source em desenvolvimento. Explore o código,
                contribua ou aguarde as próximas atualizações!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.open('https://github.com/MrJCRJ/fitai-coach', '_blank')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl"
                >
                  🔗 Ver no GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => console.log('Ver demonstração')}
                  className="border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl"
                >
                  🎯 Testar Funcionalidades
                </Button>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Tecnologias Utilizadas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="info" animate>Next.js 14</Badge>
            <Badge variant="success" animate>TypeScript</Badge>
            <Badge variant="warning" animate>Tailwind CSS</Badge>
            <Badge variant="error" animate>Framer Motion</Badge>
            <Badge variant="default" animate>ESLint</Badge>
            <Badge variant="default" animate>Vitest</Badge>
            <Badge variant="default" animate>Husky</Badge>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 pt-12 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 FitAI Coach. Projeto open-source em desenvolvimento.
            </div>
            <div className="flex gap-6">
              <Badge variant="default">Alpha 0.1.0</Badge>
              <Badge variant="default">MVP</Badge>
              <Badge variant="default">Open Source</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
