import React, { useState } from "react";
import { Table } from "antd";
import { getNFTTokenColumnConfig } from "../config";
import { useTokenList } from "../hooks";

const NFTTokens = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { tokens, loading } = useTokenList("nft");

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">NFT Transfers</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Total {tokens?.length || 0} NFT transfer transactions
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table
          size="middle"
          className={loading ? "animate-pulse" : ""}
          columns={[...getNFTTokenColumnConfig()]}
          dataSource={tokens || []}
          onChange={onTableChange}
          scroll={{ x: true }}
          pagination={{
            position: ["bottomRight"],
            current: pageNumber,
            pageSize: 10,
            total: tokens.length,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default NFTTokens;
