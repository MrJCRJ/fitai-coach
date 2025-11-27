"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export function StartWorkoutButton() {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Link href="/workout">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl"
        >
          🚀 Iniciar Treino
        </Button>
      </Link>
    </motion.div>
  );
}
