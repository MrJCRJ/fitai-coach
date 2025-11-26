#!/bin/bash

# Script para deploy no Vercel - Solução para problemas do AdMob
echo "🚀 Iniciando deploy do FitAI Coach no Vercel..."

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não encontrado. Instale com: npm i -g vercel"
    exit 1
fi

# Verificar se está logado no Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Você não está logado no Vercel. Execute: vercel login"
    exit 1
fi

# Configurar variáveis de ambiente para produção
echo "📝 Configurando variáveis de ambiente para produção..."
vercel env add NEXT_PUBLIC_ADMOB_PUBLISHER_ID
vercel env add NEXT_PUBLIC_ADMOB_AD_UNIT_ID
vercel env add DEEPSEEK_API_KEY

# Fazer deploy
echo "🚀 Fazendo deploy..."
vercel --prod

echo "✅ Deploy concluído!"
echo ""
echo "📱 Seu app agora está disponível em um domínio HTTPS válido"
echo "🔧 Isso deve resolver os problemas de limitação do AdMob"
echo ""
echo "📋 Próximos passos:"
echo "1. Atualize a URL do site no AdMob: https://fitai-coach.vercel.app"
echo "2. Configure os detalhes de pagamento no AdMob"
echo "3. Aguarde a verificação da conta (pode levar alguns dias)"