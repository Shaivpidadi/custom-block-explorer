import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = {
  key: "1",
  address: "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97",
  before: 234,
  after: 234,
  stateDifference: 12,
};

const COLUMNS = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <Link className="text-link font-mono text-sm" to={`/address/${address}`}>
        {address}
      </Link>
    ),
  },
  {
    title: "Before",
    dataIndex: "before",
    key: "before",
  },
  {
    title: "After",
    dataIndex: "after",
    key: "after",
  },
  {
    title: "State Difference",
    dataIndex: "stateDifference",
    key: "stateDifference",
  },
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
        The information below shows the changes to the current state of the
        respective addresses when this transaction is processed on the network
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
