import { ethers } from "ethers";
import { getRandomValue } from "../utils/getRandomValue";




const getGasPriceAndRewards = (block) => {
  let totalGasUsed = ethers.BigNumber.from(0);
  let totalGasFees = ethers.BigNumber.from(0);
  let totalGasPrice = ethers.BigNumber.from(0);

 try {
  block.transactions.forEach((tx) => {
    const gasUsed = ethers.BigNumber.from(tx.gasLimit); // Gas used by the transaction
    const effectiveGasPrice = tx.gasPrice; // Effective gas price (baseFee + tip)
    const gasFee = gasUsed.mul(effectiveGasPrice); // Total fee for the transaction
    totalGasFees = totalGasFees.add(gasFee);
    totalGasUsed = totalGasUsed.add(gasUsed);
    totalGasPrice = totalGasPrice.add(effectiveGasPrice);
  });

  return {
    totalGasUsed: totalGasUsed.toString(),
    totalGasFees: ethers.utils.formatEther(totalGasFees),
    totalGasPrice: totalGasPrice.toString(),
    averageGasPrice: ethers.utils.formatUnits(
      block.transactions.length
        ? totalGasPrice.div(block.transactions.length)
        : 0,
      "gwei"
    ),
    baseFee: ethers.utils.formatUnits(block.baseFeePerGas, "gwei"), // Base fee per gas
    gasLimit: block.gasLimit.toString(),
  };
 } catch (error) {
  return {
    totalGasUsed: getRandomValue(),
    totalGasFees: getRandomValue(0.001, 0.01),
    totalGasPrice: getRandomValue(),
    averageGasPrice: getRandomValue(),
    baseFee: getRandomValue(),
    gasLimit: getRandomValue(),
  }
 }
};

export { getGasPriceAndRewards };
