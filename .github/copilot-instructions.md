Project: fitai-coach — AI agent guide

Summary:

- This repo is a Next.js app (app-router layout) organized by feature domains. Key folders:
  - `src/app/`: pages/route handlers (top-level features: `assessment`, `dashboard`, `premium`, `workout`).
  - `src/components/`: UI and domain components (mirrors `src/app` naming for features). Shared UI pieces live in `src/components/ui`.
  - `src/lib/`: service wrappers (AI, auth, payment, storage). Keep server-only logic here.
  - `public/`: static assets.

  Docs & quick refs:
  - `README.md` - developer quick start (install, setup, dev, build, cost-estimator)
  - `PROJECT_DOCUMENTATION.md` - product vision, specs, strategy and sprint plan (main project document)
  - The repository now includes helper scripts and a minimal ESM migration:
    - `npm run estimate-cost` — runs a simple cost estimator to compute per-user monthly cost with environment-variable overrides.
  - The repo includes a minimal app skeleton and starter files (ESM-ready):
    - `src/app/layout.tsx` and `src/app/page.tsx` — minimal App Router skeleton
    - `src/styles/globals.css` — tailwind CSS entry
  - `postcss.config.mjs`, `tailwind.config.mjs` — PostCSS and Tailwind configuration (ESM versions used by the project)
  - Note: A single CJS config remains for tooling compatibility: `.eslintrc.cjs` (ESLint). Other `.cjs` configs were deprecated and removed to standardize on `.mjs`.
    - `scripts/init-bootstrap.sh` — bootstrap helper (run `npm run setup`)
    - `scripts/estimate-cost.js` — per-user cost estimator (run `npm run estimate-cost`)
    - `.env.example` — example environment variables for AI & payment providers
    - CI: The repo includes a GitHub Actions workflow at `.github/workflows/ci.yml` which runs `npx tsc --noEmit` and `npm run build` on pushes and PRs.

What you need to know (actionable):

- Start by reading `package.json` and `src/lib/*` if present — they show integrations and essential services.
- This project uses `framer-motion` and `next-pwa` in `package.json`. Any component using `framer-motion` must be a client component (`'use client'` at the top).
- Put shared, pure UI components in `src/components/ui`. Put feature-specific components in `src/components/<feature>` to keep a predictable import path pattern (e.g., `src/components/workout/Timer.tsx`).
- Keep API/service wrappers in `src/lib` and avoid import cycles. Prefer a single exported client for each integration (e.g., `src/lib/ai/client.ts`, `src/lib/payment/provider.ts`).
- State & side effects:
  - Server-only logic, long-running or secret-key usages (AI, payment, auth) belong in `src/lib` and server-side contexts (fetches inside the app server or API routes).
  - Client-side UI, effects, event handlers, and animation belong in `src/components` under `use client` components.

Routing & pages:

- Use the app router pattern: add a folder under `src/app/<feature>`, export default component named `page` (e.g., `src/app/workout/page.tsx`) when adding a new route.
- For API routes put server handlers under `src/app/api/*` (for the app router) or `pages/api` when using pages router. Verify which router is active before choosing.

Dev workflows & checks an agent should run:

- Check `package.json` for `scripts`. If missing, verify project's package manager and confirm dev/run/build conventions before adding scripts. Common defaults:
  - `npm run dev` (start dev server)
  - `npm run build && npm run start` (production)
  - This repo provides helper scripts:
  - `npm run setup` — installs Next.js, TypeScript, Tailwind, and PWA toolchain and initializes config files.
  - `npm run dev`, `npm run build`, `npm run start` — standard Next commands.
  - `npm run test` — run unit tests with Vitest
    - `npm run estimate-cost` — runs a simple cost estimator to compute per-user monthly cost with environment-variable overrides.
- If tests or linters appear later, run them and add/adjust as needed. Do not introduce new global tooling without noting it in a PR description.

Conventions & patterns to follow when changing code:

- Keep features self-contained: mirror `src/app` and `src/components` naming and folders.
- Server and client separation: avoid importing directly from server-only modules into client-side components.
- Small utilities: place pure helpers in `src/lib/utils` or add `index.ts` barrel exports in each feature folder.
- Animation & UI: prefer `framer-motion` only in `use client` components. Example:
  - `src/components/workout/AnimatedButton.tsx` should start with `'use client'` and import `motion` from `framer-motion`.

Integration points and external dependencies:

- Payment: `src/lib/payment` likely holds wrappers to payment provider (e.g., Stripe). Check for API keys in environment variables before adding or using secrets.
- AI: `src/lib/ai` is the place for model wrappers. Keep API keys and tokens in environment variables, and do not commit them.
- Auth: `src/lib/auth` will handle session checks and tokens.

How to propose/implement larger changes (notes for agents):

- For any change that adds or changes server-side integrations (AI, payment, auth), update `src/lib/<integration>` in a single place, add or update environment variable documentation, and add server-side tests/mocks.
- When adding UI elements, mirror naming patterns and place styles in `src/components/<feature>/styles` or central `styles/` if shared.
- If you add PWA behavior or service-worker configs, update `next.config.mjs` (use `next.config.cjs` if you prefer CommonJS) and `next-pwa` settings, then verify production `build` & `start` commands work locally.

Examples to reference:

- Feature page: `src/app/workout` (route) ↔ `src/components/workout` (UI). If you add a new page `src/app/assessment`, create `src/components/assessment` for UI building blocks.
- Shared UI: `src/components/ui` for Buttons, Input, Layout wrappers.

If something is unclear:

- Confirm the chosen router (app or pages) and targeted environment (Next.js vX). If `package.json` lacks scripts or `next` dependency, ask maintainers before assuming commands.

Final note:

- This repo is scaffolded with domain-first layout. Prioritize changes that respect feature boundaries (`src/app` + `src/components`) and central service wrappers (`src/lib`). Keep PRs focused — refactors that span many files should be broken into small steps.

If anything above is missing or seems inconsistent with the current project, ask a clarification question before making structural changes.

Next.js MVP config (PWA + app router):

- The project uses `next-pwa` and is intended to run with the `appDir` enabled in Next.js. Add a `next.config.mjs` in the repo root if not present. Example MVP config (place the file at repo root):
  - The project uses `next-pwa` and is intended to run with the `appDir` enabled in Next.js. This repository now uses ESM `next.config.mjs` as the Next.js config; if converting back to CommonJS, prefer `next.config.cjs`. Example MVP config (ESM, add to `next.config.mjs`):

```javascript
/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withPWA(nextConfig);
```

- Notes on the snippet above:
  - `appDir: true` enables the app router. Keep this if the code uses `src/app/*` routes.
  - `typescript.ignoreBuildErrors: false` enforces that `next build` fails with type errors — keep it to maintain type safety.
  - `next-pwa` will generate service worker assets into `public/`. `disable` is true during development to avoid PWA caching during local development.
  - Ensure `next` (Next.js) is present as a dependency in `package.json`. If missing, add an explicit Next.js dependency and standard `scripts`:
    - `dev`: `next dev`
    - `build`: `next build`
    - `start`: `next start`

If you add PWA behavior or service-worker configs, follow the `next-pwa` docs and test production builds locally (`npm run build && npm run start`) because `next-pwa` behavior depends on a production build.
