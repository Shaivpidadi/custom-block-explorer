import { useState, useEffect } from "react";
import { getSocketProvider } from "../helpers"; // Update helper to use WS provider

export const useLatestTransactions = (
  pageNumber = 1,
  transactionCount = 10
) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const provider = getSocketProvider();

    const fetchInitialTransactions = async () => {
      try {
        setLoading(true);
        const latestBlockNumber = await provider.getBlockNumber();

        let allTransactions = [];
        const transactionsToSkip = (pageNumber - 1) * transactionCount;
        let blockPromises = [];
        let blockIndex = 0;

        // Fetch enough blocks to fill the transaction list for the current page
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
          // Ensure block is not null before accessing transactions
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

        // Extract only the transactions for the current page
        const pageTransactions = allTransactions.slice(
          transactionsToSkip,
          transactionsToSkip + transactionCount
        );
        setTransactions(pageTransactions);
      } catch (err) {
        setError(`Failed to fetch transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial transactions once
    fetchInitialTransactions();

    // Listen for new blocks using WebSocket
    provider.on("block", async (newBlockNumber) => {
      try {
        const newBlock = await provider.getBlockWithTransactions(
          newBlockNumber
        );

        // Ensure newBlock is not null before updating transactions
        if (newBlock) {
          setTransactions((prevTransactions) => {
            // Get new transactions that are not already in prevTransactions
            const newTransactions = newBlock.transactions
              .filter(
                (tx) =>
                  !prevTransactions.some((prevTx) => prevTx.hash === tx.hash)
              )
              .map((tx) => ({
                ...tx,
                timeStamp: newBlock.timestamp,
              }));

            const updatedTransactions = [
              ...newTransactions,
              ...prevTransactions,
            ];
            return updatedTransactions.slice(0, 50); // Keep only the latest 50 transactions
          });
        }
      } catch (err) {
        console.error("Error fetching new block transactions:", err);
      }
    });

    // Cleanup WebSocket listener on unmount
    return () => {
      provider.removeAllListeners("block");
    };
  }, [pageNumber, transactionCount]);

  return { transactions, loading, error };
};
