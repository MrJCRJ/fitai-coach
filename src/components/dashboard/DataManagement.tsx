"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface DataManagementProps {
  onDataImported?: () => void;
}

export function DataManagement({ onDataImported }: DataManagementProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const exportData = () => {
    try {
      setIsExporting(true);
      const data = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        data: {
          detailedWorkoutSessions: localStorage.getItem(
            "detailedWorkoutSessions",
          ),
          userProgress: localStorage.getItem("userProgress"),
          workoutLevelData: localStorage.getItem("workoutLevelData"),
        },
      };

      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `fitai-coach-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      setIsExporting(false);
      setMessage({ type: "success", text: "Backup exportado com sucesso!" });
    } catch (error) {
      console.error("Erro ao exportar:", error);
      setMessage({ type: "error", text: "Erro ao exportar dados." });
      setIsExporting(false);
    }
  };

  const importData = () => {
    setIsImporting(true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importData = JSON.parse(content);

          if (!importData.data) {
            throw new Error("Formato de arquivo inválido");
          }

          // Importar dados
          if (importData.data.detailedWorkoutSessions) {
            localStorage.setItem(
              "detailedWorkoutSessions",
              importData.data.detailedWorkoutSessions,
            );
          }
          if (importData.data.userProgress) {
            localStorage.setItem("userProgress", importData.data.userProgress);
          }
          if (importData.data.workoutLevelData) {
            localStorage.setItem(
              "workoutLevelData",
              importData.data.workoutLevelData,
            );
          }

          setMessage({
            type: "success",
            text: "Dados importados! Recarregue a página.",
          });
          onDataImported?.();
          setIsImporting(false);
        } catch (error) {
          console.error("Erro ao importar:", error);
          setMessage({
            type: "error",
            text: "Erro ao importar dados. Verifique o arquivo.",
          });
          setIsImporting(false);
        }
      };

      reader.readAsText(file);
    };

    input.click();
  };

  const clearAllData = () => {
    if (
      confirm(
        "⚠️ Tem certeza que deseja apagar TODOS os dados? Esta ação não pode ser desfeita!",
      )
    ) {
      localStorage.clear();
      setMessage({
        type: "success",
        text: "Todos os dados foram apagados. Recarregue a página.",
      });
      onDataImported?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          💾 Gerenciamento de Dados
        </h3>

        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">
              💡 Sobre o Armazenamento
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Seus dados são salvos localmente no seu dispositivo usando
              localStorage, garantindo privacidade total e funcionamento
              offline.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• ✅ Dados ficam apenas no seu dispositivo</li>
              <li>• ✅ Sem custos ou limites de armazenamento</li>
              <li>• ✅ Funciona completamente offline</li>
              <li>• ✅ Backup e restauração manuais disponíveis</li>
              <li>• ✅ Você controla 100% dos seus dados</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-400">
                📤 Exportar Backup
              </h4>
              <p className="text-sm text-gray-300">
                Baixe todos os seus dados em um arquivo seguro.
              </p>
              <Button
                onClick={exportData}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isExporting}
              >
                📤 Exportar
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400">
                📥 Importar Backup
              </h4>
              <p className="text-sm text-gray-300">
                Restaure dados de um backup anterior.
              </p>
              <Button
                onClick={importData}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isImporting}
              >
                📥 Importar
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-red-400">🗑️ Apagar Tudo</h4>
              <p className="text-sm text-gray-300">
                Apague todos os dados permanentemente.
              </p>
              <Button
                onClick={clearAllData}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                �️ Apagar
              </Button>
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-900/20 border border-green-500/30 text-green-400"
                  : "bg-red-900/20 border border-red-500/30 text-red-400"
              }`}
            >
              {message.type === "success" ? "✅" : "❌"} {message.text}
            </motion.div>
          )}

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">
              🔒 Privacidade e Segurança
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Nenhum dado é enviado para servidores externos</li>
              <li>• Tudo fica armazenado apenas no seu dispositivo</li>
              <li>• Funciona perfeitamente offline</li>
              <li>• Faça backups regulares para não perder seus progressos</li>
              <li>
                • Você pode migrar seus dados entre dispositivos via
                export/import
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
