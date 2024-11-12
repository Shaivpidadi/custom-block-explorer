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
      <Link className="text-[#1677ff]" to={`/tx/${hash}`}>
        {truncateAddress(hash, 10)}
      </Link>
    ),
  },
  {
    title: "Method",
    dataIndex: "data",
    key: "data",
    render: (data) => <span>{truncateAddress(data)}</span>,
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-blue-500">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-blue-500">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "Amount",
    dataIndex: "value",
    key: "value",
    render: (value) => (
      <span className="font-bold">{roundUpNumber(bnToCurrency(value))}</span>
    ),
  },
  {
    title: "Txn fee",
    dataIndex: "txsFee",
    key: "txsFee",
    render: (_, tx) => (
      <span className="font-bold">
        {roundUpNumber(getCurrencyInEth(getTxsFees(tx))) + " ETH"}
      </span>
    ),
  },
];

const BlockTransaction = ({ block }) => {
  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total {block.transactions?.length || 0} records</span>
        <span>Hide zero-amount txns</span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={COLUMNS}
        dataSource={block?.transactions || []}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default BlockTransaction;
