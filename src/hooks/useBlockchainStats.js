import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { loadFromIndexedDB, saveToIndexedDB } from "../services/dbService";
import { getSocketProvider } from "../helpers";
import { mockBlockchainStats } from "../mock";

export const useBlockchainStats = () => {
  const [loading, setLoading] = useState(true);
  const [blockHeight, setBlockHeight] = useState(0);
  const [avgGasPrice, setAvgGasPrice] = useState("0");
  const [cumulativeTxCount, setCumulativeTxCount] = useState(0);
  const [txn24hVolume, setTxn24hVolume] = useState(0);
  const [txnCost24hVolume, setTxnCost24hVolume] = useState("0");

  const provider = getSocketProvider();

  useEffect(() => {
    let cumulativeTransactions = 0;
    let transactionData = [];

    // Load existing data from IndexedDB
    const loadDataFromIndexedDB = async () => {
      const storedTxCount = (await loadFromIndexedDB("cumulativeTxCount")) || 0;
      const storedBlockHeight = (await loadFromIndexedDB("blockHeight")) || 0;
      const storedTxn24hVolume = (await loadFromIndexedDB("txn24hVolume")) || 0;
      const storedTxnCost24hVolume =
        (await loadFromIndexedDB("txnCost24hVolume")) || "0";
      const storedGasPriceTotal =
        (await loadFromIndexedDB("avgGasPrice")) || "0";

      // Initialize states with stored values
      setCumulativeTxCount(storedTxCount);
      setTxn24hVolume(storedTxn24hVolume);
      setTxnCost24hVolume(
        ethers.utils.formatUnits(storedTxnCost24hVolume, "ether")
      );
      setBlockHeight(storedBlockHeight);
      setAvgGasPrice(ethers.utils.formatUnits(storedGasPriceTotal, "gwei"));

      cumulativeTransactions = storedTxCount;

      setLoading(false);
    };

    const fetchAndCalculateNewBlocks = async () => {
      const latestBlockNumber = await provider.getBlockNumber();
      const lastStoredBlock = (await loadFromIndexedDB("blockHeight")) || 0;

      // Check if there are new blocks to process
      if (latestBlockNumber <= lastStoredBlock) return;

      let newTransactionsCount = 0;
      let newGasPriceTotal = ethers.BigNumber.from(0);
      let newCostTotal = ethers.BigNumber.from(0);
      let newTransactionCount = 0;

      // Fetch and process only the new blocks
      for (
        let blockNumber = lastStoredBlock + 1;
        blockNumber <= latestBlockNumber;
        blockNumber++
      ) {
        const block = await provider.getBlockWithTransactions(blockNumber);

        if (block && block.transactions?.length > 0) {
          newTransactionsCount += block?.transactions?.length;

          block.transactions?.forEach((tx) => {
            newGasPriceTotal = newGasPriceTotal.add(
              tx.gasPrice || ethers.BigNumber.from(0)
            );
            newCostTotal = newCostTotal.add(
              tx.value || ethers.BigNumber.from(0)
            );
            newTransactionCount++;
          });

          // Add each transaction to `transactionData` for 24-hour tracking
          transactionData.push(
            ...block.transactions?.map((tx) => ({
              value: tx.value,
              gasPrice: tx.gasPrice,
              timestamp: block.timestamp,
            }))
          );
        }
      }

      // Calculate average gas price only for new transactions
      const avgGas =
        newTransactionCount > 0
          ? newGasPriceTotal.div(newTransactionCount)
          : ethers.BigNumber.from(0);

      // Filter transactions for only the last 24 hours
      const last24HoursTransactions = transactionData.filter(
        (tx) => Date.now() - tx.timestamp < 24 * 60 * 60 * 1000
      );

      // Calculate 24-hour transaction volume and ETH volume
      const txn24hVolume = last24HoursTransactions.length;
      const txnCost24hVolume = last24HoursTransactions.reduce(
        (total, tx) => total.add(tx.value),
        ethers.BigNumber.from(0)
      );

      // Update state values for display
      setCumulativeTxCount(cumulativeTransactions + newTransactionsCount);
      setAvgGasPrice(ethers.utils.formatUnits(avgGas, "gwei"));
      setTxn24hVolume(txn24hVolume);
      setTxnCost24hVolume(ethers.utils.formatUnits(txnCost24hVolume, "ether"));
      setBlockHeight(latestBlockNumber);

      // Save updated values to IndexedDB
      await saveToIndexedDB(
        "cumulativeTxCount",
        cumulativeTransactions + newTransactionsCount
      );
      await saveToIndexedDB("avgGasPrice", newGasPriceTotal.toString());
      await saveToIndexedDB("blockHeight", latestBlockNumber);
      await saveToIndexedDB("txn24hVolume", txn24hVolume);
      await saveToIndexedDB("txnCost24hVolume", txnCost24hVolume.toString());
    };

    if (Boolean(process.env.REACT_APP_PREVIEW)) {
      setCumulativeTxCount(mockBlockchainStats.cumulativeTxCount);
      setAvgGasPrice(mockBlockchainStats.avgGasPrice);
      setTxn24hVolume(mockBlockchainStats.txn24hVolume);
      setTxnCost24hVolume(mockBlockchainStats.txnCost24hVolume);
      setBlockHeight(mockBlockchainStats.blockHeight);
      setLoading(false);
    } else {
      loadDataFromIndexedDB().then(fetchAndCalculateNewBlocks);
    }
  }, [provider]);

  return {
    blockHeight,
    avgGasPrice,
    cumulativeTxCount,
    txn24hVolume,
    txnCost24hVolume,
    loading,
  };
};
