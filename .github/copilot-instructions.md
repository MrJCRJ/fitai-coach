Project: fitai-coach — AI agent guide

Summary:

- This repo is a Next.js 14 PWA (Progressive Web App) fitness coaching platform with detailed workout tracking and progressive exercise system. Key folders:
  - `src/app/`: Feature-based pages/routes (dashboard, workout, privacy) using App Router
  - `src/components/`: Feature-specific components (mirrors `src/app` naming) + shared `ui/` components
  - `src/lib/`: Service layer with detailed workout tracking, exercise database, and data persistence
  - `src/hooks/`: Custom React hooks for data management and localStorage integration
  - `public/`: Static assets including PWA manifest and service worker files

  Core user flow: Dashboard Overview → Progressive Workout Sessions → Detailed Progress Tracking

  Docs & quick refs:
  - `README.md` - Setup, deployment, and feature overview
  - `PROJECT_DOCUMENTATION.md` - Product vision, business model, and technical specs
  - `package.json` - Next.js 14 + TypeScript + Tailwind + Framer Motion + PWA stack
  - The repository uses ESM throughout (`next.config.mjs`, `postcss.config.mjs`, etc.)
  - CI: GitHub Actions runs TypeScript checks and production builds on pushes/PRs

What you need to know (actionable):

- **Architecture**: Feature-driven with domain separation. Each feature (`dashboard`, `workout`, etc.) has corresponding folders in `src/app/` and `src/components/`
- **Data Flow**: Workout sessions with detailed set tracking → localStorage persistence → Dashboard analytics and progression calculation
- **Progression System**: Calisthenics-based exercise variations (12 levels) with automatic level calculation based on total completed sets
- **Exercise Database**: Modular organization by muscle groups with progression levels (beginner→extreme) and detailed metadata including gamification
- **PWA Setup**: Fully implemented with `next-pwa` - service workers generated to `public/` on build, disabled in dev. Capacitor config for mobile app deployment
- **ESM Configuration**: All config files use `.mjs` extension (next.config.mjs, postcss.config.mjs, tailwind.config.mjs)
- **Client Components**: Any component using `framer-motion` must be `'use client'` (animations require client-side rendering)
- **State Management**: localStorage-based persistence with custom hooks in `src/hooks/` (no global state library)
- **Exercise Database**: Modular files in `src/lib/exercises/` per muscle group, aggregated in `index.ts`. New structure: `variations/pushups/` split by difficulty (beginner.ts, intermediate.ts, advanced.ts, extreme.ts)
- **Workout Tracking**: Detailed session management with `WorkoutSaver` class tracking sets, reps, timing, rest periods, and perceived difficulty
- **Progression Logic**: Level calculation based on cumulative sets completed (10→25→50→100→200→400→800→1600→3200→6400→12800→12800+ sets)
- **Gamification System**: Achievement-based rewards, XP system, badges, and streaks with modular utilities in `src/lib/exercises/`
- **Language**: Portuguese UI with English code comments

Routing & pages:

- App Router structure: `src/app/[feature]/page.tsx` for each route
- Feature components: `src/components/[feature]/` (e.g., `src/components/dashboard/StatsSection.tsx`)
- Shared UI components: `src/components/ui/` (Button, Card, Input, etc.)

Dev workflows & checks:

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build (includes PWA service worker generation)
- `npm run start` - Production server (test PWA functionality here)
- `npm run test` - Vitest unit tests (run tests for utilities and data transformations) - currently no tests implemented
- `npm run lint` - ESLint with Prettier (auto-fix enabled)
- `npm run setup` - Initial project setup (runs bootstrap script)
- Pre-commit hooks: Husky + lint-staged for code quality
- PWA testing: Build locally and serve with `npm run start` to test installability
- Mobile testing: Capacitor setup for Android/iOS deployment

Conventions & patterns:

- **Feature Boundaries**: Keep features self-contained - mirror `src/app` and `src/components` folder structure
- **Component Naming**: PascalCase React components, camelCase utilities
- **Client/Server Separation**: UI logic in `src/components/`, data logic in `src/lib/`, state logic in `src/hooks/`
- **Animation Pattern**: `'use client'` + `motion.div` from framer-motion with `initial`/`animate` props
- **Data Persistence**: localStorage utilities with error handling (check `typeof window !== "undefined"`)
- **Exercise Database**: Modular files in `src/lib/exercises/` per muscle group, aggregated in `index.ts`. Push-ups now split by difficulty in `variations/pushups/`
- **Workout Tracking**: Detailed session management with `WorkoutSaver` class tracking sets, reps, timing, and rest periods
- **Progression Logic**: Level calculation based on cumulative sets completed (10→25→50→100→200→400→800→1600→3200→6400→12800→12800+ sets)
- **Gamification**: Achievement system with modular utilities (`achievementUtils.ts`, `levelUtils.ts`, `streakUtils.ts`)
- **Custom Hooks**: Extract complex component logic into custom hooks (`useWorkout*`) and utility functions (`*Utils.ts`, `*Helpers.ts`)
- **Testing Pattern**: Vitest with descriptive test names, focus on utility functions and data transformations (no tests currently implemented)
- **Input Sanitization**: Use `sanitizeInput()` from `src/lib/utils.ts` for user-generated text content
- **Error Handling**: Check localStorage availability with `typeof window !== "undefined"`
- **Loading States**: Use React `useState` for async operations and loading UI
- **Responsive Design**: Mobile-first with Tailwind responsive classes

Integration points:

- **AI Service**: Planned DeepSeek API integration in `src/lib/ai/` (not yet implemented)
- **Payment**: Planned integration (Stripe/Mercado Pago) in `src/lib/payment/` (not yet implemented)
- **Auth**: Planned user authentication in `src/lib/auth/` (not yet implemented)
- **PWA**: `next-pwa` configuration in `next.config.mjs` with service worker generation to `public/`
- **Mobile**: Capacitor configuration in `capacitor.config.ts` for Android/iOS app deployment
- **AdMob**: Rewarded ads for freemium model (optional, with simulation fallback)

How to implement features:

- **New Exercises**: Add to appropriate muscle group file in `src/lib/exercises/` (e.g., `variations/pushups/beginner.ts`) and export from `index.ts`
- **New Muscle Groups**: Create new file in `src/lib/exercises/`, add to `index.ts`, update `MuscleGroup` type
- **Progression Levels**: Add new variation to exercise files with level-based logic and gamification data
- **Workout Features**: Add to `src/components/workout/` and integrate with `WorkoutSaver` for tracking
- **Dashboard Metrics**: Add calculations to `dashboardUtils.ts` and display components to `dashboard/`
- **UI Components**: Add to `src/components/ui/` for shared, feature-specific in `src/components/[feature]/`
- **Custom Hooks**: Create in `src/hooks/` for complex state logic with localStorage integration
- **Utility Functions**: Create pure functions in `src/lib/` for reusable calculations and mappings
- **Gamification**: Add achievements to `achievements.ts`, badges to gamification folders, update `gamificationUtils.ts`
- **New Tests**: Add `.test.ts` files alongside implementation files, use Vitest describe/it/expect pattern

Examples from codebase:

- **Dashboard Flow**: `src/app/dashboard/page.tsx` - Analytics dashboard with workout history and stats
- **Workout Session**: `src/app/workout/page.tsx` - Real-time workout tracking with muscle group tabs and progression (refactored with custom hooks)
- **Exercise Carousel**: `src/components/workout/ExerciseCarousel.tsx` - Level-based exercise selection with timer integration
- **Progress Tracking**: `src/lib/workoutSaver.ts` - Detailed session management with set-by-set tracking
- **Data Hooks**: `src/hooks/useDashboardData.ts` - localStorage integration for workout session persistence
- **Exercise Database**: `src/lib/exercises/variations/pushups/beginner.ts` - Modular exercise organization with gamification
- **Stats Calculation**: `src/lib/dashboardUtils.ts` - Analytics from detailed workout data
- **Custom Hooks**: `src/hooks/useWorkoutLevels.ts`, `src/hooks/useWorkoutTimers.ts`, `src/hooks/useWorkoutSession.ts` - Modular state management for workout features
- **Gamification System**: `src/lib/gamification.ts` - Achievement and XP management system
- **Utility Functions**: `src/lib/workoutLevelUtils.ts`, `src/lib/workoutHelpers.ts` - Pure functions for calculations and mappings

Common patterns to follow:

- **Error Handling**: Check localStorage availability with `typeof window !== "undefined"`
- **Loading States**: Use React `useState` for async operations and loading UI
- **Responsive Design**: Mobile-first with Tailwind responsive classes
- **Animation**: `motion.div` from framer-motion with `initial`/`animate` props
- **Data Validation**: TypeScript interfaces for all data structures (see `src/lib/workoutTypes.ts`)
- **Component Props**: Destructure props in function parameters for cleaner code
- **Hook Patterns**: Custom hooks in `src/hooks/` for localStorage state management
- **Environment Variables**: Use `.env.local` for API keys, check existence before API calls
- **Input Validation**: Sanitize user inputs with `sanitizeInput()` to prevent injection attacks
- **Workout Flow**: Start session → Track sets with timing → Save detailed data → Update progression
- **Gamification Flow**: Check achievements after exercise completion → Update XP and badges → Display rewards
- **Exercise Structure**: Each exercise includes metadata (calories, equipment, instructions), gamification data (XP, badges), and progression requirements

Final notes:

- **User Flow Priority**: Dashboard insights → Progressive workouts → Detailed analytics is the core engagement loop
- **Performance Focus**: Detailed tracking provides accurate progression vs generic plans
- **Scalability**: Modular exercise database designed for easy expansion by muscle group/difficulty
- **Business Model**: Hybrid freemium (ads) + premium (subscription) architecture
- **Testing**: Vitest setup ready, focus on data transformations and progression calculations (no tests implemented yet)
- **Deployment**: Vercel-optimized with PWA support for mobile app-like experience
- **Data Structure**: `DetailedWorkoutSession` with nested `DetailedExercise` and `DetailedSet` for comprehensive tracking
- **Progression**: Automatic level advancement based on cumulative sets (push-up/plank/squat variations)
- **Gamification**: Achievement system with XP, badges, streaks, and unlockable content
- **Refactoring Pattern**: Extract complex component logic into custom hooks (`useWorkout*`) and utility functions (`*Utils.ts`, `*Helpers.ts`)

If something is unclear:

- Check `PROJECT_DOCUMENTATION.md` for business context and product vision
- Review `src/lib/workoutSaver.ts` for detailed workout tracking implementation
- Test workout flow by running `npm run dev` and navigating to `/workout`
- For new features, start by understanding the dashboard → workout → progress data flow
- Check existing utilities in `src/lib/exercises/` for gamification patterns
- Review `src/lib/exercises/variations/pushups/` for the new modular exercise structure
- Check `src/hooks/` for state management patterns
