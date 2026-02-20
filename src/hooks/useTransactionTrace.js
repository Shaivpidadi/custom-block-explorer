import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useTransactionTrace = (txHash) => {
  const [trace, setTrace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactionTrace = useCallback(async () => {
    if (!txHash) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(import.meta.env.VITE_PROVIDER, {
        jsonrpc: "2.0",
        method: "debug_traceTransaction",
        params: [txHash, {}],
        id: 1,
      });

      setTrace(response.data.result);
    } catch (err) {
      console.error("Error fetching transaction trace:", err);
      setError(err.message || "Failed to fetch transaction trace");
    } finally {
      setLoading(false);
    }
  }, [txHash]);

  useEffect(() => {
    fetchTransactionTrace();
  }, [fetchTransactionTrace]);

  return {
    trace,
    loading,
    error,
    refresh: fetchTransactionTrace,
  };
};
