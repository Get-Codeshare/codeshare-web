"use client"

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils"

interface KeyboardShortcutProps {
  className?: string;
  animated?: boolean;
  theme?: "default" | "gradient" | "neon";
}

const KeyButton = ({
  children,
  className = "",
  isHighlighted = false,
  size = "default",
  theme = "default",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  size?: "sm" | "default" | "lg";
  theme?: "default" | "gradient" | "neon";
  delay?: number;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isHighlighted) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted, delay]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const sizeClasses = {
    sm: "h-8 min-w-8 text-xs",
    default: "h-10 min-w-10 text-sm",
    lg: "h-12 min-w-12 text-base font-semibold",
  };

  const baseClasses = "relative flex items-center justify-center font-mono transition-all duration-200 ease-out cursor-pointer select-none";
  
  const keyClasses = cn(
    sizeClasses[size],
    baseClasses,
    // High contrast colors for visibility
    "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
    "border-2 border-gray-300 dark:border-gray-600",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)]",
    "rounded-lg",
    // Hover effects
    "hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500",
    // Animation states
    isAnimating && "bg-blue-500 dark:bg-blue-400 text-white dark:text-black border-blue-400 dark:border-blue-300 shadow-lg shadow-blue-500/30 scale-105",
    // Press effects
    isPressed && "transform translate-y-1 shadow-[0_2px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.1)]",
    className
  );

  return (
    <button
      className={keyClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {children}
    </button>
  );
};

export const KeyboardShortcut: React.FC<KeyboardShortcutProps> = ({ 
  className = "", 
  animated = true,
  theme = "default"
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-2 p-4", className)}>
      <KeyButton 
        isHighlighted={animated} 
        size="lg"
        theme={theme}
        delay={0}
      >
        ⌥
      </KeyButton>
      <span className="text-muted-foreground text-lg font-light opacity-70">+</span>
      <KeyButton 
        isHighlighted={animated} 
        size="lg"
        theme={theme}
        delay={200}
      >
        ⌘
      </KeyButton>
      <span className="text-muted-foreground text-lg font-light opacity-70">+</span>
      <KeyButton 
        isHighlighted={animated} 
        size="lg"
        theme={theme}
        delay={400}
      >
        C
      </KeyButton>
    </div>
  );
};

// Alternative compact version
export const KeyboardShortcutCompact: React.FC<KeyboardShortcutProps> = ({ 
  className = "", 
  animated = true,
  theme = "default"
}) => {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <KeyButton isHighlighted={animated} size="sm" theme={theme} delay={0}>⌥</KeyButton>
      <KeyButton isHighlighted={animated} size="sm" theme={theme} delay={100}>⌘</KeyButton>
      <KeyButton isHighlighted={animated} size="sm" theme={theme} delay={200}>C</KeyButton>
    </div>
  );
};

export default KeyboardShortcut;