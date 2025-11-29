import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        Event: "readonly",
        Blob: "readonly",
        FileReader: "readonly",
        URL: "readonly",
        confirm: "readonly",
        HTMLInputElement: "readonly",
        React: "readonly",
        NodeJS: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react: react,
      "react-hooks": reactHooks,
      prettier: prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // Next.js não precisa
      // Bloqueia importações relativas diretas para arquivos 'types' - obrigue a usar alias '@/lib/exercises'
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "/home/*/Documentos/**",
              message:
                "Não use caminhos absolutos no repositório; use alias '@/lib/exercises' quando aplicável",
            },
          ],
          patterns: [
            "../**/types",
            "../../**/types",
            "../../../**/types",
            "**/src/lib/exercises/types",
            "**/src/lib/exercises/**/types",
          ],
        },
      ],
      // Bloqueia caminhos absolutos de arquivos do usuário (evita hard-coded system paths) — use a rule patterns acima
      // Adicionar regras Next.js específicas se necessário
    },
  },
];
