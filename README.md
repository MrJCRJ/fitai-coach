# FitAI Coach — Developer README

Quick start:

1. Install dependencies

```bash
npm install
```

2. Bootstrap project (installs framework and toolchain, sets up TypeScript & Tailwind)

```bash
npm run setup
```

3. Run development server

```bash
npm run dev
```

4. To create a production build

```bash
npm run build && npm run start
```

5. Run tests

```bash
npm run test
```

6. Health check & AI endpoint examples

GET `/api/health` — simple health check (JSON)
POST `/api/deepseek` — stubbed AI planner (accepts JSON body `{profile}`)

Notes:
- This repo uses Next.js app router, Tailwind and `next-pwa`.
- The project is now fully ESM: Next's config is `next.config.mjs`. Build tool configs use `.mjs` for ESM (e.g., `postcss.config.mjs`, `tailwind.config.mjs`).
- ESLint uses flat config in `eslint.config.mjs` (ESM) with plugins for TypeScript, React, and Prettier.
- Pre-commit hooks (Husky + lint-staged) run linting and formatting on staged files.

