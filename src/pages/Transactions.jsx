import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { useLatestTransactions } from "../hooks";
import {
  getMethodNameFromData,
  getMethodNameFromDataWithoutABI,
  getTotalTxFromDB,
  getTxsFees,
} from "../helpers";
import {
  bnToCurrency,
  getCurrencyInEth,
  roundUpNumber,
  truncateAddress,
  humanizeString,
} from "../utils";

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
    dataIndex: "methodName",
    key: "methodName",
    render: (methodName, tx) => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
          methodName
            ? "bg-muted text-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {methodName ? humanizeString(methodName) : truncateAddress(tx.data)}
      </span>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-link text-sm font-mono">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (address, data) => (
      <Link
        to={`/address/${address || data.creates}`}
        className="text-link text-sm font-mono"
      >
        {address ? truncateAddress(address) : "Create: Contract"}
      </Link>
    ),
  },
  {
    title: "Amount",
    dataIndex: "value",
    key: "value",
    render: (value) => (
      <span className="font-medium text-sm">
        {roundUpNumber(bnToCurrency(value))}
      </span>
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

const Transactions = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTx, setTotalTx] = useState(0);

  const { transactions } = useLatestTransactions(pageNumber);

  useEffect(() => {
    const fetchTotalTx = async () => {
      const txCount = await getTotalTxFromDB();
      setTotalTx(txCount);
    };

    fetchTotalTx();
  }, [pageNumber]);

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (!transactions) {
      setTxs([]);
      return;
    }

    const fetchMethodNames = async () => {
      let data = [];
      for (const tx of transactions) {
        const methodName = await getMethodNameFromData(
          tx.data,
          tx.to || tx.creates
        );
        data.push({ ...tx, methodName });
      }
      setTxs(data);
    };

    fetchMethodNames();
  }, [transactions]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Total {totalTx} transactions
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table
          size="middle"
          columns={COLUMNS}
          dataSource={txs || []}
          onChange={onTableChange}
          scroll={{ x: true }}
          pagination={{
            position: ["bottomRight"],
            current: pageNumber,
            pageSize: 10,
            total: totalTx,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default Transactions;
