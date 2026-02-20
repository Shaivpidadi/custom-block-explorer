import React from "react";

const Divider = ({ className = "" }) => {
  return (
    <div className={`w-full border-b border-border my-4 ${className}`} />
  );
};

export default Divider;
