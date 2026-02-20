import React from "react";

const AddressOverview = ({ ethBalance, usdBalance }) => {
  return (
    <div>
      <h2 className="font-bold text-base text-foreground mb-4">Overview</h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Total Asset Value
          </p>
          <p className="text-foreground font-semibold">${usdBalance}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            ETH Holdings
          </p>
          <p className="text-foreground font-semibold">{ethBalance} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default AddressOverview;
