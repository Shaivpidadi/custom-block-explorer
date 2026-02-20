import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = {
  key: "1",
  block: 1,
  validator: "Mike",
  date: Date.now(),
  age: 32,
  txs: 123,
  blockSize: 4854,
  gasUsed: 234,
  gasLimit: 234,
  gasPrice: 12,
  blockRewards: 10,
};

const COLUMNS = [
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (blockNumber) => (
      <Link className="text-link font-semibold" to={`/tx/${blockNumber}`}>
        {blockNumber}
      </Link>
    ),
  },
  { title: "Date Time", dataIndex: "date", key: "date" },
  {
    title: "Validator",
    dataIndex: "validator",
    key: "validator",
    render: (text) => <span className="font-medium">{text}</span>,
  },
  { title: "Txns", dataIndex: "txs", key: "txs" },
  { title: "Block Size", dataIndex: "blockSize", key: "blockSize" },
  { title: "Gas Used", dataIndex: "gasUsed", key: "gasUsed" },
  { title: "Gas Limit", dataIndex: "gasLimit", key: "gasLimit" },
  {
    title: "Avg. Gas Price",
    dataIndex: "gasPrice",
    key: "gasPrice",
    render: (text) => <span className="font-medium">{text}</span>,
  },
  { title: "Block Rewards", dataIndex: "blockRewards", key: "blockRewards" },
];

const InternalTransaction = () => {
  const dataSource = useMemo(() => {
    let data = [];
    for (let i = 0; i <= Math.random() * 1000; i++) {
      data.push({ ...DATA, key: i });
    }
    return data;
  }, []);

  return (
    <div className="p-5">
      <p className="text-muted-foreground text-sm mb-4">
        Internal transactions with ETH transfer and contract creation
      </p>
      <Table
        size="middle"
        columns={COLUMNS}
        dataSource={dataSource}
        scroll={{ x: true }}
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default InternalTransaction;
