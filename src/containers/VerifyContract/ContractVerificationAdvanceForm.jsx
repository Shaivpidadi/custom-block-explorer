import React, { useState } from "react";
import Button from "../../components/UI/Button";

const inputClasses =
  "w-full px-3 py-2.5 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";
const labelClasses = "block text-sm font-medium text-foreground mb-1.5";

const ContractVerificationAdvancedForm = ({
  contractDetails,
  onBackClick,
  onSubmitClick,
}) => {
  const [sourceCode, setSourceCode] = useState("");
  const [optimization, setOptimization] = useState("No");
  const [runs, setRuns] = useState(200);
  const [evmVersion, setEvmVersion] = useState("default");
  const [licenseType, setLicenseType] = useState("Apache 2.0");
  const [constructorArgs, setConstructorArgs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClick({
      sourceCode: sourceCode.trim(),
      optimization,
      runs,
      evmVersion,
      licenseType,
      constructorArgs,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          Upload Contract Source Code
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          If it compiles correctly at REMIX, it should also compile correctly
          here. Only flattened files are supported.
        </p>
        <label className={labelClasses}>Paste Solidity (.sol) code:</label>
        <textarea
          required
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          placeholder="// SPDX-License-Identifier: MIT&#10;pragma solidity ^0.8.0;&#10;..."
          className={`${inputClasses} h-36 font-mono resize-y`}
        />
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">Address:</strong>{" "}
            {contractDetails?.contractAddress}
          </span>
          <span>
            <strong className="text-foreground">Compiler:</strong>{" "}
            {contractDetails?.compilerType || "-"}
          </span>
          <span>
            <strong className="text-foreground">Version:</strong>{" "}
            {contractDetails?.compilerVersion || "-"}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">
          Advanced Configuration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Optimization</label>
            <select
              value={optimization}
              onChange={(e) => setOptimization(e.target.value)}
              className={inputClasses}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Runs (Optimizer)</label>
            <input
              type="number"
              value={runs}
              onChange={(e) => setRuns(e.target.value)}
              className={inputClasses}
              placeholder="200"
            />
          </div>
          <div>
            <label className={labelClasses}>EVM Version</label>
            <select
              value={evmVersion}
              onChange={(e) => setEvmVersion(e.target.value)}
              className={inputClasses}
            >
              <option value="default">Default (compiler defaults)</option>
              <option value="istanbul">Istanbul</option>
              <option value="berlin">Berlin</option>
              <option value="london">London</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>License Type</label>
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className={inputClasses}
            >
              <option value="Apache 2.0">Apache 2.0</option>
              <option value="MIT">MIT</option>
              <option value="GPL-3.0">GPL-3.0</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          Constructor Arguments (ABI-encoded)
        </h3>
        <textarea
          value={constructorArgs}
          onChange={(e) => setConstructorArgs(e.target.value)}
          placeholder="Enter ABI-encoded constructor arguments..."
          className={`${inputClasses} h-24 font-mono resize-y`}
        />
      </div>

      <div className="flex gap-3 max-w-md mx-auto pt-2">
        <Button label="Back" variant="secondary" onClick={onBackClick} />
        <Button label="Verify & Publish" type="submit" />
      </div>
    </form>
  );
};

export default ContractVerificationAdvancedForm;
