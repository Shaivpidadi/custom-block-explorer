import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import {
  bnToCurrency,
  getCurrencyInEth,
  roundUpNumber,
  truncateAddress,
} from "../../utils";
import { getTxsFees } from "../../helpers";

const COLUMNS = [
  {
    title: "Tx Hash",
    dataIndex: "hash",
    key: "hash",
    render: (hash) => (
      <Link className="text-link font-semibold font-mono text-sm" to={`/tx/${hash}`}>
        {truncateAddress(hash, 10)}
      </Link>
    ),
  },
  {
    title: "Method",
    dataIndex: "data",
    key: "data",
    render: (data) => (
      <span className="text-sm font-mono text-muted-foreground">
        {truncateAddress(data)}
      </span>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-link font-mono text-sm">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-link font-mono text-sm">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "Amount",
    dataIndex: "value",
    key: "value",
    render: (value) => (
      <span className="font-medium text-sm">{roundUpNumber(bnToCurrency(value))}</span>
    ),
  },
  {
    title: "Txn Fee",
    dataIndex: "txsFee",
    key: "txsFee",
    render: (_, tx) => (
      <span className="font-medium text-muted-foreground text-sm">
        {roundUpNumber(getCurrencyInEth(getTxsFees(tx)))} ETH
      </span>
    ),
  },
];

const BlockTransaction = ({ block }) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm">
          Total {block.transactions?.length || 0} transactions
        </span>
      </div>

      <Table
        size="middle"
        columns={COLUMNS}
        dataSource={block?.transactions || []}
        scroll={{ x: true }}
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default BlockTransaction;
