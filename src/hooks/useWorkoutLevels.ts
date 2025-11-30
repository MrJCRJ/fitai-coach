import { useState } from "react";
// SimpleSession type removed to avoid referencing savedDetailed sessions (progression removed)

export function useWorkoutLevels() {
  // Níveis/progressão removidos — valores neutros mantidos para compatibilidade
  const [currentPushUpLevel] = useState<number>(1);

  const [currentPullUpLevel] = useState<number>(1);

  const [currentSquatLevel] = useState<number>(1);

  const [currentDipLevel] = useState<number>(1);

  // Estados para os níveis selecionados em cada carrossel (podem ser diferentes dos calculados)
  const [selectedPushUpLevel, setSelectedPushUpLevel] =
    useState<number>(currentPushUpLevel);
  const [selectedPullUpLevel, setSelectedPullUpLevel] =
    useState<number>(currentPullUpLevel);
  const [selectedSquatLevel, setSelectedSquatLevel] =
    useState<number>(currentSquatLevel);
  const [selectedDipLevel, setSelectedDipLevel] =
    useState<number>(currentDipLevel);

  return {
    // Níveis calculados (somente leitura)
    currentPushUpLevel,
    currentPullUpLevel,
    currentSquatLevel,
    currentDipLevel,

    // Níveis selecionados (podem ser modificados)
    selectedPushUpLevel,
    selectedPullUpLevel,
    selectedSquatLevel,
    selectedDipLevel,
    setSelectedPushUpLevel,
    setSelectedPullUpLevel,
    setSelectedSquatLevel,
    setSelectedDipLevel,
  };
}
