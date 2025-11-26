// Script para simular dados salvos no localStorage para teste
// COPIE E COLE NO CONSOLE DO NAVEGADOR (F12 > Console) para simular um usuário que completou assessment e challenge

(() => {
  // Simular assessment completado
  const assessmentAnswers = {
    birth_date: "1990-05-15",
    weight: 75,
    height: 175,
    experience: "1-2 anos",
    frequency: "3-4 vezes (recomendado)",
    goal: "Ganhar massa muscular",
    limitations: "Não tenho limitações",
    time_per_session: "45-60 minutos",
    fitness_level: 7,
  };

  const challengeResults = [
    {
      exerciseId: "pushup-test",
      exerciseName: "Flexão de Braços",
      completedReps: 25,
      perceivedDifficulty: 3,
      canPerform: true,
    },
    {
      exerciseId: "plank-test",
      exerciseName: "Prancha Isométrica",
      completedTime: 85,
      perceivedDifficulty: 2,
      canPerform: true,
    },
    {
      exerciseId: "squat-test",
      exerciseName: "Agachamento Livre",
      completedReps: 35,
      perceivedDifficulty: 2,
      canPerform: true,
    },
  ];

  // Salvar no localStorage
  localStorage.setItem(
    "fitai-assessment-answers",
    JSON.stringify(assessmentAnswers),
  );
  localStorage.setItem("fitai-assessment-completed", "true");
  localStorage.setItem(
    "fitai-challenge-results",
    JSON.stringify(challengeResults),
  );
  localStorage.setItem("fitai-challenge-completed", "true");

  console.log("✅ Dados simulados salvos no localStorage!");
  console.log("Assessment:", assessmentAnswers);
  console.log("Challenge Results:", challengeResults);

  // Recarregar a página para aplicar as mudanças
  console.log("🔄 Recarregando página em 2 segundos...");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
})();
