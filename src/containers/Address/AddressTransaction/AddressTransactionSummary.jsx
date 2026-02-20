import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const AddresssTransactionSummary = ({ totalTxs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <span>Total transfer-out txns</span>
          <InformationCircleIcon className="w-3.5 h-3.5" />
        </div>
        <span className="text-lg font-bold text-foreground">{totalTxs}</span>
        <span className="text-sm text-muted-foreground">{totalTxs} ETH</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <span>Total transfer-in txns</span>
          <InformationCircleIcon className="w-3.5 h-3.5" />
        </div>
        <span className="text-lg font-bold text-foreground">{totalTxs}</span>
        <span className="text-sm text-muted-foreground">{totalTxs} ETH</span>
      </div>
    </div>
  );
};

export default AddresssTransactionSummary;
