import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import BlockCard from "../../components/UI/BlockCard";
import Title from "../../components/UI/Title";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

const BlockListCard = ({ blocks, transactions, isLoading }) => {
  const navigate = useNavigate();

  const onBlockClick = () => navigate("/block-list");
  const onTransactionClick = () => navigate("/txs");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Title>Latest Blocks</Title>
          <button
            onClick={onBlockClick}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-border max-h-[480px] overflow-y-auto px-2">
          {blocks.map((block, index) => (
            <BlockCard isLoading={isLoading} key={index} {...block} />
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Button label="View All Blocks" variant="secondary" onClick={onBlockClick} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Title>Latest Transactions</Title>
          <button
            onClick={onTransactionClick}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-border max-h-[480px] overflow-y-auto px-2">
          {transactions.map((tx, index) => (
            <BlockCard
              isLoading={isLoading}
              key={index}
              {...tx}
              isTransaction
            />
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Button
            label="View All Transactions"
            variant="secondary"
            onClick={onTransactionClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockListCard;
