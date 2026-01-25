import { cn } from "@/lib/utils";
import React from "react";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function BrutalButton({ 
  className, 
  variant = "secondary", 
  size = "md",
  children, 
  ...props 
}: BrutalButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-display font-bold uppercase tracking-wide transition-all duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black text-white border-2 border-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]",
    secondary: "bg-white text-black border-2 border-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
    danger: "bg-red-500 text-white border-2 border-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_#000]"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
