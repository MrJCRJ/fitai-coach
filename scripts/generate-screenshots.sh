#!/bin/bash

# Script para gerar screenshots para Play Store

echo "📸 Gerando screenshots para Play Store..."

# Instalar puppeteer se não estiver instalado
if ! command -v puppeteer &> /dev/null; then
    echo "📦 Instalando puppeteer..."
    npm install puppeteer --save-dev
fi

# Criar diretório para screenshots
mkdir -p screenshots

# Iniciar servidor de desenvolvimento em background
echo "🚀 Iniciando servidor de desenvolvimento..."
npm run dev &
SERVER_PID=$!

# Aguardar servidor iniciar
sleep 5

# Gerar screenshots
echo "📱 Tirando screenshots..."
node -e "
const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1920 });

  try {
    // Screenshot da página inicial
    console.log('📸 Screenshot 1: Página inicial');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/01_pagina_inicial.png', fullPage: false });

    // Screenshot da avaliação
    console.log('📸 Screenshot 2: Avaliação física');
    await page.goto('http://localhost:3000/assessment');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/02_avaliacao.png', fullPage: false });

    // Screenshot do dashboard
    console.log('📸 Screenshot 3: Dashboard');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/03_dashboard.png', fullPage: false });

    // Screenshot do workout
    console.log('📸 Screenshot 4: Treinos');
    await page.goto('http://localhost:3000/workout');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/04_treinos.png', fullPage: false });

    console.log('✅ Screenshots gerados com sucesso!');
    console.log('📁 Arquivos salvos em: screenshots/');

  } catch (error) {
    console.error('❌ Erro ao gerar screenshots:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
"

# Parar servidor
echo "🛑 Parando servidor..."
kill $SERVER_PID 2>/dev/null || true

echo "✅ Processo concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Verifique os screenshots em screenshots/"
echo "2. Redimensione se necessário (1080x1920px recomendado)"
echo "3. Faça upload na Play Console"