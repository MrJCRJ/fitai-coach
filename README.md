# FitAI Coach

Personal trainer inteligente que evolui com você - Uma aplicação PWA moderna para acompanhamento fitness.

## 🚀 Deploy

A aplicação está disponível em produção:
**https://fitai-coach-6kk6pd0pk-jose-ciceros-projects.vercel.app**

## 📱 Como Instalar no Celular

### Android (Chrome)
1. Abra o link da aplicação no Chrome
2. Toque no menu (⋮) no canto superior direito
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação

### iOS (Safari)
1. Abra o link da aplicação no Safari
2. Toque no botão de compartilhamento (□)
3. Role para baixo e selecione "Adicionar à Tela de Início"
4. Toque em "Adicionar" no canto superior direito

### Verificação da Instalação
- O app aparecerá na tela inicial como um ícone nativo
- Pode ser aberto offline (funcionalidades básicas)
- Não mostra barra de endereço do navegador

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

# Execute o setup inicial
npm run setup

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run test` - Executar testes
- `npm run estimate-cost` - Estimativa de custos

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