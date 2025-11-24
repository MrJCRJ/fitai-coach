import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'FitAI Coach',
  description: 'Personal trainer inteligente que evolui com você',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
