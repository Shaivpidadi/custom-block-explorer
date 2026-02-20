import React from "react";
import SummaryCard from "../../components/SummaryCard";

const SummarySection = ({
  blockHeight,
  avgGasPrice,
  cumulativeTxCount,
  txn24hVolume,
  txnCost24hVolume,
  isLoading,
}) => {
  return (
    <SummaryCard
      isLoading={isLoading}
      blockHeight={blockHeight}
      avgGasPrice={avgGasPrice}
      cumulativeTxCount={cumulativeTxCount}
      txn24hVolume={txn24hVolume}
      txnCost24hVolume={txnCost24hVolume}
    />
  );
};

export default SummarySection;
