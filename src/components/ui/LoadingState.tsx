import { motion } from "framer-motion";

interface LoadingStateProps {
  title?: string;
  message?: string;
  emoji?: string;
  className?: string;
}

export default function LoadingState({
  title = "Carregando...",
  message,
  emoji = "⏳",
  className = "text-center py-12",
}: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {emoji}
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      {message && <p className="text-gray-300">{message}</p>}
    </motion.div>
  );
}
