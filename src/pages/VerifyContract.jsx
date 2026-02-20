import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import VerifyContractStepper from "../containers/VerifyContract/VerifyContractStepper";

const VerifyContract = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-xl bg-muted mb-4">
          <ShieldCheckIcon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Verify & Publish Contract Source Code
        </h1>
        <p className="mt-3 text-muted-foreground max-w-lg">
          Source code verification provides transparency for users interacting
          with smart contracts. By uploading the source code, the explorer will
          match the compiled code with that on the blockchain.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card p-6">
        <VerifyContractStepper />
      </div>
    </div>
  );
};

export default VerifyContract;
