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
      <Link className="text-blue-500" to={`/tx/${hash}`}>
        {truncateAddress(hash, 10)}
      </Link>
    ),
  },
  {
    title: "Method",
    dataIndex: "methodName",
    key: "methodName",
    render: (methodName, tx) => (
      <span className={!!methodName && "font-bold"}>
        {!!methodName ? humanizeString(methodName) : truncateAddress(tx.data)}
      </span>
    ),
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
    render: (address, data) => (
      <Link
        to={`/address/${!!address ? address : data.creates}`}
        className="text-blue-500"
      >
        {!!address ? truncateAddress(address) : "Create: Contract"}
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
          tx.data || "0x000",
          tx.to || tx.creates
        );
        data.push({ ...tx, methodName });
      }
      setTxs(data);
    };

    fetchMethodNames();
  }, [transactions]);

  return (
    <div className="p-6">
      <h1 className="ml-2 font-varela font-bold text-xl mx-auto">
        Latest Transactions
      </h1>
      <div className="mt-10 p-2">
        <h4>Total {totalTx} transactions</h4>
        <Table
          size="large"
          className="mt-4 overflow-x-scroll"
          columns={COLUMNS}
          dataSource={txs || []}
          onChange={onTableChange}
          pagination={{
            position: "bottom-right",
            current: pageNumber,
            pageSize: 10,
            total: totalTx,
          }}
        />
      </div>
    </div>
  );
};

export default Transactions;
