import React from "react";
import { Table } from "antd";
import { getTokenTransferColumnConfig } from "../../../config";

const AddressTokenTransfers = ({ transactions }) => {
  return (
    <div className="p-5">
      <p className="text-muted-foreground text-sm mb-4">
        Total {transactions?.length || 0} token transfer transactions
      </p>

      <Table
        size="middle"
        columns={[...getTokenTransferColumnConfig()]}
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

export default AddressTokenTransfers;
