#!/usr/bin/env bash
# Bootstrap script to initialize the FitAI Coach Next.js app
# - Installs dependencies for Next.js, TypeScript, Tailwind, and PWA.
# - Initializes Tailwind and TypeScript config files (non-destructive)

set -euo pipefail

echo "Bootstrap: Installing core dependencies..."

npm install --save next@^14.0.0 react@^18.2.0 react-dom@^18.2.0 framer-motion@^12.23.24 next-pwa@^5.6.0
npm install --save-dev typescript tailwindcss postcss autoprefixer @types/react @types/node @types/react-dom

if [ ! -f tailwind.config.mjs ]; then
  echo "Initializing Tailwind config..."
  # generate a tailwind config as ESM
  npx tailwindcss init -p --config tailwind.config.mjs
fi

if [ ! -f postcss.config.mjs ]; then
  echo "Creating postcss.config.mjs..."
  cat > postcss.config.mjs <<'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
EOF
fi

if [ ! -f tsconfig.json ]; then
  echo "Initializing TypeScript config..."
  npx tsc --init --skipLibCheck
fi

echo "Bootstrap: Done. Next steps:"
echo "  - Add `pages` or `src/app` pages and components as needed."
  echo "  - Add `postcss.config.mjs` and Tailwind setup in your CSS (Import Tailwind base/components/utilities)."
echo "  - Run 'npm run dev' to start the dev server."

exit 0
