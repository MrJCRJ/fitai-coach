Project: fitai-coach — AI agent guide

Summary:

- This repo is a Next.js 14 PWA (Progressive Web App) fitness coaching platform with AI-powered workout generation. Key folders:
  - `src/app/`: Feature-based pages/routes (assessment, dashboard, premium, workout) using App Router
  - `src/components/`: Feature-specific components (mirrors `src/app` naming) + shared `ui/` components
  - `src/lib/`: Service layer with AI integration, workout generation, exercise database, and challenge system
  - `public/`: Static assets including PWA manifest and service worker files

  Core user flow: Assessment → Challenge Workout → Personalized Workout Generation

  Docs & quick refs:
  - `README.md` - Setup, deployment, and feature overview
  - `PROJECT_DOCUMENTATION.md` - Product vision, business model, and technical specs
  - `package.json` - Next.js 14 + TypeScript + Tailwind + Framer Motion + PWA stack
  - The repository uses ESM throughout (`next.config.mjs`, `postcss.config.mjs`, etc.)
  - CI: GitHub Actions runs TypeScript checks and production builds on pushes/PRs

What you need to know (actionable):

- **Architecture**: Feature-driven with domain separation. Each feature (`assessment`, `workout`, etc.) has corresponding folders in `src/app/` and `src/components/`
- **Data Flow**: Assessment answers + Challenge results → AI-powered workout generation → localStorage persistence
- **Challenge System**: Real fitness assessment via 3-exercise challenge (push-ups, plank, squats) with performance tracking and difficulty rating
- **AI Integration**: DeepSeek API for workout generation (live implementation, not mocked - requires DEEPSEEK_API_KEY)
- **PWA Setup**: Fully implemented with `next-pwa` - service workers generated to `public/` on build, disabled in dev
- **Client Components**: Any component using `framer-motion` must be `'use client'` (animations require client-side rendering)
- **State Management**: localStorage-based persistence with utility functions in `src/lib/` (no global state library)
- **Language**: Portuguese UI with English code comments

Routing & pages:

- App Router structure: `src/app/[feature]/page.tsx` for each route
- API routes: `src/app/api/[service]/route.ts` (e.g., `src/app/api/deepseek/route.ts`)
- Feature components: `src/components/[feature]/` (e.g., `src/components/workout/Timer.tsx`)

Dev workflows & checks:

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build (includes PWA service worker generation)
- `npm run start` - Production server (test PWA functionality here)
- `npm run test` - Vitest unit tests (run tests for AI integration and API routes)
- `npm run test:deepseek` - Test DeepSeek API integration specifically
- `npm run estimate-cost` - Custom script calculating per-user monthly costs
- `npm run lint` - ESLint with Prettier (auto-fix enabled)
- `npm run setup` - Initial project setup (runs bootstrap script)
- Pre-commit hooks: Husky + lint-staged for code quality
- PWA testing: Build locally and serve with `npm run start` to test installability

Conventions & patterns:

- **Feature Boundaries**: Keep features self-contained - mirror `src/app` and `src/components` folder structure
- **Component Naming**: PascalCase React components, camelCase utilities
- **Client/Server Separation**: Server logic (API calls, data processing) in `src/lib/`, UI logic in `src/components/`
- **Animation Pattern**: `'use client'` + `framer-motion` imports for animated components
- **Data Persistence**: localStorage utilities with error handling (check `typeof window !== "undefined"`)
- **Exercise Database**: Structured by muscle groups and difficulty levels in `src/lib/exercises/` (modular files per muscle group, with `src/lib/exercises/index.ts` as the main exporter)
- **Workout Generation**: Assessment + Challenge results determine fitness level, then filter exercises by goal/muscle group
- **Challenge Assessment**: Performance-based leveling (push-up/plank/squat scores) overrides self-reported fitness level

Integration points:

- **AI Service**: `src/lib/ai/deepseek.ts` - Live DeepSeek API integration (requires API key in `.env.local`)
- **Payment**: Planned integration (Stripe/Mercado Pago) in `src/lib/payment/` (not yet implemented)
- **Auth**: Planned user authentication in `src/lib/auth/` (not yet implemented)
- **PWA**: `next-pwa` configuration in `next.config.mjs` with service worker generation to `public/`

How to implement features:

- **New Assessment Questions**: Add to `assessmentQuestions` array in `src/app/assessment/page.tsx`
- **New Exercises**: Add to the appropriate file under `src/lib/exercises/` (e.g., `src/lib/exercises/chestExercises.ts`) and export it from `src/lib/exercises/index.ts` with proper muscle group/difficulty
- **New Workout Goals**: Create new goal logic in AI integration (`src/lib/ai/deepseek.ts`)
- **Challenge Exercises**: Modify `defaultChallengeWorkout` in `src/lib/challengeWorkout.ts`
- **UI Components**: Add to `src/components/ui/` for shared components, feature-specific in `src/components/[feature]/`
- **API Routes**: Create `src/app/api/[endpoint]/route.ts` for new backend endpoints

Examples from codebase:

- **Assessment Flow**: `src/app/assessment/page.tsx` - Multi-step form with progress tracking and localStorage persistence
- **Challenge Modal**: `src/components/ChallengeWorkoutModal.tsx` - Real-time exercise timing with difficulty rating
- **Workout Display**: `src/app/workout/page.tsx` - Shows monthly AI-generated workout plans
- **Dashboard Logic**: `src/app/dashboard/page.tsx` - State-driven UI showing assessment → challenge → workout progression
- **Exercise Filtering**: Goal-based exercise selection handled by AI in `src/lib/ai/deepseek.ts`
- **Level Calculation**: `calculateLevelFromChallenge()` in `src/lib/challengeWorkout.ts` - Performance-based leveling

Common patterns to follow:

- **Error Handling**: Check localStorage availability with `typeof window !== "undefined"`
- **Loading States**: Use React `useState` for async operations and loading UI
- **Responsive Design**: Mobile-first with Tailwind responsive classes
- **Animation**: `motion.div` from framer-motion with `initial`/`animate` props
- **Data Validation**: TypeScript interfaces for all data structures (see `src/lib/ai/types.ts`)
- **Component Props**: Destructure props in function parameters for cleaner code
- **API Error Handling**: DeepSeek API calls include proper error handling and JSON parsing
- **Environment Variables**: Use `.env.local` for API keys (DeepSeek), check for existence before API calls

Final notes:

- **User Flow Priority**: Assessment → Challenge → Workout is the core conversion funnel
- **Performance Focus**: Challenge system provides real fitness data vs self-reported
- **Scalability**: Exercise database designed for easy expansion by muscle group/difficulty
- **Business Model**: Hybrid freemium (ads) + premium (subscription) architecture
- **Testing**: Vitest for unit tests, focus on workout generation logic and challenge calculations
- **Deployment**: Vercel-optimized with PWA support for mobile app-like experience
- **API Keys**: DeepSeek integration requires `DEEPSEEK_API_KEY` in `.env.local` for real functionality

If something is unclear:

- Check `PROJECT_DOCUMENTATION.md` for business context and product vision
- Review `src/lib/workoutGenerator.ts` for core business logic
- Test PWA functionality by building and serving locally (`npm run build && npm run start`)
- For new features, start by understanding the assessment → challenge → workout data flow
- Check existing tests in `*.test.ts` files for testing patterns
