import type { UserAssessmentData } from "./assessmentProcessor";

/**
 * Gera o prompt para criação de desafio personalizado
 */
export function generateChallengePrompt(
  processedData: UserAssessmentData
): string {
  return `Você é um treinador pessoal especialista. Crie um desafio físico personalizado de 3 exercícios para avaliar o nível real de condicionamento do usuário.

PERFIL DO USUÁRIO:
- Idade: ${processedData.age} anos
- Peso: ${processedData.weight}kg, Altura: ${processedData.height}cm
- IMC: ${processedData.bmi} (${processedData.bmiCategory})
- Experiência: ${processedData.experience}
- Nível auto-avaliado: ${processedData.fitnessLevel}/10 (${processedData.fitnessLevelDescription})
- Objetivo principal: ${processedData.goal}
- Limitações: ${processedData.limitationsDescription}
- Tempo por sessão: ${processedData.timePerSession}

INSTRUÇÕES IMPORTANTES:
1. Crie EXATAMENTE 8 exercícios de avaliação para uma avaliação mais precisa
2. Foque em exercícios funcionais que testem diferentes aspectos: força, resistência, potência, equilíbrio
3. Adapte para limitações físicas se houver
4. Use apenas exercícios com peso corporal (sem equipamentos)
5. Inclua exercícios de diferentes grupos musculares e tipos de movimento
6. Considere o nível auto-avaliado mas crie um desafio abrangente
7. Exercícios devem ser seguros e executáveis sem equipamentos
8. Inclua variações modificadas para usuários com limitações

Retorne APENAS um objeto JSON válido com esta estrutura exata:
{
  "id": "personalized-challenge",
  "name": "Desafio Personalizado Completo de Nível",
  "exercises": [
    {
      "id": "challenge-exercise-1",
      "name": "Nome do exercício",
      "type": "max_effort|time",
      "target": "Objetivo do teste (ex: Máximo de repetições)",
      "instructions": "Instruções claras e detalhadas do exercício",
      "restTime": 60
    }
  ]
}`;
}

/**
 * Gera o prompt base para plano de treino semanal
 */
export function generateWorkoutPlanPrompt(
  processedData: UserAssessmentData
): string {
  return `Você é um treinador pessoal especialista. Crie um plano de treino semanal personalizado baseado no perfil abaixo:

PERFIL DO USUÁRIO:
- Idade: ${processedData.age} anos
- Peso: ${processedData.weight}kg, Altura: ${processedData.height}cm
- IMC: ${processedData.bmi} (${processedData.bmiCategory})
- Experiência: ${processedData.experience}
- Nível de condicionamento: ${processedData.fitnessLevel}/10 (${processedData.fitnessLevelDescription})
- Objetivo principal: ${processedData.goal}
- Frequência desejada: ${processedData.frequency} (${processedData.weeklyFrequency} dias/semana)
- Intensidade recomendada: ${processedData.trainingIntensity}
- Foco recomendado: ${processedData.recommendedFocus.join(", ")}
- Limitações: ${processedData.limitationsDescription}
- Tempo por sessão: ${processedData.timePerSession}

INSTRUÇÕES IMPORTANTES:
1. Considere o nível de condicionamento real do usuário
2. Adapte exercícios para limitações físicas se houver
3. Use APENAS exercícios com peso corporal (sem equipamentos)
4. Foque no objetivo principal mas inclua equilíbrio
5. Respeite a frequência semanal desejada
6. Inclua aquecimento e alongamento quando apropriado
7. Exercícios devem ser progressivos e seguros
8. Especifique claramente que não são necessários equipamentos

Retorne APENAS um objeto JSON válido com esta estrutura exata:
{
  "week": 1,
  "workouts": [
    {
      "id": "day1-workout",
      "name": "Nome do treino",
      "duration": "XX min",
      "difficulty": "Iniciante|Intermediário|Avançado",
      "exercises": [
        {
          "id": "exercise-1",
          "name": "Nome do exercício",
          "sets": 3,
          "reps": "10-12",
          "rest": "60s",
          "instructions": "Descrição clara do exercício",
          "tips": "Dicas adicionais se necessário"
        }
      ],
      "calories": 250,
      "type": "Força|Cardio|Funcional|HIIT",
      "description": "Breve descrição do treino",
      "targetMuscles": ["Grupo muscular 1", "Grupo muscular 2"],
      "equipment": ["Nenhum"]
    }
  ]
}`;
}

/**
 * Adiciona informações de resultados do desafio ao prompt
 */
export function addChallengeResultsToPrompt(
  basePrompt: string,
  challengeSummary: string
): string {
  return `${basePrompt}\n\nRESULTADOS DO DESAFIO REALIZADO:\n${challengeSummary}\n\nIMPORTANTE: Use estes resultados reais do desafio para ajustar a intensidade e dificuldade dos exercícios. Os valores de dificuldade percebida e desempenho real devem guiar suas recomendações, não apenas a auto-avaliação inicial.`;
}

/**
 * Adiciona informações de progresso anterior ao prompt
 */
export function addProgressSummaryToPrompt(
  basePrompt: string,
  progressSummary: string
): string {
  return `${basePrompt}\n\nAJUSTE BASEADO NO PROGRESSO ANTERIOR:\n${progressSummary}\n\nAdapte a intensidade e exercícios considerando o progresso relatado.`;
}
