import React from "react";

const TransactionInfo = ({ ethBalance, usdBalance }) => {
  return (
    <div>
      <h2 className="font-bold text-base text-foreground mb-4">More Info</h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Multi-chain Allocation
          </p>
          <p className="text-foreground text-sm">N/A</p>
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

export default TransactionInfo;
