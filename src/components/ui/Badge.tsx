"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  animate?: boolean;
}

const badgeVariants = {
  default: "bg-gray-100 text-gray-800 border-gray-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  animate = false,
}: BadgeProps) {
  const Component = animate ? motion.span : "span";

  return (
    <Component
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        border backdrop-blur-sm
        ${badgeVariants[variant]}
        ${className}
      `}
      initial={animate ? { scale: 0.8, opacity: 0 } : {}}
      animate={animate ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      {children}
    </Component>
  );
}
