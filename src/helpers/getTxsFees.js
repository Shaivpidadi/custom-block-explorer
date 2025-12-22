import { ethers } from "ethers";

export const getTxsFees = (tx) => {
  try {
    const txnFee = tx.gasLimit.mul(tx.gasPrice);
    return txnFee;
  } catch (error) {
    return ethers.BigNumber.from("10000000").toString()
  }
};
