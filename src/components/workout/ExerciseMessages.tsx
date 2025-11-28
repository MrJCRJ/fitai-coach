// ====================
// COMPONENTES DE MENSAGEM PARA EXERCÍCIOS
// ====================

/**
 * Componente de mensagem de erro para exercícios não disponíveis
 */
export function ExerciseNotAvailableMessage({ level }: { level: number }) {
  return (
    <div className="text-center py-8">
      <div className="animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-48 mx-auto mb-4"></div>
        <p className="text-gray-400">
          Nenhum exercício disponível para o nível {level}.
        </p>
      </div>
    </div>
  );
}

/**
 * Componente de mensagem para nível não disponível
 */
export function LevelNotAvailableMessage({ level }: { level: number }) {
  return (
    <div className="text-center py-8">
      <div className="animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-48 mx-auto mb-4"></div>
        <p className="text-gray-400">
          Nível {level} não disponível para este grupo muscular.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Selecione um nível diferente.
        </p>
      </div>
    </div>
  );
}
