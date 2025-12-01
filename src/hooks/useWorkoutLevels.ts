import { useState } from "react";
// SimpleSession type removed to avoid referencing savedDetailed sessions (progression removed)

export function useWorkoutLevels() {
  type Difficulty = "beginner" | "intermediate" | "advanced" | "extreme";
  // Níveis/progressão removidos — valores neutros mantidos para compatibilidade
  // Dificuldade atual (neutra) para compatibilidade
  const [currentPushUpDifficulty] = useState<Difficulty>("beginner");
  const [currentPullUpDifficulty] = useState<Difficulty>("beginner");
  const [currentSquatDifficulty] = useState<Difficulty>("beginner");
  const [currentDipDifficulty] = useState<Difficulty>("beginner");

  // Estados para os níveis selecionados em cada carrossel (podem ser diferentes dos calculados)
  const [selectedPushUpDifficulty, setSelectedPushUpDifficulty] =
    useState<Difficulty>(currentPushUpDifficulty);
  const [selectedPullUpDifficulty, setSelectedPullUpDifficulty] =
    useState<Difficulty>(currentPullUpDifficulty);
  const [selectedSquatDifficulty, setSelectedSquatDifficulty] =
    useState<Difficulty>(currentSquatDifficulty);
  const [selectedDipDifficulty, setSelectedDipDifficulty] =
    useState<Difficulty>(currentDipDifficulty);

  return {
    // Dificuldades calculadas (somente leitura)
    currentPushUpDifficulty,
    currentPullUpDifficulty,
    currentSquatDifficulty,
    currentDipDifficulty,

    // Dificuldades selecionadas (podem ser modificadas)
    selectedPushUpDifficulty,
    selectedPullUpDifficulty,
    selectedSquatDifficulty,
    selectedDipDifficulty,
    setSelectedPushUpDifficulty,
    setSelectedPullUpDifficulty,
    setSelectedSquatDifficulty,
    setSelectedDipDifficulty,
  };
}
