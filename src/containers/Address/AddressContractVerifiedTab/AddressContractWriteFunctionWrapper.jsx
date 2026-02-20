import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AddressContractVerifiedWriteFunction from "./AddressContractVerifiedWriteFunction";
import { truncateAddress } from "../../../utils";
import { useNavigate } from "react-router-dom";

const AddressContractWriteFunctionWrapper = ({ address, abi }) => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  const connectToWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const wallet = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(wallet);
    } catch (error) {
      console.error("User is not connected or MetaMask is locked:", error);
      setSigner(null);
      setWalletAddress(null);
    }
  };

  const connectToWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const hardhatChainId = "0x539";

        if (currentChainId !== hardhatChainId) {
          alert("Only Hardhat network is supported for now.");
          return;
        }

        await connectToWallet();
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    const checkExistingConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          await connectToWallet();
        }
      }
    };

    checkExistingConnection();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setSigner(null);
        setWalletAddress(null);
      } else {
        connectToWallet();
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const navigateToAddress = () => navigate(`/address/${walletAddress}`);

  return (
    <div className="space-y-4">
      <div>
        {!signer && !walletAddress ? (
          <button
            onClick={connectToWeb3}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Connect to Web3
          </button>
        ) : (
          <button
            onClick={navigateToAddress}
            className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium border border-border hover:bg-accent transition-colors"
          >
            Connected: {truncateAddress(walletAddress)}
          </button>
        )}
      </div>

      <AddressContractVerifiedWriteFunction
        address={address}
        abi={abi}
        signer={signer}
      />
    </div>
  );
};

export default AddressContractWriteFunctionWrapper;
