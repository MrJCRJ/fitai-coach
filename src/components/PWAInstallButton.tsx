"use client";

import { usePWAInstall } from "@/lib/usePWAInstall";
import Button from "@/components/ui/Button";

export function PWAInstallButton() {
  const { installPWA, isInstallable, isInstalled } = usePWAInstall();

  // Only show on mobile devices and when installable
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (!isMobile || !isInstallable || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Button
        onClick={installPWA}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg"
      >
        📱 Instalar App FitAI Coach
      </Button>
    </div>
  );
}
