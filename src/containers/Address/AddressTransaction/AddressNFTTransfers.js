import React from "react";
import { Table } from "antd";
import { getTokenTransferColumnConfig } from "../../../config";

const AddressNFTTransfers = ({ transactions }) => {
  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total {transactions?.length} transactions for NFT transfer </span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={[...getTokenTransferColumnConfig()]}
        dataSource={transactions}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default AddressNFTTransfers;
