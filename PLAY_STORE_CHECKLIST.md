# 🚀 Guia Completo: Publicar FitAI Coach na Play Store

## 📋 Checklist para Publicação na Play Store

### ✅ **Passo 1: Conta Google Play Console**
- [ ] Criar conta em [Google Play Console](https://play.google.com/console/)
- [ ] Pagar taxa de R$ 25 (uma vez só)
- [ ] Configurar conta de desenvolvedor

### ✅ **Passo 2: Preparar App**
- [ ] Build de produção testado (`npm run build`)
- [ ] PWA funcionando offline
- [ ] Manifest.json configurado
- [ ] Service worker ativo

### ✅ **Passo 3: Configurar Capacitor**
- [ ] Capacitor instalado (`npm install @capacitor/core @capacitor/cli @capacitor/android`)
- [ ] Projeto inicializado (`npx cap init "FitAI Coach" "com.fitai.coach"`)
- [ ] Android adicionado (`npx cap add android`)

### ✅ **Passo 4: Gerar Keystore**
```bash
# Criar keystore para assinatura
keytool -genkey -v -keystore fitai-coach.keystore -alias fitai-coach -keyalg RSA -keysize 2048 -validity 10000
```

### ✅ **Passo 5: Build Release**
```bash
# Executar script de build
./scripts/build-android.sh

# Ou manualmente:
npm run build
npx next export
npx cap sync android
npx cap open android
```

### ✅ **Passo 6: Assets para Play Store**
- [ ] **Ícone**: 512x512px (ic_launcher.png)
- [ ] **Screenshots**: 2-8 imagens (1080x1920px)
- [ ] **Feature Graphic**: 1024x500px
- [ ] **Descrição**: Em português (máx 4000 chars)
- [ ] **Descrição Curta**: 80 chars
- [ ] **Política de Privacidade**: URL válida

### ✅ **Passo 7: Política de Privacidade**
Criar página simples em: `https://fitai-coach.vercel.app/privacy`

### ✅ **Passo 8: Upload na Play Store**
1. Acessar [Google Play Console](https://play.google.com/console/)
2. Criar novo app
3. Preencher dados do app
4. Upload do App Bundle (.aab)
5. Configurar preços (gratuito)
6. Publicar

### ✅ **Passo 9: Configurar AdMob**
- [ ] Registrar app no AdMob
- [ ] Criar bloco de anúncios rewarded
- [ ] Atualizar IDs no código
- [ ] Testar anúncios em produção

## 🛠️ Comandos Úteis

```bash
# Build completo para Play Store
./scripts/build-android.sh

# Abrir projeto Android
npx cap open android

# Sincronizar mudanças
npx cap sync android

# Build release direto
cd android && ./gradlew bundleRelease
```

## 📱 Requisitos da Play Store

### **App Bundle (.aab)**
- Arquivo: `android/app/build/outputs/bundle/release/app-release.aab`
- Assinado com keystore válida
- Build variant: release

### **Assets Obrigatórios**
- Ícone do app (512x512)
- Pelo menos 2 screenshots
- Feature Graphic (1024x500)
- Descrição completa

### **Conteúdo**
- Classificação de conteúdo (Everyone)
- Categoria: Health & Fitness
- Preço: Gratuito

## 🔧 Configurações Técnicas

### **AndroidManifest.xml**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### **Build.gradle**
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "com.fitai.coach"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 🚀 Pós-Lançamento

- [ ] Monitorar downloads e crash reports
- [ ] Acompanhar receita de anúncios
- [ ] Coletar feedback dos usuários
- [ ] Planejar atualizações futuras

## 📞 Suporte

- **Play Console**: https://play.google.com/console/
- **AdMob**: https://admob.google.com/
- **Capacitor Docs**: https://capacitorjs.com/docs/

---

**💡 Dica**: Teste tudo localmente antes de publicar. Use `npm run start` para testar a versão de produção.

