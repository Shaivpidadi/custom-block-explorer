import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getProvider } from "../helpers";

const provider = getProvider();

export const useAddressData = (address) => {
  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isContractAddress, setIsContractAddress] = useState(false);

  // Fetch ETH Balance and USD Value
  const fetchBalanceAndUsdValue = useCallback(async () => {
    try {
      if (!address) return;
      setLoading(true);
      const code = await provider.getCode(address);
      setIsContractAddress(code !== "0x");
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));

      // Fetch ETH/USD price
      //   const priceResponse = await axios.get(
      //     "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      //   );
      //   const ethPrice = priceResponse.data.ethereum.usd;
      //   setUsdValue((ethers.utils.formatEther(balance) * ethPrice).toFixed(2));
      setUsdValue(0);
    } catch (error) {
      setError("Failed to fetch balance or price");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Initial Fetch
  useEffect(() => {
    fetchBalanceAndUsdValue();
  }, [fetchBalanceAndUsdValue]);

  return {
    summary: {
      balance,
      usdValue,
    },
    loading,
    error,
    isContractAddress,
  };
};
