import { calculateAge } from "../assessmentData";

// Interface para dados estruturados da avaliação
export interface UserAssessmentData {
  // Dados pessoais
  birth_date: string;
  age: number; // Calculada automaticamente
  weight: number;
  height: number;
  bmi: number;
  bmiCategory: string;

  // Experiência e nível
  experience: string;
  fitnessLevel: number;
  fitnessLevelDescription: string;

  // Objetivos e preferências
  goal: string;
  frequency: string;
  preferredDays: number;

  // Limitações e saúde
  limitations: string;
  limitationsDescription: string;

  // Dados calculados
  weeklyFrequency: number;
  trainingIntensity: "low" | "medium" | "high";
  recommendedFocus: string[];
  timePerSession: string;
}

// Mapeamentos de constantes para processamento de avaliação
const FREQUENCY_MAP: { [key: string]: number } = {
  "2-3 vezes": 2.5,
  "3-4 vezes": 3.5,
  "4-5 vezes": 4.5,
  "5-6 vezes": 5.5,
  "Todos os dias": 6,
};

const GOAL_FOCUS: { [key: string]: string[] } = {
  "Perder peso": ["Cardio", "Força", "HIIT"],
  "Ganhar massa muscular": ["Força", "Hipertrofia", "Compound movements"],
  "Melhorar condicionamento": ["Cardio", "Força", "Funcional"],
  "Manter saúde": ["Equilíbrio", "Mobilidade", "Força leve"],
  "Preparação para esporte": ["Específico do esporte", "Força", "Técnica"],
};

const LIMITATIONS_MAP: { [key: string]: string } = {
  "Não tenho limitações": "Sem limitações físicas conhecidas",
  "Dor leve em articulações (joelhos, tornozelos)":
    "Limitações leves em articulações inferiores",
  "Problemas nas costas ou coluna": "Limitações na coluna vertebral",
  "Lesão em ombros ou braços": "Limitações em membros superiores",
  "Limitações respiratórias": "Restrições respiratórias",
  "Outras limitações (especificar)": "Outras limitações específicas",
};

/**
 * Calcula o IMC e retorna a categoria correspondente
 */
export function calculateBMI(
  weight: number,
  heightCm: number
): { bmi: number; category: string } {
  const height = heightCm / 100; // converter cm para metros
  const bmi = Math.round((weight / (height * height)) * 10) / 10;

  let category = "";
  if (bmi < 18.5) category = "Abaixo do peso";
  else if (bmi < 25) category = "Peso normal";
  else if (bmi < 30) category = "Sobrepeso";
  else category = "Obesidade";

  return { bmi, category };
}

/**
 * Determina a descrição do nível de condicionamento baseada na pontuação
 */
export function getFitnessLevelDescription(fitnessLevel: number): string {
  if (fitnessLevel <= 3) return "Iniciante - pouco ou nenhum condicionamento";
  if (fitnessLevel <= 6) return "Intermediário - condicionamento moderado";
  return "Avançado - bom condicionamento físico";
}

/**
 * Determina a intensidade de treino baseada no nível de condicionamento
 */
export function getTrainingIntensity(
  fitnessLevel: number
): "low" | "medium" | "high" {
  if (fitnessLevel <= 3) return "low";
  if (fitnessLevel >= 8) return "high";
  return "medium";
}

/**
 * Função para processar e estruturar dados da avaliação
 */
export interface RawAssessmentAnswers {
  birth_date: string;
  weight: number;
  height: number;
  experience: string;
  fitness_level: number;
  frequency: string;
  goal: string;
  limitations: string;
  time_per_session: string;
}

export function processAssessmentData(
  rawAnswers: RawAssessmentAnswers
): UserAssessmentData {
  const { bmi, category: bmiCategory } = calculateBMI(
    rawAnswers.weight,
    rawAnswers.height
  );

  const fitnessLevel = rawAnswers.fitness_level;
  const weeklyFrequency = FREQUENCY_MAP[rawAnswers.frequency] || 3;

  return {
    birth_date: rawAnswers.birth_date,
    age: calculateAge(rawAnswers.birth_date),
    weight: rawAnswers.weight,
    height: rawAnswers.height,
    bmi,
    bmiCategory,
    experience: rawAnswers.experience,
    fitnessLevel,
    fitnessLevelDescription: getFitnessLevelDescription(fitnessLevel),
    goal: rawAnswers.goal,
    frequency: rawAnswers.frequency,
    preferredDays: Math.floor(weeklyFrequency),
    limitations: rawAnswers.limitations,
    limitationsDescription:
      LIMITATIONS_MAP[rawAnswers.limitations] || rawAnswers.limitations,
    weeklyFrequency,
    trainingIntensity: getTrainingIntensity(fitnessLevel),
    recommendedFocus: GOAL_FOCUS[rawAnswers.goal] || ["Equilíbrio geral"],
    timePerSession: rawAnswers.time_per_session,
  };
}
