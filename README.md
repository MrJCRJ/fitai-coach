# FitAI Coach

Personal trainer inteligente que evolui com você - Uma aplicação PWA moderna para acompanhamento fitness.

## 🚀 Acesse Agora

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://fitai-coach-faaa1a6mo-jose-ciceros-projects.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/MrJCRJ/fitai-coach)

**🌐 URL de Produção**: https://fitai-coach-faaa1a6mo-jose-ciceros-projects.vercel.app

## 📱 Instalação Rápida no Celular

### ⚡ Método Mais Fácil

1. **Abra o link** no seu celular: [fitai-coach.vercel.app](https://fitai-coach-faaa1a6mo-jose-ciceros-projects.vercel.app)
2. **Toque em "Instalar App"** (se aparecer) OU siga as instruções abaixo

### 📲 Android (Chrome/Edge)

1. Abra o link no navegador
2. Toque no menu (⋮) → **"Adicionar à tela inicial"**
3. Confirme: **"Adicionar"**

### 🍎 iOS (Safari)

1. Abra o link no Safari
2. Toque no botão compartilhar (□) → **"Adicionar à Tela de Início"**
3. Toque em **"Adicionar"**

### ✅ Como Saber se Instalou Corretamente

- ✅ Ícone aparece na tela inicial
- ✅ Abre como app nativo (sem barra de endereço)
- ✅ Funciona offline

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MrJCRJ/fitai-coach.git
cd fitai-coach

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua chave da API DeepSeek

# Execute o setup inicial
npm run setup

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração da API DeepSeek

1. **Obtenha uma chave da API** em [DeepSeek Platform](https://platform.deepseek.com/)
2. **Configure no arquivo `.env.local`**:
   ```env
   DEEPSEEK_API_KEY=sua_chave_aqui
   ```
3. **A aplicação detectará automaticamente** e começará a usar a IA real em vez de dados mockados

### Configuração do AdMob (Opcional)

Para ativar anúncios rewarded reais:

1. **Crie uma conta** no [Google AdMob](https://admob.google.com/)
2. **Configure um app web** e obtenha seu Publisher ID
3. **Crie um bloco de anúncios rewarded** com as seguintes configurações:
   - **Nome**: `FitAI_Workout_Reward`
   - **Formato**: Premiado (Rewarded)
   - **Valor do prêmio**: 1
   - **Item do prêmio**: "Treino Gratuito"
   - **Tipo**: Vídeo
   - **Conjuntos**: Interativo
4. **Configure no arquivo `.env.local`** (valores de exemplo já incluídos):
   ```env

   ```
5. **A aplicação usará anúncios reais** em vez da simulação

> **Nota**: Sem configurar o AdMob, a aplicação funcionará normalmente com anúncios simulados para desenvolvimento.

### 🚀 Resolvendo Limitações do AdMob

Para aumentar os limites de veiculação e remover restrições do AdMob:

1. **Faça deploy em produção**:

   ```bash
   npm run deploy
   ```

2. **Configure no AdMob**:
   - URL do site: `https://fitai-coach.vercel.app`
   - Configure pagamentos para verificar conta
   - Aguarde aprovação (pode levar alguns dias)

3. **Para desenvolvimento local**: anúncios simulados são ativados automaticamente

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run test` - Executar testes
- `npm run test:deepseek` - Testar integração com API DeepSeek
- `npm run estimate-cost` - Estimativa de custos
- `npm run lint` - Verificação de código

## 🏗️ Arquitetura

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **PWA**: Next-PWA
- **Testes**: Vitest
- **Linting**: ESLint (Flat Config)

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Páginas (App Router)
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   └── [feature]/        # Componentes por funcionalidade
├── lib/                  # Utilitários e integrações
│   ├── ai/              # Integrações IA
│   └── [service]/       # Outros serviços
└── styles/              # Estilos globais

## 🏋️ Exercise Database (modular)

Exercises are now organized as modular files under `src/lib/exercises/` with one file per muscle group (e.g., `chestExercises.ts`, `legsExercises.ts`) and an index at `src/lib/exercises/index.ts` that aggregates them and exposes utility functions (getExercisesByMuscleGroup, getExerciseById, getAllExercises).

To add a new exercise:
1. Create a new file in `src/lib/exercises/` for the appropriate muscle group and export the array.
2. Update `src/lib/exercises/index.ts` to import and include the exercise array.
3. Add tests in `src/lib/exercises/` to validate the exercise is present and exported correctly.

```

## 🎯 Funcionalidades

### MVP Atual

- ✅ Interface moderna e responsiva
- ✅ Componentes reutilizáveis
- ✅ Tema dark otimizado
- ✅ PWA completo (instalável)
- ✅ API stubs para IA

### Planejado

- 🔄 Sistema de autenticação
- 🔄 Geração real de treinos
- 🔄 Dashboard de progresso
- 🔄 Acompanhamento em tempo real

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **GitHub**: [@MrJCRJ](https://github.com/MrJCRJ)
- **Projeto**: [FitAI Coach](https://github.com/MrJCRJ/fitai-coach)

---

⭐ **Dê uma estrela se gostou do projeto!**
