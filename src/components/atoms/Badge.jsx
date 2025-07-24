import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "sm",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary border border-secondary/20",
    accent: "bg-gradient-to-r from-accent/10 to-accent-dark/10 text-accent-dark border border-accent/20",
    success: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border border-green-200",
    warning: "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-700 border border-yellow-200",
    danger: "bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-700 border border-red-200",
    high: "priority-high",
    medium: "priority-medium", 
    low: "priority-low"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;