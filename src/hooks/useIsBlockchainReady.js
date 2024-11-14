import { useState, useEffect, useCallback } from "react";
import { getProvider } from "../helpers";
import { clearIndexedDB } from "../services/dbService";

const useIsBlockchainReady = () => {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState();

  // Function to fetch blockchain data
  const fetchBlockchainData = useCallback(async () => {
    try {
      if (Boolean(process.env.REACT_APP_PREVIEW)) {
        setIsReady(true);
        return;
      }
      setLoading(true);
      const provider = getProvider();

      if (!provider) {
        clearIndexedDB();
        setError("Blockchain provider not available.");
        setIsReady(false);
        return;
      }

      const network = await provider.detectNetwork();

      if (network && network.chainId) {
        setNetwork(network);
        setIsReady(true);
      } else {
        setError("Failed to detect network. Chain ID is missing.");
        setIsReady(false);
      }
    } catch (err) {
      clearIndexedDB();
      setIsReady(false);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockchainData();
  }, [fetchBlockchainData]);

  return {
    isReady,
    loading,
    error,
    network,
    refreshBlockchainData: fetchBlockchainData,
  };
};

export default useIsBlockchainReady;
