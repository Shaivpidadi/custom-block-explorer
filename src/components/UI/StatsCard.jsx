import React from "react";
import { Link } from "react-router-dom";

const StatsCard = ({
  label,
  value,
  unit = "",
  link = "",
  isLoading = false,
}) => {
  return (
    <div className={`p-4 text-center ${isLoading ? "animate-pulse" : ""}`}>
      <p className="text-muted-foreground font-medium text-xs uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex justify-center items-baseline gap-1.5">
        {link ? (
          <Link
            to={link}
            className="text-link font-bold text-xl hover:opacity-80 transition-opacity"
          >
            {value}
          </Link>
        ) : (
          <span className="font-bold text-xl text-foreground">{value}</span>
        )}
        {unit && (
          <span className="text-xs text-muted-foreground font-medium">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
