import React, { useCallback, useState } from "react";
import AddressContractVerifiedCode from "../AddressContractVerifiedTab/AddressContractVerifiedCode";
import TabButton from "../../../components/UI/TabButton";
import AddressContractVerifiedReadFunction from "../AddressContractVerifiedTab/AddressContractVerifiedReadFunction";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import AddressContractWriteFunctionWrapper from "../AddressContractVerifiedTab/AddressContractWriteFunctionWrapper";

const TABS = [
  { id: 1, label: "Code", value: "code" },
  { id: 2, label: "Read Functions", value: "readFunctions" },
  { id: 3, label: "Write Functions", value: "writeFunctions" },
];

const AddressContractVerified = ({ creationCode, abi, deploymentCode }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const { address } = useParams();

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "code") {
      return (
        <AddressContractVerifiedCode
          creationCode={creationCode}
          abi={abi}
          deploymentCode={deploymentCode}
        />
      );
    } else if (activeTab === "readFunctions") {
      return (
        <AddressContractVerifiedReadFunction address={address} abi={abi} />
      );
    } else if (activeTab === "writeFunctions") {
      return (
        <AddressContractWriteFunctionWrapper address={address} abi={abi} />
      );
    }
  }, [activeTab, creationCode, abi, deploymentCode, address]);

  return (
    <div className="space-y-4">
      <TabButton
        defaultActiveKey={activeTab}
        items={TABS}
        onTabButtonClick={onTabButtonClick}
      />

      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <CheckBadgeIcon className="w-5 h-5 text-success" />
        <span>Contract source code verified</span>
      </div>

      <div>{getActiveTabContent()}</div>
    </div>
  );
};

export default AddressContractVerified;
