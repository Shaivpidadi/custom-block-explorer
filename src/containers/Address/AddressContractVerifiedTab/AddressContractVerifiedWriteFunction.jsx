import React, { useState, useCallback, useMemo } from "react";
import {
  ClipboardDocumentIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { Collapse } from "antd";
import useContractFunctions from "../../../hooks/useContractFunctions";
import { Link } from "react-router-dom";
import { truncateAddress } from "../../../utils";

const AddressContractVerifiedWriteFunction = ({ address, abi }) => {
  const { writeFunctions, callWriteFunction } = useContractFunctions(
    address,
    abi
  );
  const [txStatus, setTxStatus] = useState({});
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (key, index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...(prevValues[key] || []),
        [index]: value,
      },
    }));
  };

  const handleWriteFunction = useCallback(
    async (event, key) => {
      event.preventDefault();
      const functionName = writeFunctions[key].name;
      const inputs = Object.values(inputValues[key] || {});

      try {
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "pending" },
        }));

        const tx = await callWriteFunction(functionName, ...inputs);
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "pending", transactionHash: tx?.hash },
        }));

        await tx?.wait();

        if (!tx?.hash) {
          setTxStatus((prevStatus) => ({
            ...prevStatus,
            [key]: { status: "failed" },
          }));
        } else {
          setTxStatus((prevStatus) => ({
            ...prevStatus,
            [key]: { status: "Success", transactionHash: tx?.hash },
          }));
        }
      } catch (error) {
        console.error(`Error calling write function ${functionName}:`, error);
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "error" },
        }));
      }
    },
    [callWriteFunction, writeFunctions, inputValues]
  );

  const tabContent = useMemo(() => {
    return writeFunctions.map((data, idx) => ({
      key: idx.toString(),
      label: `${idx + 1}. ${data.name}`,
      extra: (
        <ClipboardDocumentIcon
          className="h-4 w-4 text-muted-foreground"
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      ),
      children: (
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Function: <span className="font-mono text-foreground">{data.name}</span>
          </p>

          {data.inputs && data.inputs.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.inputs.map((input, i) => (
                <input
                  key={i}
                  placeholder={input.name || `Input ${i + 1} (${input.type})`}
                  className="px-3 py-2 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) => handleInputChange(idx, i, e.target.value)}
                />
              ))}
              <button
                onClick={(event) => handleWriteFunction(event, idx)}
                className="mt-1 w-fit px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Write
              </button>
            </div>
          )}

          {txStatus[idx]?.status && (
            <div className="mt-3 p-3 rounded-lg bg-[var(--color-code-bg)] border border-[var(--color-code-border)] text-sm">
              <span className={`font-medium ${
                txStatus[idx].status === "Success"
                  ? "text-success"
                  : txStatus[idx].status === "pending"
                  ? "text-primary"
                  : "text-danger"
              }`}>
                {txStatus[idx].status}
              </span>
              {txStatus[idx]?.transactionHash && (
                <span className="ml-2 text-muted-foreground">
                  Tx:{" "}
                  <Link to={`/tx/${txStatus[idx].transactionHash}`} className="text-link">
                    {truncateAddress(txStatus[idx].transactionHash)}
                  </Link>
                </span>
              )}
            </div>
          )}
        </div>
      ),
    }));
  }, [writeFunctions, txStatus, inputValues]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <DocumentIcon className="w-4 h-4" />
        Write contract functions
      </div>

      <div className="space-y-3">
        {tabContent.map((item) => (
          <div key={item.key} className="rounded-lg border border-border overflow-hidden">
            <Collapse
              accordion
              expandIconPosition="end"
              items={[{ ...item, collapsible: "header" }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressContractVerifiedWriteFunction;
