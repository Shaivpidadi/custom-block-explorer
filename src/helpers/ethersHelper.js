import { ethers } from "ethers";

const DEFAULT_RPC_URL = "http://127.0.0.1:8545";

// Strip surrounding quotes from .env values (e.g. 'http://...' or "http://...")
const stripEnvUrl = (value) => {
  if (value == null || typeof value !== "string") return "";
  const s = value.trim();
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.slice(1, -1).trim();
  }
  return s;
};

// Hardhat local network — no auto-detection, avoids NETWORK_ERROR
const HARDHAT_NETWORK = { chainId: 31337, name: "hardhat" };

// Function to get an Ethers provider (hardcoded Hardhat local node)
export const getProvider = () => {
  const rpcUrl = stripEnvUrl(import.meta.env.VITE_PROVIDER) || DEFAULT_RPC_URL;
  return new ethers.providers.JsonRpcProvider(rpcUrl, HARDHAT_NETWORK);
};

// Function to create a new contract instance
export const getContract = (contractAddress, abi, signer) => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getSocketProvider = () => {
  const wsUrl = stripEnvUrl(import.meta.env.VITE_WS_PROVIDER) || "ws://127.0.0.1:8545";
  return new ethers.providers.WebSocketProvider(wsUrl, HARDHAT_NETWORK);
};
