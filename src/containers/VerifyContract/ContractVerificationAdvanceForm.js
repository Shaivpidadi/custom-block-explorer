import React, { useState } from "react";
import Button from "../../components/UI/Button";

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
    <form
      onSubmit={handleSubmit}
      className="w-[70%] mx-auto p-4 bg-white shadow-md rounded-md text-left"
    >
      {/* Upload Contract Source Code Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Upload Contract Source Code
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          1. If it compiles correctly at REMIX, it should also compile correctly
          here.
          <br />
          2. This is an experimental module; Only flatten files supported.
        </p>
        <label className="block text-sm font-medium mb-1">
          Paste Solidity (.sol) code:
        </label>
        <textarea
          required
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          placeholder="Paste your Solidity code here..."
          className="w-full h-32 mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
        />
        <div className="text-sm text-gray-500 text-center">
          <p>
            <strong>Contract Address:</strong>{" "}
            {contractDetails?.contractAddress}
          </p>
          <p>
            <strong>Compiler Type:</strong>{" "}
            {contractDetails?.compilerType || "-"}
          </p>
          <p>
            <strong>Compiler Version:</strong>{" "}
            {contractDetails?.compilerVersion || "-"}
          </p>
        </div>
      </div>

      {/* Advanced Configuration Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Advanced Configuration</h2>

        <div className="grid  grid-cols-2 gap-4">
          <div className="">
            {/* Optimization */}
            <label className="block text-sm font-medium mb-1">
              Optimization
            </label>
            <select
              value={optimization}
              onChange={(e) => setOptimization(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            {/* Runs */}
            <label className="block text-sm font-medium mb-1">
              Runs (Optimizer)
            </label>
            <input
              type="number"
              value={runs}
              onChange={(e) => setRuns(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
              placeholder="200"
            />
          </div>

          <div>
            {/* EVM Version */}
            <label className="block text-sm font-medium mb-1">
              EVM Version to target
            </label>
            <select
              value={evmVersion}
              onChange={(e) => setEvmVersion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            >
              <option value="default">default (compiler defaults)</option>
              <option value="istanbul">Istanbul</option>
              <option value="berlin">Berlin</option>
              <option value="london">London</option>
            </select>
          </div>

          <div>
            {/* License Type */}
            <label className="block text-sm font-medium mb-1">
              License Type
            </label>
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            >
              <option value="Apache 2.0">Apache 2.0</option>
              <option value="MIT">MIT</option>
              <option value="GPL-3.0">GPL-3.0</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Constructor Arguments ABI-encoded
        </h2>
        <textarea
          // required
          value={constructorArgs}
          onChange={(e) => setConstructorArgs(e.target.value)}
          placeholder="Enter ABI-encoded constructor arguments here..."
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
        />
      </div>

      <div className="px-2 mt-4 mb-0 flex max-w-md m-auto">
        <Button label="Back" onClick={onBackClick} />
        <Button label="Submit" />
      </div>
    </form>
  );
};

export default ContractVerificationAdvancedForm;
