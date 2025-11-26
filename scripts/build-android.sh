#!/bin/bash

# Script para gerar App Bundle (.aab) para Play Store

set -e

echo "🚀 Iniciando build para Play Store..."

# 1. Build de produção do Next.js
echo "📦 Fazendo build do Next.js..."
npm run build

# 2. Export para HTML estático
echo "📤 Exportando para HTML estático..."
npx next export

# 3. Sincronizar com Capacitor
echo "🔄 Sincronizando com Capacitor..."
npx cap sync android

# 4. Abrir Android Studio (opcional)
echo "📱 Para continuar:"
echo "1. Execute: npx cap open android"
echo "2. No Android Studio:"
echo "   - Vá em Build > Generate Signed Bundle / APK"
echo "   - Selecione 'Android App Bundle'"
echo "   - Crie uma keystore se não tiver"
echo "   - Selecione build variant 'release'"
echo "   - Faça o build"
echo ""
echo "Ou execute o comando direto:"
echo "cd android && ./gradlew bundleRelease"

echo "✅ Preparação concluída! Arquivo estará em: android/app/build/outputs/bundle/release/app-release.aab"
