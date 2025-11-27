import "../styles/globals.css";
import React from "react";
import { PWAWrapper } from "@/components/PWAWrapper";

export const metadata = {
  title: "FitAI Coach",
  description: "Personal trainer inteligente que evolui com você",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitAI Coach",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "FitAI Coach",
    title: "FitAI Coach",
    description: "Personal trainer inteligente que evolui com você",
  },
  twitter: {
    card: "summary",
    title: "FitAI Coach",
    description: "Personal trainer inteligente que evolui com você",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta name="application-name" content="FitAI Coach" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FitAI Coach" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className="min-h-screen">
        <PWAWrapper>{children}</PWAWrapper>
      </body>
    </html>
  );
}
