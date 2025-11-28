/**
 * Utilitários para cálculo de níveis e XP no sistema de gamificação
 */

/**
 * Calcula o nível do usuário baseado no XP total
 * Cada nível requer XP progressivamente maior
 */
export function calculateUserLevel(totalXp: number): number {
  let level = 1;
  let xpRequired = 100;

  while (totalXp >= xpRequired) {
    totalXp -= xpRequired;
    level++;
    xpRequired = Math.floor(xpRequired * 1.5); // XP necessário aumenta 50% por nível
  }

  return level;
}

/**
 * Calcula quanto XP falta para o próximo nível
 */
export function getXpToNextLevel(totalXp: number): number {
  const currentLevel = calculateUserLevel(totalXp);
  let xpRequired = 100;
  let accumulatedXp = 0;

  for (let level = 1; level < currentLevel; level++) {
    accumulatedXp += xpRequired;
    xpRequired = Math.floor(xpRequired * 1.5);
  }

  const nextLevelXp = accumulatedXp + xpRequired;
  return Math.max(0, nextLevelXp - totalXp);
}

/**
 * Calcula o XP total necessário para alcançar um nível específico
 */
export function getXpForLevel(targetLevel: number): number {
  let totalXp = 0;
  let xpRequired = 100;

  for (let level = 1; level < targetLevel; level++) {
    totalXp += xpRequired;
    xpRequired = Math.floor(xpRequired * 1.5);
  }

  return totalXp;
}

/**
 * Formata XP para exibição (ex: "1.2k" para 1200)
 */
export function formatXp(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
