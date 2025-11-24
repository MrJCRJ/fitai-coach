'use client'
import { motion } from 'framer-motion'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl border-2 glass
              transition-all duration-200 ease-in-out
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/50
              hover:border-gray-500
              ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-600'}
              ${icon ? 'pl-12' : ''}
              ${className}
            `}
            {...props}
          />

          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            className="text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    )
  }
)

Input.displayName = 'Input'

export default Input