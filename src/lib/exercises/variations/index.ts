// ====================
// SISTEMA DE VARIAÇÕES DE EXERCÍCIOS - ORGANIZADO POR PASTAS
// ====================

// Push-ups (flexões) - organizado por dificuldade
export {
  pushUpVariations,
  canUnlockPushUpVariation,
  beginnerPushups,
  intermediatePushups,
  advancedPushups,
  extremePushups,
} from "./pushups";

// Pull-ups (barras) - organizado por dificuldade
export {
  pullVariations as pullUpVariations,
  canUnlockPullVariation as canUnlockPullUpVariation,
  beginnerPull,
  intermediatePull,
  advancedPull,
  extremePull,
  pullVariations,
  pullExercisesByDifficulty,
  pullStats,
  getPullExercisesByLevel,
  getPullExerciseById,
  getPullExercisesByDifficulty,
} from "./pull";

// Squats (agachamentos) - organizado por dificuldade
export {
  squatVariations,
  canUnlockSquatVariation,
  beginnerSquat,
  intermediateSquat,
  advancedSquat,
  extremeSquat,
  squatExercisesByDifficulty,
  squatStats,
  getSquatExercisesByLevel,
  getSquatExerciseById,
  getSquatExercisesByDifficulty,
} from "./squat";
