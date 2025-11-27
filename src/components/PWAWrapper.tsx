"use client";

import { PWAInstallButton } from "@/components/PWAInstallButton";

export function PWAWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PWAInstallButton />
    </>
  );
}
