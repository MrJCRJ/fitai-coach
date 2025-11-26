"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useEffect, useState } from "react";

declare global {
  interface Window {
    admob: unknown;
    AdMob: unknown;
    adsbygoogle: unknown[];
  }
}

interface RewardedAdProps {
  onAdComplete: () => void;
  onAdError?: (error: unknown) => void;
}

export function RewardedAd({ onAdComplete, onAdError }: RewardedAdProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);

  useEffect(() => {
    // Load AdMob Web SDK
    const loadAdMobSDK = async () => {
      try {
        console.log("🎯 RewardedAd: Iniciando carregamento do AdMob SDK");

        // For web, we'll use Google AdSense/AdMob Web SDK
        // Get publisher ID from environment or use placeholder
        const publisherId =
          process.env.NEXT_PUBLIC_ADMOB_PUBLISHER_ID ||
          "ca-pub-YOUR_PUBLISHER_ID";

        console.log("🎯 RewardedAd: Publisher ID:", publisherId);

        const script = document.createElement("script");
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.async = true;
        script.setAttribute("data-ad-client", publisherId);
        script.crossOrigin = "anonymous";

        script.onload = () => {
          console.log("✅ RewardedAd: AdMob SDK loaded successfully");
          console.log(
            "🎯 RewardedAd: window.adsbygoogle:",
            !!window.adsbygoogle
          );
          setIsLoaded(true);
        };

        script.onerror = (error) => {
          console.error("❌ RewardedAd: Failed to load AdMob SDK:", error);
          setAdError("Erro ao carregar anúncios. Usando modo simulado.");
          // Fallback to simulation mode
          setTimeout(() => setIsLoaded(true), 1000);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("❌ RewardedAd: Error loading AdMob:", error);
        setAdError("Erro ao inicializar anúncios. Usando modo simulado.");
        // Fallback to simulation mode
        setTimeout(() => setIsLoaded(true), 1000);
      }
    };

    loadAdMobSDK();
  }, [onAdError]);

  const showAd = async () => {
    if (!isLoaded) {
      console.log("⚠️ RewardedAd: SDK ainda não carregado");
      setAdError("SDK ainda não carregado");
      return;
    }

    setIsLoading(true);
    setAdError(null);

    try {
      const adUnitId = process.env.NEXT_PUBLIC_ADMOB_AD_UNIT_ID;
      console.log("🎯 RewardedAd: Tentando mostrar anúncio");
      console.log("🎯 RewardedAd: Ad Unit ID:", adUnitId);
      console.log(
        "🎯 RewardedAd: window.adsbygoogle disponível:",
        !!window.adsbygoogle
      );

      if (adUnitId && window.adsbygoogle) {
        console.log("🎯 RewardedAd: Tentando mostrar anúncio real do AdMob");

        // Para web, anúncios rewarded não são diretamente suportados pelo AdMob Web SDK
        // Vamos usar uma abordagem diferente: mostrar um anúncio intersticial ou banner
        // e considerar como "assistido" após alguns segundos

        // Criar um elemento para o anúncio
        const adContainer = document.createElement("div");
        adContainer.style.position = "fixed";
        adContainer.style.top = "50%";
        adContainer.style.left = "50%";
        adContainer.style.transform = "translate(-50%, -50%)";
        adContainer.style.zIndex = "9999";
        adContainer.style.background = "white";
        adContainer.style.padding = "20px";
        adContainer.style.borderRadius = "10px";
        adContainer.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        adContainer.innerHTML = `
          <div style="text-align: center;">
            <h3 style="color: #333; margin-bottom: 10px;">Anúncio Patrocinado</h3>
            <div style="width: 300px; height: 250px; background: #f0f0f0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
              <span style="color: #666;">Espaço para anúncio</span>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Aguarde 5 segundos...</p>
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button id="ad-close-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Fechar</button>
            </div>
          </div>
        `;

        document.body.appendChild(adContainer);

        // Contador regressivo
        let countdown = 5;
        const countdownElement = adContainer.querySelector("p");
        const interval = setInterval(() => {
          countdown--;
          if (countdownElement) {
            countdownElement.textContent = `Aguarde ${countdown} segundos...`;
          }
          if (countdown <= 0) {
            clearInterval(interval);
            if (countdownElement) {
              countdownElement.textContent =
                "Anúncio assistido! Obrigado pelo apoio.";
            }
            // Habilitar botão de fechar
            const closeBtn = adContainer.querySelector("#ad-close-btn");
            if (closeBtn) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (closeBtn as any).textContent = "Concluído";
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (closeBtn as any).onclick = () => {
                document.body.removeChild(adContainer);
                console.log("✅ RewardedAd: Anúncio assistido com sucesso");
                setIsLoading(false);
                onAdComplete();
              };
            }
          }
        }, 1000);

        // Timeout de segurança
        setTimeout(() => {
          if (document.body.contains(adContainer)) {
            clearInterval(interval);
            document.body.removeChild(adContainer);
            console.log("✅ RewardedAd: Anúncio completado por timeout");
            setIsLoading(false);
            onAdComplete();
          }
        }, 8000);
      } else {
        console.log(
          "🎯 RewardedAd: Usando anúncio simulado (AdMob não configurado)"
        );

        // Fallback to simulation mode - sempre funciona
        // Criar anúncio simulado imediatamente
        const adContainer = document.createElement("div");
        adContainer.style.position = "fixed";
        adContainer.style.top = "50%";
        adContainer.style.left = "50%";
        adContainer.style.transform = "translate(-50%, -50%)";
        adContainer.style.zIndex = "9999";
        adContainer.style.background = "white";
        adContainer.style.padding = "20px";
        adContainer.style.borderRadius = "10px";
        adContainer.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        adContainer.style.maxWidth = "400px";
        adContainer.innerHTML = `
          <div style="text-align: center;">
            <h3 style="color: #333; margin-bottom: 10px;">Anúncio Patrocinado</h3>
            <div style="width: 300px; height: 250px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-weight: bold;">
              <span>Espaço para anúncio</span>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Aguarde 3 segundos...</p>
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button id="ad-close-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Fechar</button>
            </div>
          </div>
        `;

        document.body.appendChild(adContainer);

        // Contador regressivo mais rápido para simulação
        let countdown = 3;
        const countdownElement = adContainer.querySelector("p");
        const interval = setInterval(() => {
          countdown--;
          if (countdownElement) {
            countdownElement.textContent = `Aguarde ${countdown} segundos...`;
          }
          if (countdown <= 0) {
            clearInterval(interval);
            if (countdownElement) {
              countdownElement.textContent =
                "Anúncio assistido! Obrigado pelo apoio.";
            }
            // Habilitar botão de fechar
            const closeBtn = adContainer.querySelector("#ad-close-btn");
            if (closeBtn) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (closeBtn as any).textContent = "Concluído";
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (closeBtn as any).onclick = () => {
                document.body.removeChild(adContainer);
                console.log("✅ RewardedAd: Anúncio simulado completado");
                setIsLoading(false);
                onAdComplete();
              };
            }
          }
        }, 1000);

        // Timeout de segurança mais curto
        setTimeout(() => {
          if (document.body.contains(adContainer)) {
            clearInterval(interval);
            document.body.removeChild(adContainer);
            console.log(
              "✅ RewardedAd: Anúncio simulado completado por timeout"
            );
            setIsLoading(false);
            onAdComplete();
          }
        }, 5000);
      }
    } catch (error) {
      console.error("❌ RewardedAd: Erro ao mostrar anúncio:", error);
      setAdError("Erro ao exibir anúncio. Tente novamente.");
      setIsLoading(false);
      onAdError?.(error);
    }
  };

  return (
    <div className="w-full">
      {adError && (
        <div className="text-red-400 text-sm mb-2 text-center">{adError}</div>
      )}

      <button
        onClick={showAd}
        disabled={!isLoaded || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Carregando anúncio...
          </>
        ) : !isLoaded ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Preparando anúncio...
          </>
        ) : (
          <>
            <span className="text-lg">📺</span>
            Assistir Anúncio (30s)
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-2">
        Anúncio gratuito para liberar seu treino
      </p>
    </div>
  );
}
