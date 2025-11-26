#!/bin/bash

# Script para verificar se tudo está pronto para Play Store

echo "🔍 Verificando preparação para Play Store..."
echo "=========================================="

# Verificar se Capacitor está instalado
if ! npx cap --version &> /dev/null; then
    echo "❌ Capacitor não instalado"
    echo "Execute: npm install @capacitor/core @capacitor/cli @capacitor/android"
    exit 1
else
    echo "✅ Capacitor instalado"
fi

# Verificar se Android foi adicionado
if [ ! -d "android" ]; then
    echo "❌ Plataforma Android não adicionada"
    echo "Execute: npx cap add android"
    exit 1
else
    echo "✅ Plataforma Android configurada"
fi

# Verificar build do Next.js
if [ ! -d ".next" ]; then
    echo "❌ Build do Next.js não encontrado"
    echo "Execute: npm run build"
    exit 1
else
    echo "✅ Build do Next.js encontrado"
fi

# Verificar política de privacidade
if [ ! -f "src/app/privacy/page.tsx" ]; then
    echo "❌ Página de política de privacidade não encontrada"
    exit 1
else
    echo "✅ Política de privacidade criada"
fi

# Verificar capacitor.config.ts
if [ ! -f "capacitor.config.ts" ]; then
    echo "❌ capacitor.config.ts não encontrado"
    exit 1
else
    echo "✅ Capacitor configurado"
fi

# Verificar keystore (opcional)
if [ ! -f "fitai-coach.keystore" ]; then
    echo "⚠️  Keystore não encontrado (será criado no Android Studio)"
    echo "Para criar manualmente:"
    echo "keytool -genkey -v -keystore fitai-coach.keystore -alias fitai-coach -keyalg RSA -keysize 2048 -validity 10000"
else
    echo "✅ Keystore encontrado"
fi

# Verificar screenshots
if [ ! -d "screenshots" ] || [ -z "$(ls -A screenshots 2>/dev/null)" ]; then
    echo "⚠️  Screenshots não encontrados"
    echo "Execute: ./scripts/generate-screenshots.sh"
else
    echo "✅ Screenshots encontrados ($(ls screenshots/*.png 2>/dev/null | wc -l) arquivos)"
fi

echo ""
echo "🎯 Status da preparação:"
echo "======================"

# Verificar conta Play Console (não podemos verificar automaticamente)
echo "🔸 Conta Play Console: Verifique manualmente em https://play.google.com/console/"
echo "🔸 AdMob configurado: Verifique IDs em .env.local"

echo ""
echo "🚀 Próximos passos:"
echo "=================="
echo "1. Aguarde aprovação da conta Play Console"
echo "2. Execute: ./scripts/generate-screenshots.sh"
echo "3. Execute: ./scripts/build-android.sh"
echo "4. Abra: npx cap open android"
echo "5. No Android Studio: Build > Generate Signed Bundle/APK"
echo "6. Upload do .aab na Play Console"

echo ""
echo "📱 Informações do app:"
echo "======================"
echo "Nome: FitAI Coach"
echo "Package ID: com.fitai.coach"
echo "Política de Privacidade: https://fitai-coach.vercel.app/privacy"
echo "Preço: Gratuito"