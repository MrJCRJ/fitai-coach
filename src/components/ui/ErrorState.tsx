import { motion } from "framer-motion";
import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  emoji?: string;
  onRetry?: () => void;
  retryLabel?: string;
  onAlternative?: () => void;
  alternativeLabel?: string;
  className?: string;
}

export default function ErrorState({
  title = "Erro",
  message,
  emoji = "⚠️",
  onRetry,
  retryLabel = "Tentar Novamente",
  onAlternative,
  alternativeLabel,
  className = "text-center py-12",
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="space-y-4">
        {onRetry && (
          <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
            {retryLabel}
          </Button>
        )}
        {onAlternative && (
          <Button
            variant="outline"
            onClick={onAlternative}
            className="border-gray-600 text-gray-300"
          >
            {alternativeLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
