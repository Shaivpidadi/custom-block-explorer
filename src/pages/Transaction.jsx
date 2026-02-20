import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

import Divider from "../components/UI/Divider";
import TabButton from "../components/UI/TabButton";
import TransactionOverview from "../containers/Transaction/TransactionOverview";
import TransactionState from "../containers/Transaction/TransactionState";
import InternalTransaction from "../containers/Transaction/InternalTransaction";
import GethTraces from "../containers/Transaction/GethTrace";
import ParityTrace from "../containers/Transaction/ParityTrace";
import useTransactionData from "../hooks/useTransactionData";
import CopyBlock from "../components/CopyBlock";

const TABS = [
  { id: 1, label: "Overview", value: "overview" },
  { id: 4, label: "Geth Traces", value: "gethTrace" },
  { id: 2, label: "State", value: "state", disabled: true },
  { id: 3, label: "Internal Txs", value: "internalTxs", disabled: true },
  { id: 5, label: "Parity Traces", value: "paratyTrace", disabled: true },
];

const Transaction = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { hash } = useParams();
  const { transaction } = useTransactionData(hash);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "overview") {
      return <TransactionOverview transaction={transaction} />;
    } else if (activeTab === "state") {
      return <TransactionState transaction={transaction} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    } else if (activeTab === "gethTrace") {
      return <GethTraces transaction={transaction} />;
    } else {
      return <ParityTrace transaction={transaction} />;
    }
  }, [activeTab, transaction]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <ArrowsRightLeftIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Transaction Details
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground text-sm">Txn Hash:</span>
            <CopyBlock value={hash} />
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

export default Transaction;
