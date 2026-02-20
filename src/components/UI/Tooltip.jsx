import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-0 w-max max-w-xs bg-card text-card-foreground text-xs rounded-lg py-2 px-3 shadow-elevated border border-border z-50 animate-fade-in">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
