## Import Alias Guidelines — FitAI Coach

This short guide explains the import alias conventions used in FitAI Coach and how to follow them.

## Overview

- Use the `@/*` path mapping configured in `tsconfig.json`.
- Prefer `@/lib/exercises` to import types and main utilities for exercises (these are re-exported through `src/lib/exercises/index.ts`).
- For runtime imports in the variations directories, use `@/lib/exercises/variations/<group>/<file>`.
- For type-only imports, use `import type { Foo } from "@/lib/exercises";`.

## Rationale

This keeps imports consistent, avoids deep relative paths, prevents accidental coupling to file system structure, reduces the risk of import cycles (with type-only imports), and improves maintainability.

## Examples

Type-only imports (preferred):

```ts
import type { Exercise } from "@/lib/exercises";
```

Runtime imports (modules & utils):

```ts
import { beginnerPushups } from "@/lib/exercises/variations/pushups/beginner";
import { createPullExerciseWithGamification } from "@/lib/exercises/variations/pull/utils/gamificationUtils";
```

Do not do this (examples of discouraged imports):

```ts
// Discouraged
import { Exercise } from "../../types";
// Don't use hard-coded absolute path — use the alias instead
import { SomeUtil } from "@/lib/exercises/gamificationUtils";
```

## Linting & Enforcement

We enforce rules with ESLint using `no-restricted-imports` to block relative parent imports to `types` files and hard-coded absolute file paths. If you see an ESLint error related to restricted imports, replace the import with the alias `@/lib/exercises`.

## Commands

```bash
# Fix lintable issues automatically
npm run lint -- --fix

# Check all lint rules (no warnings allowed)
npm run lint

# Build to check types
npm run build
```

If you need to add a new export to `src/lib/exercises/index.ts`, add it there so other modules can use the alias in a single centralized import point.
