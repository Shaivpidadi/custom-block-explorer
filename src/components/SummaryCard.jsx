import React from "react";
import StatsCard from "./UI/StatsCard";

const SummaryCard = ({
  blockHeight,
  avgGasPrice,
  cumulativeTxCount,
  txn24hVolume,
  txnCost24hVolume,
  isLoading,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
        <StatsCard
          isLoading={isLoading}
          label="Block height"
          value={blockHeight}
        />
        <StatsCard
          isLoading={isLoading}
          label="Avg. Gas Price"
          value={avgGasPrice}
          unit="Gwei"
          link="/block-list"
        />
        <StatsCard
          isLoading={isLoading}
          label="Total transactions"
          value={cumulativeTxCount}
          unit="txns"
          link="/txs"
        />
        <StatsCard
          isLoading={isLoading}
          label="24h Txs Volume"
          value={txn24hVolume}
          unit="txns"
        />
        <StatsCard
          isLoading={isLoading}
          label="24h ETH Volume"
          value={txnCost24hVolume}
          unit="ETH"
        />
      </div>
    </div>
  );
};

export default SummaryCard;
