# Sistema de Avaliação - Arquitetura Modular

## 📁 Estrutura de Arquivos

```
src/
├── app/assessment/
│   └── page.tsx                    # Página principal (agora limpa e modular)
├── components/assessment/
│   ├── index.ts                    # Exportações dos componentes
│   ├── ProgressBar.tsx             # Barra de progresso animada
│   ├── QuestionInput.tsx           # Componente para inputs de resposta
│   ├── QuestionCard.tsx            # Card da pergunta com navegação
│   ├── AssessmentCompleted.tsx     # Tela de conclusão
│   └── AssessmentHeader.tsx        # Header com título e progresso
├── hooks/
│   └── useAssessmentState.ts       # Hook customizado para estado
└── lib/
    └── assessmentData.ts           # Dados e utilitários das perguntas
```

## 🏗️ Arquitetura

### 1. **Separação de Responsabilidades**

- **Dados**: `assessmentData.ts` - perguntas, validações, utilitários
- **Estado**: `useAssessmentState.ts` - lógica de estado e persistência
- **UI**: Componentes modulares em `components/assessment/`
- **Página**: `page.tsx` - orquestração limpa dos componentes

### 2. **Componentes Modulares**

#### `ProgressBar`

- Barra de progresso animada
- Mostra pergunta atual/total
- Porcentagem de conclusão

#### `QuestionInput`

- Renderiza diferentes tipos de input baseados na pergunta
- Suporte para choice, number, scale
- Campo adicional para limitações detalhadas

#### `QuestionCard`

- Container da pergunta com navegação
- Animações de entrada/saída
- Botões anterior/próximo

#### `AssessmentCompleted`

- Tela de conclusão com resumo
- Botões para dashboard e refazer avaliação

#### `AssessmentHeader`

- Título e descrição
- Barra de progresso integrada

### 3. **Hook Customizado `useAssessmentState`**

#### Estado Gerenciado:

```typescript
{
  currentQuestionIndex: number;
  answers: AssessmentAnswers;
  showLimitationsDetail: boolean;
  completed: boolean;
}
```

#### Dados Calculados:

```typescript
{
  currentQuestion: AssessmentQuestion | null;
  progress: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}
```

#### Ações Disponíveis:

```typescript
{
  handleAnswer: (questionId: string, answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetAssessment: () => void;
  completeAssessment: () => void;
}
```

### 4. **Dados Estruturados**

#### Interface `AssessmentQuestion`:

```typescript
interface AssessmentQuestion {
  id: string;
  question: string;
  type: "scale" | "choice" | "number";
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  required?: boolean;
  description?: string;
}
```

#### Utilitários Disponíveis:

- `getQuestionById()` - Buscar pergunta por ID
- `validateAnswer()` - Validar resposta da pergunta
- `calculateProgress()` - Calcular progresso percentual
- Funções de navegação (next/previous/last/first)

## 🔄 Fluxo de Dados

1. **Inicialização**: Hook carrega estado do localStorage
2. **Navegação**: Usuário responde perguntas sequencialmente
3. **Validação**: Cada resposta é validada antes de avançar
4. **Persistência**: Respostas salvas automaticamente no localStorage
5. **Conclusão**: Estado final salvo e tela de conclusão exibida

## 🎯 Benefícios da Refatoração

### ✅ **Manutenibilidade**

- Código dividido em componentes pequenos e focados
- Lógica de estado centralizada em hook customizado
- Separação clara entre dados, lógica e apresentação

### ✅ **Reutilização**

- Componentes podem ser reutilizados em outras partes da app
- Hook pode ser usado para outras avaliações
- Utilitários genéricos para validação e navegação

### ✅ **Testabilidade**

- Componentes isolados são fáceis de testar
- Hook pode ser testado independentemente
- Funções utilitárias são puras e determinísticas

### ✅ **Type Safety**

- Interfaces bem definidas para todos os tipos
- TypeScript garante consistência em toda a aplicação
- Validação em tempo de compilação

### ✅ **Performance**

- Componentes menores = melhor otimização do React
- Estado bem estruturado evita re-renders desnecessários
- Lazy loading potencial para componentes grandes

## 🚀 Como Usar

### Página Básica:

```tsx
import { useAssessmentState } from "@/hooks/useAssessmentState";
import { QuestionCard, AssessmentCompleted } from "@/components/assessment";

export default function AssessmentPage() {
  const { completed, ...assessmentState } = useAssessmentState();

  if (completed) {
    return <AssessmentCompleted answers={assessmentState.answers} />;
  }

  return <QuestionCard {...assessmentState} />;
}
```

### Hook Customizado:

```tsx
const { currentQuestion, answers, progress, handleAnswer, nextQuestion } =
  useAssessmentState();
```

## 🔧 Extensibilidade

### Adicionar Nova Pergunta:

1. Adicionar ao array `assessmentQuestions` em `assessmentData.ts`
2. Tipos já suportam novos campos opcionais

### Novo Tipo de Input:

1. Adicionar case no `QuestionInput.tsx`
2. Atualizar interface `AssessmentQuestion` se necessário

### Nova Lógica de Estado:

1. Modificar hook `useAssessmentState.ts`
2. Componentes automaticamente refletem mudanças

Esta arquitetura modular torna o sistema de avaliação muito mais fácil de entender, manter e estender! 🎉
