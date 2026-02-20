import React, { useEffect, useState } from "react";

const columns = [
  { title: "Block Number", dataIndex: "blockNumber", key: "blockNumber" },
  { title: "Hash", dataIndex: "hash", key: "hash" },
  { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
];

const data = [
  { key: 1, blockNumber: 12345, hash: "0xabc...", timestamp: "2024-10-11" },
];

const Blocks = () => {
  const [blockNumber, setBlockNumber] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Blocks</h1>
      <p> Current Block: {blockNumber}</p>
    </div>
  );
};
export default Blocks;
