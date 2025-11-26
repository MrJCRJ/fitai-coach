export interface AssessmentQuestion {
  id: string;
  question: string;
  type: "scale" | "choice" | "number" | "date";
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  required?: boolean;
  description?: string;
}

export interface AssessmentAnswers {
  [key: string]: any;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "birth_date",
    question: "Qual sua data de nascimento?",
    type: "date",
    required: true,
    description:
      "Usada para calcular sua idade e personalizar treinos adequadamente",
  },
  {
    id: "weight",
    question: "Qual seu peso atual?",
    type: "number",
    unit: "kg",
    required: true,
    description: "Usado para calcular IMC e personalizar calorias",
  },
  {
    id: "height",
    question: "Qual sua altura?",
    type: "number",
    unit: "cm",
    required: true,
    description: "Usado para calcular IMC e propor exercícios adequados",
  },
  {
    id: "experience",
    question: "Há quanto tempo você pratica exercícios regularmente?",
    type: "choice",
    options: [
      "Nunca pratiquei",
      "Menos de 3 meses",
      "3-6 meses",
      "6-12 meses",
      "1-2 anos",
      "Mais de 2 anos",
    ],
    required: true,
    description: "Define seu nível inicial de condicionamento",
  },
  {
    id: "frequency",
    question: "Com que frequência você gostaria de treinar por semana?",
    type: "choice",
    options: [
      "2-3 vezes (iniciante)",
      "3-4 vezes (recomendado)",
      "4-5 vezes (intermediário)",
      "5-6 vezes (avançado)",
      "Todos os dias (atleta)",
    ],
    required: true,
    description: "Define quantos dias por semana você quer treinar",
  },
  {
    id: "goal",
    question: "Qual seu objetivo principal?",
    type: "choice",
    options: [
      "Perder peso / Queimar gordura",
      "Ganhar massa muscular",
      "Melhorar resistência cardiovascular",
      "Tonificar o corpo",
      "Melhorar força geral",
      "Preparação para esporte específico",
      "Manter saúde e bem-estar",
    ],
    required: true,
    description: "Direciona os tipos de exercícios e intensidade",
  },
  {
    id: "limitations",
    question: "Você tem alguma limitação física ou lesão?",
    type: "choice",
    options: [
      "Não tenho limitações",
      "Dor leve em articulações (joelhos, tornozelos)",
      "Problemas nas costas ou coluna",
      "Lesão em ombros ou braços",
      "Limitações respiratórias",
      "Outras limitações (especificar)",
    ],
    required: true,
    description: "Garante exercícios seguros e adaptados",
  },
  {
    id: "time_per_session",
    question: "Quanto tempo você pode dedicar por sessão?",
    type: "choice",
    options: [
      "20-30 minutos",
      "30-45 minutos",
      "45-60 minutos",
      "60-90 minutos",
      "Mais de 90 minutos",
    ],
    required: true,
    description: "Define a duração ideal dos treinos",
  },
  {
    id: "fitness_level",
    question: "Como você avaliaria seu nível de condicionamento atual?",
    type: "scale",
    min: 1,
    max: 10,
    required: true,
    description: "Escala de 1 (iniciante) a 10 (atleta profissional)",
  },
];

// Funções auxiliares para trabalhar com as perguntas
export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return assessmentQuestions.find((q) => q.id === id);
}

export function getNextQuestionIndex(currentIndex: number): number {
  return Math.min(currentIndex + 1, assessmentQuestions.length - 1);
}

export function getPreviousQuestionIndex(currentIndex: number): number {
  return Math.max(currentIndex - 1, 0);
}

export function isLastQuestion(index: number): boolean {
  return index === assessmentQuestions.length - 1;
}

export function isFirstQuestion(index: number): boolean {
  return index === 0;
}

export function calculateProgress(currentIndex: number): number {
  return ((currentIndex + 1) / assessmentQuestions.length) * 100;
}

export function validateAnswer(
  question: AssessmentQuestion,
  answer: any,
): boolean {
  if (!question.required) return true;
  if (!answer) return false;

  if (question.type === "number") {
    const num = Number(answer);
    if (isNaN(num)) return false;
    if (question.min !== undefined && num < question.min) return false;
    if (question.max !== undefined && num > question.max) return false;
  }

  if (question.type === "date") {
    const date = new Date(answer);
    if (isNaN(date.getTime())) return false;

    // Não aceitar datas futuras
    const today = new Date();
    if (date > today) return false;

    // Não aceitar datas muito antigas (mais de 120 anos)
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (date < minDate) return false;

    // Não aceitar datas muito recentes (menos de 10 anos - criança)
    const maxBirthDate = new Date();
    maxBirthDate.setFullYear(today.getFullYear() - 10);
    if (date > maxBirthDate) return false;
  }

  return true;
}

// Função helper para calcular idade a partir da data de nascimento
export function calculateAge(birthDate: string | Date): number {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Função helper para formatar data de nascimento
export function formatBirthDate(dateString: string): string {
  try {
    // Para datas ISO (YYYY-MM-DD), garantir que seja tratada como data local
    const parts = dateString.split("-");
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const date = new Date(year, month - 1, day); // month - 1 porque Date usa 0-based
        return date.toLocaleDateString("pt-BR");
      }
    }
  } catch (error) {
    // Em caso de erro, retorna a string original
  }

  // Fallback: tentar o método original
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}
