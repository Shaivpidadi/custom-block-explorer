import React from "react";
import CodeBlock from "../../../components/UI/CodeBlock";

const AddressContractVerifiedCode = ({ creationCode, abi, deploymentCode }) => {
  return (
    <div className="space-y-6">
      <CodeBlock
        label="Contract Creation Bytecode"
        content={creationCode}
        showCopy
      />
      <CodeBlock
        label="Contract ABI"
        content={JSON.stringify(abi)}
        showCopy
      />
      <CodeBlock
        label="Deployed Bytecode"
        content={deploymentCode}
        showCopy
      />
    </div>
  );
};

export default AddressContractVerifiedCode;
