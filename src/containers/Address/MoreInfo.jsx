import React from "react";
import { truncateAddress } from "../../utils";

const MoreInfo = ({ totalTxs, latestTx, firstTx }) => {
  return (
    <div>
      <h2 className="font-bold text-base text-foreground mb-4">
        Transaction Info
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Total Txns Initiated
          </p>
          <p className="text-foreground font-semibold">{totalTxs} Txs</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Latest Txn Sent
          </p>
          <p className="text-foreground text-sm font-mono">
            {latestTx
              ? truncateAddress(latestTx?.hash, 10)
              : "No transactions recorded"}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            First Txn Sent
          </p>
          <p className="text-foreground text-sm font-mono">
            {firstTx
              ? truncateAddress(firstTx?.hash, 10)
              : "No transactions recorded"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
