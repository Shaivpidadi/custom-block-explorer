import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getProvider } from "../helpers";

const provider = getProvider();

export const useAddressTransactionData = (
  address,
  pageNumber = 1,
  pageSize = 10
) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch latest block number
      const latestBlockNumber = await provider.getBlockNumber();

      const response = await axios.post(import.meta.env.VITE_PROVIDER, {
        jsonrpc: "2.0",
        method: "eth_getLogs",
        params: [
          {
            fromBlock: ethers.utils.hexlify(0),
            toBlock: ethers.utils.hexlify(latestBlockNumber),
            address: address,
          },
        ],
        id: 1,
      });

      const newTransactions = response.data.result;
      setTransactions((prev) => [...prev, ...newTransactions]);
      // setHasMore(newTransactions.length === pageSize);
    } catch (error) {
      setError("Failed to fetch transactions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address, pageNumber, pageSize]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    // hasMore,
  };
};
