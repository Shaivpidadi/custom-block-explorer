import React, { useMemo } from "react";

import { getGasPriceAndRewards } from "../helpers";
import BlockListSection from "../containers/Home/BlockList";
import SummarySection from "../containers/Home/SummarySection";
import {
  useLatestBlocks,
  useLatestTransactions,
  useBlockchainStats,
} from "../hooks";
import { roundUpNumber } from "../utils";

const Home = () => {
  const { blocks, loading: isBlockLoading } = useLatestBlocks();
  const { transactions, loading: isTransactionLoading } =
    useLatestTransactions();
  const {
    blockHeight,
    avgGasPrice,
    cumulativeTxCount,
    txn24hVolume,
    txnCost24hVolume,
    loading: isStatsLoading,
  } = useBlockchainStats();

  const blockData = useMemo(() => {
    if (!blocks) return [];
    let data = [];

    blocks.map((block) => {
      if (!!block) {
        data.push({
          blockNumber: block.number,
          timeStamp: block.timestamp,
          producer: block.miner,
          producerLink: "",
          txns: block.transactions.length,
          blockLink: ``,
          ...getGasPriceAndRewards(block),
        });
      }
    });

    return data;
  }, [blocks]);

  const txData = useMemo(() => {
    if (!transactions) return [];

    let data = [];

    transactions.map((tx) => {
      data.push({
        timeStamp: tx.timestamp,
        txValue: tx.value,
        txhash: tx.hash,
        txFrom: tx.from,
        txTo: tx.to,
        ...tx,
      });
    });

    return data;
  }, [transactions]);

  return (
    <div className="p-6">
      <SummarySection
        isLoading={isStatsLoading}
        blockHeight={blockHeight}
        avgGasPrice={roundUpNumber(avgGasPrice)}
        cumulativeTxCount={cumulativeTxCount}
        txn24hVolume={txn24hVolume}
        txnCost24hVolume={roundUpNumber(txnCost24hVolume)}
      />
      <BlockListSection
        isLoading={isBlockLoading || isTransactionLoading}
        blocks={blockData || []}
        transactions={txData}
      />
    </div>
  );
};

export default Home;
