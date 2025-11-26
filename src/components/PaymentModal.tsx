"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { RewardedAd } from "@/components/RewardedAd";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  onAdSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  onAdSuccess,
}: PaymentModalProps) {
  const [selectedOption, setSelectedOption] = useState<"payment" | "ad" | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onPaymentSuccess();
    onClose();
  };

  const handleAdComplete = () => {
    onAdSuccess();
    onClose();
  };

  const handleAdError = (error: unknown) => {
    console.error("Ad error:", error);
    // Could show a toast notification here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 bg-slate-800/95 border-slate-700 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-2xl">🤖</span>
                </motion.div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Liberar Treino IA
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Seu treino personalizado está pronto! Escolha como acessar:
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {/* Opção de Pagamento */}
                <motion.div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedOption === "payment"
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
                  }`}
                  onClick={() => setSelectedOption("payment")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedOption === "payment"
                          ? "bg-blue-500"
                          : "bg-slate-600"
                      }`}
                      animate={{
                        rotate: selectedOption === "payment" ? 360 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl">💳</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg">
                        Pagamento Rápido
                      </h3>
                      <p className="text-sm text-gray-400">
                        R$ 0.10 • Instantâneo
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-green-400">✓ Pix</span>
                        <span className="text-xs text-green-400">✓ Cartão</span>
                      </div>
                    </div>
                    {selectedOption === "payment" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Opção de Anúncio */}
                <motion.div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedOption === "ad"
                      ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                      : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
                  }`}
                  onClick={() => setSelectedOption("ad")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedOption === "ad"
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                      animate={{
                        rotate: selectedOption === "ad" ? 360 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl">📺</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg">
                        Anúncio Gratuito
                      </h3>
                      <p className="text-sm text-gray-400">
                        30 segundos • Sem custo
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-blue-400">
                          🎯 Suporte o app
                        </span>
                      </div>
                    </div>
                    {selectedOption === "ad" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedOption === "payment" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 text-lg font-semibold shadow-lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processando...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>💳</span>
                          Pagar R$ 0.10
                        </div>
                      )}
                    </Button>
                  </motion.div>
                )}

                {selectedOption === "ad" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <RewardedAd
                      onAdComplete={handleAdComplete}
                      onAdError={handleAdError}
                    />
                  </motion.div>
                )}

                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isProcessing}
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500 py-3"
                >
                  Fechar
                </Button>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-gray-500">
                  Seus dados estão seguros • Cancele a qualquer momento
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
