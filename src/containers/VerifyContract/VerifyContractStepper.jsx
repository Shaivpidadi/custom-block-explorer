import React, { useEffect, useState } from "react";
import ContractDetails from "./ContractDetails";
import ContractVerificationAdvancedForm from "./ContractVerificationAdvanceForm";
import { compileContract } from "../../helpers/compileContract";
import {
  loadABIFromIndexedDB,
  saveABIToIndexedDB,
} from "../../services/dbService";
import { useNavigate, useParams } from "react-router-dom";
import { isContract } from "../../utils";

const STEPS = ["Enter Contract Details", "Verify and Publish"];

const VerifyContractStepper = () => {
  const [step, setStep] = useState(1);
  const [contractDetails, setContractDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { address } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = async () => {
      const abi = await loadABIFromIndexedDB(address);
      const isContractAddress = await isContract(address);
      if (!!abi || !isContractAddress) navigate(`/address/${address}`);
    };
    isVerified();
  }, [address, navigate]);

  const onContinueClick = (contractData) => {
    setStep((s) => s + 1);
    setContractDetails({ ...contractData });
  };

  const onBackClick = () => setStep(step - 1);

  const onSubmitClick = async (advancedData) => {
    setLoading(true);
    setContractDetails((contractData) => ({
      ...contractData,
      ...advancedData,
    }));

    try {
      const abi = await compileContract({
        sourceCode: advancedData.sourceCode,
        compilerVersion: contractDetails.compilerVersion,
        optimization: true,
        runs: 200,
      });
      await saveABIToIndexedDB(contractDetails?.contractAddress, abi);
      navigate(`/address/${contractDetails.contractAddress}`);
    } catch (error) {
      console.error("Error generating ABI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 py-6">
        {STEPS.map((label, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                index + 1 <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-sm ${
                index + 1 <= step
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className={`h-px w-12 ${
                  index + 1 < step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {step === 1 && (
          <ContractDetails
            step={step}
            contractDetails={contractDetails}
            onContinueClick={onContinueClick}
          />
        )}
        {step === 2 && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-muted-foreground text-sm">
                    Compiling and verifying...
                  </span>
                </div>
              </div>
            ) : (
              <ContractVerificationAdvancedForm
                step={step}
                contractDetails={contractDetails}
                onBackClick={onBackClick}
                onSubmitClick={onSubmitClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyContractStepper;
