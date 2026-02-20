import React, { useMemo, useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { useLatestBlocks } from "../hooks";
import { getGasPriceAndRewards } from "../helpers";
import { bnToCurrency, roundUpNumber, truncateAddress } from "../utils";

dayjs.extend(LocalizedFormat);

const COLUMNS = [
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (blockNumber) => (
      <Link className="text-link font-semibold" to={`/block/${blockNumber}`}>
        {blockNumber}
      </Link>
    ),
  },
  {
    title: "Date Time",
    dataIndex: "date",
    key: "date",
    render: (text) => (
      <span className="text-muted-foreground text-sm">
        {dayjs(text).format("L LT")}
      </span>
    ),
  },
  {
    title: "Validator",
    dataIndex: "validator",
    key: "validator",
    render: (text) => (
      <span className="font-medium font-mono text-sm">
        {truncateAddress(text)}
      </span>
    ),
  },
  {
    title: "Txns",
    dataIndex: "txs",
    key: "txs",
  },
  {
    title: "Block Size",
    dataIndex: "blockSize",
    key: "blockSize",
  },
  {
    title: "Gas Used",
    dataIndex: "gasUsed",
    key: "gasUsed",
    render: (text) => (
      <span className="font-medium text-sm">
        {roundUpNumber(bnToCurrency(text))} Gwei
      </span>
    ),
  },
  {
    title: "Gas Limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
    render: (text) => (
      <span className="font-medium text-sm">
        {roundUpNumber(bnToCurrency(text))} Gwei
      </span>
    ),
  },
  {
    title: "Avg. Gas Price",
    dataIndex: "gasPrice",
    key: "gasPrice",
    render: (text) => (
      <span className="font-medium text-sm">
        {roundUpNumber(bnToCurrency(text))} Gwei
      </span>
    ),
  },
  {
    title: "Block Rewards",
    dataIndex: "blockRewards",
    key: "blockRewards",
    render: (text) => (
      <span className="font-medium text-sm">
        {roundUpNumber(bnToCurrency(text))} Gwei
      </span>
    ),
  },
];

const Blocks = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { blocks, loading, totalBlocks } = useLatestBlocks(pageNumber);

  const dataSource = useMemo(() => {
    let data = [];

    blocks.map((block) => {
      const { averageGasPrice, totalGasFees } = getGasPriceAndRewards(block);

      data.push({
        key: block.hash,
        block: block.number,
        validator: block.miner,
        date: block.timestamp,
        txs: block.transactions.length,
        blockSize: block.number,
        gasUsed: block.gasUsed,
        gasLimit: block.gasLimit,
        gasPrice: averageGasPrice,
        blockRewards: totalGasFees,
      });
    });

    return data;
  }, [blocks]);

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Blocks</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Total {totalBlocks} blocks
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table
          size="middle"
          className={`${loading ? "animate-pulse" : ""}`}
          columns={COLUMNS}
          dataSource={dataSource}
          onChange={onTableChange}
          scroll={{ x: true }}
          pagination={{
            position: ["bottomRight"],
            current: pageNumber,
            pageSize: 10,
            total: totalBlocks,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default Blocks;
