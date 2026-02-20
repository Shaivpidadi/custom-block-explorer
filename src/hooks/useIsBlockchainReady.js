import { useState, useEffect, useCallback } from "react";
import { getProvider } from "../helpers";
import { clearIndexedDB } from "../services/dbService";

const useIsBlockchainReady = () => {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState();

  // Hardhat is hardcoded — only check that the node is reachable (no network detection)
  const fetchBlockchainData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = getProvider();

      if (!provider) {
        clearIndexedDB();
        setError("Blockchain provider not available.");
        setIsReady(false);
        return;
      }

      // Verify node is reachable; network is always Hardhat (31337), no detection
      await provider.getBlockNumber();
      setNetwork({ chainId: 31337, name: "hardhat" });
      setError(null);
      setIsReady(true);
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
