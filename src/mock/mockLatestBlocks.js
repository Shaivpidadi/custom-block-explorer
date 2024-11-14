// mock/mockLatestBlocks.js

import { ethers } from "ethers";
import { getRandomValue } from "../utils/getRandomValue";

export const mockLatestBlocks = [
  {
    number: 1234567,
    timestamp: 1682475100,
    transactions: [
      {
        hash: "0x1a2b3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ab",
        gasPrice: ethers.utils.parseUnits("50", "gwei").toString(),

        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA123B456C789D123E456F789A0123456789ABcDe",
        to: "0xB123A456C789E123D456F789A0123456789BCdEf",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x2b3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890cd",
        gasPrice: ethers.utils.parseUnits("60", "gwei").toString(),

        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xC123D456E789F123A456B789C0123456789DEfGh",
        to: "0xD123E456A789B123C456D789A0123456789FgHiJ",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xE123F456A789C123D456E789B0123456789GhIjK",
    gasUsed: ethers.BigNumber.from("3000000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("5000000").toString(),
  },
  {
    number: 1234566,
    timestamp: 1682470200,
    transactions: [
      {
        hash: "0x3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ef",
        gasPrice: ethers.utils.parseUnits("55", "gwei").toString(),

        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xF123A456B789C123D456E789A0123456789HiJkL",
        to: "0xA123F456C789E123B456D789A0123456789JkLmN",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890gh",
        gasPrice: ethers.utils.parseUnits("70", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xB123C456D789A123E456F789A0123456789KlMnO",
        to: "0xC123D456A789B123E456F789A0123456789LmNoP",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xD123E456A789F123B456C789A0123456789NoPqR",
    gasUsed: ethers.BigNumber.from("2500000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("4000000").toString(),
  },
  {
    number: 1234565,
    timestamp: 1682469300,
    transactions: [
      {
        hash: "0x5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ij",
        gasPrice: ethers.utils.parseUnits("45", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xE123F456A789B123C456D789A0123456789OpQrS",
        to: "0xF123A456C789D123E456B789A0123456789QrStU",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xG123H456A789I123J456K789A0123456789StUvW",
    gasUsed: ethers.BigNumber.from("2800000").toString(),
    gasLimit: ethers.BigNumber.from("9000000").toString(),
    difficulty: ethers.BigNumber.from("6000000").toString(),
  },
  {
    number: 1234564,
    timestamp: 1682468400,
    transactions: [],
    miner: "0xH123I456A789J123K456L789A0123456789UvWxY",
    gasUsed: ethers.BigNumber.from("2000000").toString(),
    gasLimit: ethers.BigNumber.from("8000000").toString(),
    difficulty: ethers.BigNumber.from("7000000").toString(),
  },
  {
    number: 1234563,
    timestamp: 1682467500,
    transactions: [
      {
        hash: "0x6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890kl",
        gasPrice: ethers.utils.parseUnits("65", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xI123J456A789K123L456M789A0123456789WxYzZ",
        to: "0xJ123K456A789L123M456N789A0123456789ZzAaB",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x7a8b9c0d1234567890abcdef1234567890abcdef1234567890mn",
        gasPrice: ethers.utils.parseUnits("40", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xK123L456A789M123N456O789A0123456789AaBcD",
        to: "0xL123M456A789N123O456P789A0123456789CdEfG",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xM123N456A789O123P456Q789A0123456789EfGhI",
    gasUsed: ethers.BigNumber.from("2900000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("6500000").toString(),
  },
  {
    number: 1234562,
    timestamp: 1682466600,
    transactions: [
      {
        hash: "0x8b9c0d1234567890abcdef1234567890abcdef1234567890pq",
        gasPrice: ethers.utils.parseUnits("90", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA789B456A789B123C456D789A0123456789UvWxY",
        to: "0xB123F456C789A123B456C789A0123456789ZzBcD",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xA789J456C789B123A456F789A0123456789PoRtS",
    gasUsed: ethers.BigNumber.from("2300000").toString(),
    gasLimit: ethers.BigNumber.from("11000000").toString(),
    difficulty: ethers.BigNumber.from("5200000").toString(),
  },
  {
    number: 1234561,
    timestamp: 1682465700,
    transactions: [
      {
        hash: "0x123c4b5d6789a4c5d123a5c9f8c7e6a5b0c4d5b9c1f9a0c4",
        gasPrice: ethers.utils.parseUnits("35", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA3B456A5B123C345D12F789A0133456A789BCD",
        to: "0xB2A1A6A5B564C1E789D564F7890113455B7ABCD",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xG123A56A9A345B12F64E11B789D1234511B78E",
    gasUsed: ethers.BigNumber.from("2200000").toString(),
    gasLimit: ethers.BigNumber.from("11500000").toString(),
    difficulty: ethers.BigNumber.from("5800000").toString(),
  },
  {
    number: 1234560,
    timestamp: 1682464800,
    transactions: [
      {
        hash: "0x3c5b7e9f4a5d6c7b1a2d5a6b5c8e9d1f9c6e7b5a9c8a3b5",
        gasPrice: ethers.utils.parseUnits("42", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xC5A1A6B5A3D7891B64D5C12A5A789F1123E89F",
        to: "0xD2C4A7B2A1C6E5D7A5F3A1B123A578C1A789G1F",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xD2A7895E64B13A3D56C1B7E9F2D3A4C1E89A3F",
    gasUsed: ethers.BigNumber.from("2600000").toString(),
    gasLimit: ethers.BigNumber.from("12000000").toString(),
    difficulty: ethers.BigNumber.from("6200000").toString(),
  },
  {
    number: 1234567,
    timestamp: 1682475100,
    transactions: [
      {
        hash: "0x1a2b3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ab",
        gasPrice: ethers.utils.parseUnits("50", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA123B456C789D123E456F789A0123456789ABcDe",
        to: "0xB123A456C789E123D456F789A0123456789BCdEf",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x2b3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890cd",
        gasPrice: ethers.utils.parseUnits("60", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xC123D456E789F123A456B789C0123456789DEfGh",
        to: "0xD123E456A789B123C456D789A0123456789FgHiJ",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xE123F456A789C123D456E789B0123456789GhIjK",
    gasUsed: ethers.BigNumber.from("3000000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("5000000").toString(),
  },
  {
    number: 1234566,
    timestamp: 1682470200,
    transactions: [
      {
        hash: "0x3c4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ef",
        gasPrice: ethers.utils.parseUnits("55", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xF123A456B789C123D456E789A0123456789HiJkL",
        to: "0xA123F456C789E123B456D789A0123456789JkLmN",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x4d5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890gh",
        gasPrice: ethers.utils.parseUnits("70", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xB123C456D789A123E456F789A0123456789KlMnO",
        to: "0xC123D456A789B123E456F789A0123456789LmNoP",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xD123E456A789F123B456C789A0123456789NoPqR",
    gasUsed: ethers.BigNumber.from("2500000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("4000000").toString(),
  },
  {
    number: 1234565,
    timestamp: 1682469300,
    transactions: [
      {
        hash: "0x5e6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890ij",
        gasPrice: ethers.utils.parseUnits("45", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xE123F456A789B123C456D789A0123456789OpQrS",
        to: "0xF123A456C789D123E456B789A0123456789QrStU",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xG123H456A789I123J456K789A0123456789StUvW",
    gasUsed: ethers.BigNumber.from("2800000").toString(),
    gasLimit: ethers.BigNumber.from("9000000").toString(),
    difficulty: ethers.BigNumber.from("6000000").toString(),
  },
  {
    number: 1234564,
    timestamp: 1682468400,
    transactions: [],
    miner: "0xH123I456A789J123K456L789A0123456789UvWxY",
    gasUsed: ethers.BigNumber.from("2000000").toString(),
    gasLimit: ethers.BigNumber.from("8000000").toString(),
    difficulty: ethers.BigNumber.from("7000000").toString(),
  },
  {
    number: 1234563,
    timestamp: 1682467500,
    transactions: [
      {
        hash: "0x6f7a8b9c0d1234567890abcdef1234567890abcdef1234567890kl",
        gasPrice: ethers.utils.parseUnits("65", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xI123J456A789K123L456M789A0123456789WxYzZ",
        to: "0xJ123K456A789L123M456N789A0123456789ZzAaB",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
      {
        hash: "0x7a8b9c0d1234567890abcdef1234567890abcdef1234567890mn",
        gasPrice: ethers.utils.parseUnits("40", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xK123L456A789M123N456O789A0123456789AaBcD",
        to: "0xL123M456A789N123O456P789A0123456789CdEfG",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xM123N456A789O123P456Q789A0123456789EfGhI",
    gasUsed: ethers.BigNumber.from("2900000").toString(),
    gasLimit: ethers.BigNumber.from("10000000").toString(),
    difficulty: ethers.BigNumber.from("6500000").toString(),
  },
  {
    number: 1234562,
    timestamp: 1682466600,
    transactions: [
      {
        hash: "0x8b9c0d1234567890abcdef1234567890abcdef1234567890pq",
        gasPrice: ethers.utils.parseUnits("90", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA789B456A789B123C456D789A0123456789UvWxY",
        to: "0xB123F456C789A123B456C789A0123456789ZzBcD",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xA789J456C789B123A456F789A0123456789PoRtS",
    gasUsed: ethers.BigNumber.from("2300000").toString(),
    gasLimit: ethers.BigNumber.from("11000000").toString(),
    difficulty: ethers.BigNumber.from("5200000").toString(),
  },
  {
    number: 1234561,
    timestamp: 1682465700,
    transactions: [
      {
        hash: "0x123c4b5d6789a4c5d123a5c9f8c7e6a5b0c4d5b9c1f9a0c4",
        gasPrice: ethers.utils.parseUnits("35", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xA3B456A5B123C345D12F789A0133456A789BCD",
        to: "0xB2A1A6A5B564C1E789D564F7890113455B7ABCD",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xG123A56A9A345B12F64E11B789D1234511B78E",
    gasUsed: ethers.BigNumber.from("2200000").toString(),
    gasLimit: ethers.BigNumber.from("11500000").toString(),
    difficulty: ethers.BigNumber.from("5800000").toString(),
  },
  {
    number: 1234560,
    timestamp: 1682464800,
    transactions: [
      {
        hash: "0x3c5b7e9f4a5d6c7b1a2d5a6b5c8e9d1f9c6e7b5a9c8a3b5",
        gasPrice: ethers.utils.parseUnits("42", "gwei").toString(),
        value: ethers.utils.parseEther(getRandomValue(0.0001, 3, true)).toString(),
        from: "0xC5A1A6B5A3D7891B64D5C12A5A789F1123E89F",
        to: "0xD2C4A7B2A1C6E5D7A5F3A1B123A578C1A789G1F",
        gasLimit: ethers.BigNumber.from("10000000").toString()
      },
    ],
    miner: "0xD2A7895E64B13A3D56C1B7E9F2D3A4C1E89A3F",
    gasUsed: ethers.BigNumber.from("2600000").toString(),
    gasLimit: ethers.BigNumber.from("12000000").toString(),
    difficulty: ethers.BigNumber.from("6200000").toString(),
  },
];
