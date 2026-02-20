import React, { useMemo } from "react";
import { Table } from "antd";

const DATA = {
  operation: "1",
  from: 1,
  to: "Mike",
  gasLimit: 23,
  amount: 12,
};

const COLUMNS = [
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Gas Limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
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
