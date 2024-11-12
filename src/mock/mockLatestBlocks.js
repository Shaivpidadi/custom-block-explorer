// mock/mockLatestBlocks.js

import { ethers } from "ethers";

export const mockLatestBlocks = [
    {
      number: 1234567,
      timestamp: 1682471100, // Unix timestamp
      transactions: [
        { 
          hash: "0x123abc...", 
          gasPrice: ethers.utils.parseUnits("50", "gwei").toString(),
          value: ethers.utils.parseEther("1").toString(), // 1 ETH
          from: "0xAddressFrom1",
          to: "0xAddressTo1",
        },
        { 
          hash: "0x124def...", 
          gasPrice: ethers.utils.parseUnits("60", "gwei").toString(),
          value: ethers.utils.parseEther("0.5").toString(), // 0.5 ETH
          from: "0xAddressFrom2",
          to: "0xAddressTo2",
        },
      ],
      miner: "0xMinerAddress1",
      gasUsed: ethers.BigNumber.from("3000000").toString(),
      gasLimit: ethers.BigNumber.from("10000000").toString(),
      difficulty: ethers.BigNumber.from("5000000").toString(),
    },
    {
      number: 1234566,
      timestamp: 1682470200,
      transactions: [
        { 
          hash: "0x125ghi...", 
          gasPrice: ethers.utils.parseUnits("55", "gwei").toString(),
          value: ethers.utils.parseEther("2").toString(), // 2 ETH
          from: "0xAddressFrom3",
          to: "0xAddressTo3",
        },
        { 
          hash: "0x126jkl...", 
          gasPrice: ethers.utils.parseUnits("70", "gwei").toString(),
          value: ethers.utils.parseEther("1.2").toString(), // 1.2 ETH
          from: "0xAddressFrom4",
          to: "0xAddressTo4",
        },
      ],
      miner: "0xMinerAddress2",
      gasUsed: ethers.BigNumber.from("2500000").toString(),
      gasLimit: ethers.BigNumber.from("10000000").toString(),
      difficulty: ethers.BigNumber.from("4000000").toString(),
    },
    {
      number: 1234565,
      timestamp: 1682469300,
      transactions: [
        { 
          hash: "0x127mno...", 
          gasPrice: ethers.utils.parseUnits("45", "gwei").toString(),
          value: ethers.utils.parseEther("0.8").toString(), // 0.8 ETH
          from: "0xAddressFrom5",
          to: "0xAddressTo5",
        },
      ],
      miner: "0xMinerAddress3",
      gasUsed: ethers.BigNumber.from("2800000").toString(),
      gasLimit: ethers.BigNumber.from("9000000").toString(),
      difficulty: ethers.BigNumber.from("6000000").toString(),
    },
    {
      number: 1234564,
      timestamp: 1682468400,
      transactions: [],
      miner: "0xMinerAddress4",
      gasUsed: ethers.BigNumber.from("2000000").toString(),
      gasLimit: ethers.BigNumber.from("8000000").toString(),
      difficulty: ethers.BigNumber.from("7000000").toString(),
    },
  ];
  