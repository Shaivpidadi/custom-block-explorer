import React, { useCallback, useState } from "react";

import TabButton from "../../components/UI/TabButton";
import AddressTransactionTab from "./AddressTransaction/AddressTransactionTab";
import AddressTokenTransfers from "./AddressTransaction/AddressTokenTransfers";
import AddressNFTTransfers from "./AddressTransaction/AddressNFTTransfers";

const TABS = [
  { id: 1, label: "Transactions", value: "transaction" },
  { id: 2, label: "Token Transfers", value: "tokenTransfers" },
  { id: 4, label: "NFT Transfers", value: "nftTransfer" },
  { id: 3, label: "Internal Txs", value: "internalTxs", disabled: true },
  { id: 5, label: "Assets", value: "assets", disabled: true },
  { id: 6, label: "Ens", value: "ens", disabled: true },
  { id: 7, label: "Blocks", value: "blocks", disabled: true },
];

const AddressSection = ({ transactions, tokenTransfers, nftTransfers }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "transaction") {
      return <AddressTransactionTab transactions={transactions} />;
    } else if (activeTab === "tokenTransfers") {
      return <AddressTokenTransfers transactions={tokenTransfers} />;
    } else if (activeTab === "nftTransfer") {
      return <AddressNFTTransfers transactions={nftTransfers} />;
    }
  }, [activeTab, transactions, tokenTransfers, nftTransfers]);

  return (
    <div>
      <div className="flex mt-3">
        <TabButton
          defaultActiveKey={activeTab}
          items={TABS}
          onTabButtonClick={onTabButtonClick}
        />
      </div>
      <div>{getActiveTabContent()}</div>
    </div>
  );
};

export default AddressSection;
