'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      className={`
        relative glass rounded-2xl shadow-lg
        ${glow ? 'shadow-blue-500/20' : 'shadow-gray-900/50'}
        ${hover ? 'hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      {glow && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      )}

      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}