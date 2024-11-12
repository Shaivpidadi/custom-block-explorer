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
  { id: 3, label: "Write Functions ", value: "writeFunctions" },
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
    <div>
      <div className="flex mt-3">
        <TabButton
          defaultActiveKey={activeTab}
          items={TABS}
          onTabButtonClick={onTabButtonClick}
        />
      </div>
      {/* <Divider /> */}

      <div className="flex flex-col">
        <div className="flex text-center items-center mx-3 my-5 text-black font-semibold">
          <CheckBadgeIcon className="w-4 h-4 mr-2 bg-green" />
          <span>Contract source code verified</span>
        </div>
        <div className="mx-3 my-3">{getActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default AddressContractVerified;
