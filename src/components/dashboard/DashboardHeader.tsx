"use client";

import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
        Treino Diário
      </h1>
      <p className="text-gray-300">Flexão • Barra • Agachamento</p>
    </motion.div>
  );
}
