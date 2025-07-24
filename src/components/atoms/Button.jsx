import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-primary/50",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    accent: "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:scale-105 focus:ring-accent/50",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary/50",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:scale-105 focus:ring-red-500/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
    md: "px-6 py-2.5 text-sm rounded-lg gap-2",
    lg: "px-8 py-3 text-base rounded-lg gap-2.5",
    xl: "px-10 py-4 text-lg rounded-xl gap-3"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className={cn("animate-spin", size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
      )}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;