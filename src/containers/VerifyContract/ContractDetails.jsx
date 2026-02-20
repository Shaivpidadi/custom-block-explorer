import React, { useMemo, useState, useEffect } from "react";
import Button from "../../components/UI/Button";
import { getSolidityCompilerVersions } from "../../helpers/getSolidityCompilerVersions";

const inputClasses =
  "w-full px-3 py-2.5 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";
const labelClasses = "block text-sm font-medium text-foreground mb-1.5";

const ContractDetails = ({ contractDetails, onContinueClick }) => {
  const [solidityVersions, setSolidityVersions] = useState([]);

  const [contractAddress, setContractAddress] = useState(
    contractDetails?.contractAddress || ""
  );
  const [compilerType, setCompilerType] = useState(
    contractDetails?.compilerType || "solc"
  );
  const [compilerVersion, setCompilerVersion] = useState(
    contractDetails?.compilerVersion || ""
  );
  const [licenseType, setLicenseType] = useState(
    contractDetails?.licenseType || "mit"
  );

  useEffect(() => {
    const fetchVersions = async () => {
      const data = await getSolidityCompilerVersions();
      setSolidityVersions(data?.releases);
    };
    fetchVersions();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onContinueClick({
      contractAddress,
      compilerType,
      compilerVersion,
      licenseType,
    });
  };

  const solcVersions = useMemo(() => {
    if (!solidityVersions) return [];
    let data = [];
    Object.entries(solidityVersions).map(([k, v], idx) => {
      data.push({ key: idx, label: v, value: k });
    });
    return data;
  }, [solidityVersions]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClasses} htmlFor="contractAddress">
          Contract Address
        </label>
        <input
          required
          type="text"
          id="contractAddress"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="compilerType">
          Compiler Type
        </label>
        <select
          required
          id="compilerType"
          value={compilerType}
          onChange={(e) => setCompilerType(e.target.value)}
          className={inputClasses}
        >
          <option value="">Please Select</option>
          <option value="solc">Solidity</option>
          <option value="vyper">Vyper</option>
        </select>
      </div>

      <div>
        <label className={labelClasses} htmlFor="compilerVersion">
          Compiler Version
        </label>
        <select
          required
          id="compilerVersion"
          value={compilerVersion}
          onChange={(e) => setCompilerVersion(e.target.value)}
          className={inputClasses}
        >
          <option value="">Please Select</option>
          {solcVersions?.map(({ key, value, label }) => (
            <option key={key} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses} htmlFor="licenseType">
          Open Source License Type
        </label>
        <select
          required
          id="licenseType"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
          className={inputClasses}
        >
          <option value="">Please Select</option>
          <option value="mit">MIT</option>
          <option value="gpl">GPL-3.0</option>
          <option value="apache">Apache-2.0</option>
        </select>
      </div>

      <div className="pt-2 max-w-xs mx-auto">
        <Button label="Continue" type="submit" />
      </div>
    </form>
  );
};

export default ContractDetails;
