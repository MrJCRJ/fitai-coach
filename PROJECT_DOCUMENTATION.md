# FitAI Coach — Documentação do Projeto

Este arquivo consolida a visão do produto, modelo de negócio, especificações técnicas, fluxos de usuário e plano de desenvolvimento do MVP.

---

## 1. Visão do Produto

1.1 Conceito Principal

FitAI Coach - Um personal trainer inteligente que usa IA para criar treinos personalizados que evoluem conforme o progresso do usuário.

1.2 Proposta de Valor Única

- Avaliação Inteligente: Testes físicos que entendem suas capacidades
- Evolução Contínua: Treinos que se adaptam automaticamente ao progresso
- Acesso Flexível: Pague com tempo (anúncios) ou dinheiro (assinatura)

  1.3 Público-Alvo

| Segmento     | Características                | Necessidades                         |
| ------------ | ------------------------------ | ------------------------------------ |
| Iniciantes   | 18-35 anos, sem experiência    | Orientação, medo de fazer errado     |
| Casuais      | 20-45 anos, prática irregular  | Variedade, motivação consistente     |
| Reabilitação | 30-60 anos, limitações físicas | Exercícios seguros, progressão lenta |

1.4 Funcionalidades Core

- Sistema de avaliação física interativa
- Campo opcional para objetivos pessoais (texto livre do usuário para personalização adicional)
- Geração de treinos personalizados por IA com adaptação baseada em progresso e feedback
- Acompanhamento de progresso automático com resumos de histórico
- Reavaliação e ajuste contínuo usando cache de contexto e prompts de sistema
- Modelo de negócio híbrido (anúncios + assinatura)

---

## 2. Modelo de Negócio

2.1 Estratégia de Monetização

- Opção Pay-per-Use (NOVO): Cobrar apenas pelas requisições à API de IA (ex.: R$ 0.10-0.50 por geração de treino OU 1-2 anúncios rewarded de 30s). Usuários gratuitos para avaliação básica, premium para treinos personalizados. Anúncios: ~1 vídeo = ~R$ 0.01-0.05 (cobre ~0.0028 do custo da API).
- Opção Premium por Anúncios (CARO): 1 anúncio = 1 hora de acesso premium. 8 anúncios/dia = dia completo.
- Opção por Assinatura (ECONÔMICO): R$ 15,00/mês = Acesso ilimitado.

  2.2 Projeções Financeiras (Ano 1) - Modelo Pay-per-Use

Assumindo: 10 requests/usuário/mês (baseado em dados atuais), R$ 0.01/request, margem de lucro de ~70% após custos de API.

| Trimestre | Usuários Ativos | Requests Totais | Receita Mensal | Lucro Mensal |
| --------- | --------------: | --------------: | -------------: | -----------: |
| 1º        |             500 |           5.000 |       R$ 50,00 |     R$ 35,00 |
| 2º        |           1.000 |          10.000 |      R$ 100,00 |     R$ 70,00 |
| 3º        |           2.000 |          20.000 |      R$ 200,00 |    R$ 140,00 |
| 4º        |           3.500 |          35.000 |      R$ 350,00 |    R$ 245,00 |

Nota: Projeções ajustadas para pay-per-use; receita cresce linearmente com uso.

2.3 Estrutura de Custos

| Item            |          Custo Mensal | Observações                                                                        |
| --------------- | --------------------: | ---------------------------------------------------------------------------------- |
| DeepSeek API    |          R$ 50-R$ 200 | Escalável com uso (pay-per-use); com 1.000 usuários (10 requests/mês cada): ~R$ 28 |
| Marketing       |         R$ 200-R$ 500 | Performance-based                                                                  |
| Infraestrutura  |           R$ 0-R$ 100 | Vercel gratuito até ~100 GB bandwidth/mês; com 1.000 usuários, monitorar uso       |
| Taxas Pagamento |           10% receita | Gateways de pagamento                                                              |
| CAC (Aquisição) | R$ 5.000-20.000 total | Para 1.000 usuários: R$ 5-20/usuário (redes sociais, anúncios pagos, SEO)          |

Nota: Custos de API agora diretamente ligados ao uso; margem de lucro em pay-per-use.

2.4 Métricas de Sucesso

- ARPU: R$ 0.10-1.00/mês (baseado em uso médio)
- LTV/CAC Ratio > 3
- Retenção 30 dias: > 40%
- Churn Mensal < 10%
- Requests por Usuário: > 5/mês para engajamento

---

## 3. Especificações Técnicas

3.1 Stack Tecnológica

Frontend: Next.js 14 + TypeScript
Estilização: Tailwind CSS
Animações: Framer Motion
PWA: next-pwa

Note: This repository is now using ESM (`package.json` includes `type: "module"`) and the Next.js configuration is `next.config.mjs`. Build tool configs use `.mjs` for ESM (e.g., `postcss.config.mjs`, `tailwind.config.mjs`).

Note: A `.eslintrc.cjs` file remains for ESLint configuration as ESLint CLI still expects a CommonJS config file; other `.cjs` files were removed to standardize on `.mjs`.

Armazenamento: localStorage / IndexedDB (backup)

IA: DeepSeek API (modelo: deepseek-chat). Custo aproximado R$ 0,02 por requisição (verificar). Usa prompts de sistema para definir personalidade do treinador, cache de contexto para dados estáticos (perfil do usuário) e resumos para histórico dinâmico, permitindo personalização para múltiplos usuários sem sobrecarga de tokens.

Pagamentos: Mercado Pago, Stripe (Pix, Cartão)

3.2 Arquitetura do Sistema

```
fitai-coach/
├── components/
│   ├── assessment/
│   ├── workout/
│   ├── premium/
│   └── ui/
├── lib/
│   ├── ai/              # Integrações IA com prompts, cache e resumos
│   ├── auth/
│   ├── payment/
│   └── storage/         # Gerenciamento de estado usuário (estáticos/dinâmicos)
├── pages/ or src/app/
│   ├── assessment/
│   ├── dashboard/
│   └── workout/
└── public/
    ├── icons/
    └── manifest.json
```

3.3 Sistema de Identificação

DeviceIdentity:

```ts
interface DeviceIdentity {
  deviceId: string;
  backupIds: string[];
  creationDate: Date;
  lastSeen: Date;
  usagePattern: UsageData;
}

interface UsageData {
  totalSessions: number;
  adsWatched: number;
  premiumAccess: boolean;
  lastActivities: Activity[];
}
```

3.4 Sistema Anti-Fraude

```ts
interface FraudDetection {
  deviceFingerprinting: boolean;
  usagePatternAnalysis: boolean;
  licenseValidation: boolean;
  rateLimiting: boolean;
  suspiciousActivityFlags: string[];
  inputSanitization: boolean; // Sanitização de inputs de texto livre para prevenir ataques via prompts
}
```

---

## 4. Fluxo do Usuário

4.1 Primeiro Acesso: Boas-vindas → Avaliação Inicial (dados básicos + campo opcional para objetivos pessoais em texto livre) → IA → Primeiro Treino → Escolha do Acesso (Anúncios vs Assinatura).

4.2 Uso Diário: App -> Treino do Dia -> Registro de Progresso -> Reavaliação Automática -> Novo Treino.

4.3 Sistema Premium: Feature bloqueada → Modal de upsell (Anúncios ou Assinatura) → Liberação.

---

## 5. Estratégia de Crescimento

5.1 Aquisição (Fases: Lançamento, Crescimento, Escala), canais e orçamento detalhados no plano.

5.2 Retenção & Engajamento: Gamification, personalization, comunidade, desafios.

Nota: O sistema de gamificação (XP, badges, achievements, streaks) foi removido do código-base em uma refatoração recente. Pontos de engajamento podem ser reimplementados com um sistema desacoplado do core — recomendamos introduzir uma camada separada de serviço/feature para isso. Consulte `src/lib/workoutSaver.ts` para integração de progresso e `src/lib/exercises` para dados de exercícios.

5.3 Métricas de Crescimento: metas por Mês 3/6/12 para usuários ativos, retenção, conversão e NPS.

---

## 6. Plano de Desenvolvimento / Sprint Plan

- Sprint 1: Setup Next.js + PWA; Identificação do dispositivo; Avaliação física básica com campo de objetivos pessoais; Integração DeepSeek com prompts de sistema e cache.
- Sprint 2: Core: Geração de treinos por IA com personalização via texto livre; Sistema de anúncios rewarded; Armazenamento local seguro com sanitização de inputs; Dashboard.
- Sprint 3: Monetização: horas premium; gateway de pagamento; upsell.
- Sprint 4: Polimento: anti-fraude, performance, testes.

  6.2 MVP: Avaliação física 5 testes + campo de objetivos pessoais, 1 treino personalizado com adaptação IA, anúncio rewarded, assinatura simples, progresso básico com resumos.

---

## 7. Análise de Riscos

7.1 Técnicos: DeepSeek instável (cache/fallback), LocalStorage limitado (backup), Fraude (validações e sanitização de inputs de texto livre), PWA performance (lazy load).

7.2 Negócio: Conversão baixa (A/B tests), Churn (Gamificação), Concorrência (diferenciação por IA).

7.3 Financeiros: Custo IA > receita (limite de requisições), Chargebacks (suporte), Flutuação CPM (diversificar redes).

---

## 8. Próximos Passos Imediatos

8.1 Ações Semana 1: Criar repositório Next.js, configurar PWA, TypeScript, Tailwind, definir testes físicos, escolher gateway.

8.2 Plano 30 dias: MVP com avaliação, IA, anúncios rewarded, horas premium, deploy e test com beta.

8.3 Métricas de Validação: Performance técnica (load <3s), negócio (CAC, retention), UX (satisfaction), etc.

---

## Resumo Executivo

FitAI Coach é um PWA de fitness que combina avaliação física inteligente com geração de treinos personalizados por IA.

Próxima Fase: Desenvolvimento do MVP em 30 dias com foco na funcionalidade core de avaliação + geração de treinos.

---

## CI / Pipeline

Incluímos um workflow de CI (GitHub Actions) em `.github/workflows/ci.yml` que roda em pushes e PRs nas branches `main` / `master`. Ele executa:
`npm run test` — roda os testes com Vitest (unitários e rotas)

### Health-check & API stubs

- Endpoint: `GET /api/health` — retorna `{status: 'ok', timestamp}`.
- Endpoint: `POST /api/deepseek` — recebe um corpo com `profile` e retorna um plano gerado por IA (stub).

### AI integration and stubs

Implementations for AI provider should go under `src/lib/ai`.
Currently `src/lib/ai/deepseek.ts` is a lightweight stub that returns a mocked workout plan. Replace the stub with a real DeepSeek API integration using prompts de sistema, cache de contexto para dados estáticos do usuário e resumos para histórico dinâmico. Inclua sanitização de inputs de texto livre do usuário para prevenir ataques via prompts. Mantenha chaves em `.env`.

Adicione outras etapas conforme necessário (linters, testes, deploy).

---

## Import Paths and Type Import Conventions

Para manter o código consistente, resistente a renomeações e evitar import paths relativos frágeis entre módulos, adotamos as seguintes convenções:

- Use `@/lib/exercises` como fonte única para tipos e utilitários relacionados ao banco de exercícios (reexportados em `src/lib/exercises/index.ts`).
- Para importações apenas de tipos, use `import type` para evitar dependências e ciclos em tempo de execução. Exemplo:
  ```ts
  import type { Exercise } from "@/lib/exercises";
  ```
- Para imports de runtime (módulos e utilitários), prefira caminhos no alias, por exemplo
  ```ts
  import { beginnerPushups } from "@/lib/exercises/variations/pushups/beginner";
  import { createPullExerciseWithGamification } from "@/lib/exercises/variations/pull/utils/gamificationUtils";
  ```
- Não utilize imports relativos ascendentes direcionando para `types` (por exemplo `../../types`, `../../../types`) — há uma regra ESLint que impede essas importações e recomenda o uso de alias.

Regras de lint aplicadas (exemplo): `no-restricted-imports` bloqueará `../**/types`, `../../**/types`, `../../../**/types` e caminhos absolutos com `/home/...`. Caso o linter reporte violações, substitua por alias com exemplos mostrados acima.

Ferramentas de verificação:

- `npm run lint` — rodar para verificar violações de imports/estilo
- `npm run build` — checar os tipos e garantir que as alterações não afetam build/treeshaking
