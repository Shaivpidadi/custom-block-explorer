import { ArrowRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import CodeBlock from "../../../components/UI/CodeBlock";
import { truncateAddress } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";

const CONTRACT_NAVIGATIONS = [
  {
    id: 1,
    label: "Verify the contract",
    to: "/verify-contract",
    isActive: true,
  },
  {
    id: 2,
    label: "Is this a proxy",
    to: "/is-this-proxy",
    isActive: false,
    icon: <ArrowRightIcon className="w-3 h-3 ml-1.5" />,
  },
  {
    id: 3,
    label: "Verify with API",
    to: "/verify-with-api",
    isActive: false,
    icon: <ArrowRightIcon className="w-3 h-3 ml-1.5" />,
  },
];

const AddressContractTab = ({
  deploymentCode,
  creationCode,
  contractCreator,
  contractTxHash,
}) => {
  const navigate = useNavigate();
  const { address } = useParams();

  const onRedirectClick = (to) => {
    navigate(`${to}/${address}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <InformationCircleIcon className="w-4 h-4 text-danger" />
          <span>Contract source code not verified</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Created by {truncateAddress(contractCreator)} at{" "}
          <span className="font-mono">{truncateAddress(contractTxHash)}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CONTRACT_NAVIGATIONS.map(({ label, id, isActive, icon, to }) => (
          <button
            key={id}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-accent border border-border"
            }`}
            onClick={() => onRedirectClick(to)}
          >
            {label} {icon}
          </button>
        ))}
      </div>

      <CodeBlock
        label="Contract deployment bytecode"
        content={deploymentCode}
        showCopy
      />

      <CodeBlock
        label="Contract creation bytecode"
        content={creationCode}
        showCopy
      />
    </div>
  );
};

export default AddressContractTab;
