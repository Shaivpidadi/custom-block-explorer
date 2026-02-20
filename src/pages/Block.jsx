import React, { useCallback, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { CubeIcon } from "@heroicons/react/24/outline";

import Divider from "../components/UI/Divider";
import TabButton from "../components/UI/TabButton";
import BlockOverview from "../containers/Block/BlockOverview";
import BlockTransactions from "../containers/Block/BlockTransaction";
import InternalTransaction from "../containers/Block/InternalTransaction";
import TokenTransfer from "../containers/Block/TokenTransfer";
import Withdrawals from "../containers/Block/Withdrawals";
import { useNavigate, useParams } from "react-router-dom";
import useBlockData from "../hooks/useBlockData";

const TABS = [
  { id: "overview", label: "Overview", value: "overview" },
  { id: "transaction", label: "Transactions", value: "transaction" },
  {
    id: "internalTxs",
    label: "Internal Txs",
    value: "internalTxs",
    disabled: true,
  },
  {
    id: "tokenTransfer",
    label: "Token Transfers",
    value: "tokenTransfer",
    disabled: true,
  },
  {
    id: "withdrawal",
    label: "Withdrawals",
    value: "withdrawal",
    disabled: true,
  },
];

const Block = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { id } = useParams();
  const navigate = useNavigate();

  const { block } = useBlockData(Number(id));

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const onPreviousBlockClick = (event) => {
    event.preventDefault();
    navigate(`/block/${Number(id) - 1}`, { replace: false });
  };

  const onNextBlockClick = (event) => {
    event.preventDefault();
    navigate(`/block/${Number(id) + 1}`, { replace: false });
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "overview") {
      return <BlockOverview block={block} />;
    } else if (activeTab === "transaction") {
      return <BlockTransactions block={block} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction block={block} />;
    } else if (activeTab === "tokenTransfer") {
      return <TokenTransfer block={block} />;
    } else {
      return <Withdrawals block={block} />;
    }
  }, [activeTab, id, block]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <CubeIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">Block</h1>
            <div className="flex items-center gap-1">
              <button
                onClick={onPreviousBlockClick}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <span className="text-foreground font-semibold font-mono text-sm px-1">
                #{id || ""}
              </span>
              <button
                onClick={onNextBlockClick}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <TabButton
        defaultActiveKey={activeTab}
        items={TABS}
        onTabButtonClick={onTabButtonClick}
      />

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {getActiveTabContent()}
      </div>
    </div>
  );
};

export default Block;
