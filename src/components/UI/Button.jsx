import React from "react";

const Button = ({ label, variant = "primary", className = "", ...rest }) => {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-soft",
    secondary:
      "bg-muted text-foreground hover:bg-accent border border-border",
    ghost:
      "bg-transparent text-foreground hover:bg-muted",
  };

  return (
    <button
      className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${variants[variant] || variants.primary} ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
