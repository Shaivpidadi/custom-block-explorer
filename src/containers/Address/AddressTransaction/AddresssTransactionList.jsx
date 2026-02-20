import React from "react";
import { Table } from "antd";

import { getTransactionColumnConfig } from "../../../config";

const COLUMNS = [
  ...getTransactionColumnConfig(),
  {
    title: "Type",
    dataIndex: "transactionType",
    key: "transactionType",
  },
];

const AddresssTransactionList = ({ transactions }) => {
  return (
    <div className="p-5">
      <p className="text-muted-foreground text-sm mb-4">
        Total {transactions?.length || 0} transactions with ETH transfer and
        contract creation
      </p>

      <Table
        size="middle"
        columns={COLUMNS}
        dataSource={transactions}
        scroll={{ x: true }}
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default AddresssTransactionList;
