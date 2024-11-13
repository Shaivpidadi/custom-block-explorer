// hooks/useLatestTransactions.js

import { useState, useEffect } from "react";
import { getSocketProvider } from "../helpers"; // Update helper to use WS provider
import { mockLatestBlocks } from "../mock";

export const useLatestTransactions = (pageNumber = 1, transactionCount = 10) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialTransactions = async () => {
      try {
        setLoading(true);

        if (process.env.REACT_APP_PREVIEW) {
          const mockTransactions = mockLatestBlocks.flatMap(block =>
            block.transactions.map(tx => ({ ...tx, timeStamp: block.timestamp }))
          );

          const transactionsToSkip = (pageNumber - 1) * transactionCount;
          const pageTransactions = mockTransactions.slice(
            transactionsToSkip,
            transactionsToSkip + transactionCount
          );

          setTransactions(pageTransactions);
          setLoading(false);
        } else {
          const provider = getSocketProvider();
          const latestBlockNumber = await provider.getBlockNumber();

          let allTransactions = [];
          const transactionsToSkip = (pageNumber - 1) * transactionCount;
          let blockPromises = [];
          let blockIndex = 0;

          while (
            allTransactions.length < transactionsToSkip + transactionCount &&
            blockIndex <= latestBlockNumber
          ) {
            blockPromises.push(
              provider.getBlockWithTransactions(latestBlockNumber - blockIndex)
            );
            blockIndex++;
          }

          const blocks = await Promise.all(blockPromises);

          blocks.forEach((block) => {
            if (
              block &&
              allTransactions.length < transactionsToSkip + transactionCount
            ) {
              const blockTransactions = block.transactions.map((tx) => ({
                ...tx,
                timeStamp: block.timestamp,
              }));
              allTransactions = allTransactions.concat(blockTransactions);
            }
          });

          const pageTransactions = allTransactions.slice(
            transactionsToSkip,
            transactionsToSkip + transactionCount
          );
          setTransactions(pageTransactions);
        }
      } catch (err) {
        setError(`Failed to fetch transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTransactions();

    if (!process.env.REACT_APP_PREVIEW) {
      const provider = getSocketProvider();
      provider.on("block", async (newBlockNumber) => {
        try {
          const newBlock = await provider.getBlockWithTransactions(newBlockNumber);

          if (newBlock) {
            setTransactions((prevTransactions) => {
              const newTransactions = newBlock.transactions
                .filter((tx) => !prevTransactions.some((prevTx) => prevTx.hash === tx.hash))
                .map((tx) => ({
                  ...tx,
                  timeStamp: newBlock.timestamp,
                }));

              const updatedTransactions = [
                ...newTransactions,
                ...prevTransactions,
              ];
              return updatedTransactions.slice(0, 50); 
            });
          }
        } catch (err) {
          console.error("Error fetching new block transactions:", err);
        }
      });

      return () => {
        provider.removeAllListeners("block");
      };
    }
  }, [pageNumber, transactionCount]);

  return { transactions, loading, error };
};
