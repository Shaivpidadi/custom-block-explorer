import {
  ClipboardDocumentIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useCallback, useMemo, useState } from "react";
import { Collapse } from "antd";
import useContractFunctions from "../../../hooks/useContractFunctions";

const AddressContractVerifiedReadFunction = ({ address, abi }) => {
  const { readFunctions, callReadFunction } = useContractFunctions(
    address,
    abi
  );
  const [results, setResults] = useState({});
  const [inputValues, setInputValues] = useState({});

  const handleReadFunction = useCallback(
    async (key) => {
      const functionName = readFunctions[key].name;
      const inputs = inputValues[key] || [];

      let inputArgs = [];
      Object.values(inputs).map((v) => inputArgs.push(v));
      if (!results[key]) {
        try {
          const result = await callReadFunction(functionName, ...inputArgs);
          setResults((prevResults) => ({ ...prevResults, [key]: result }));
        } catch (error) {
          console.error(`Error calling read function ${functionName}:`, error);
          setResults((prevResults) => ({
            ...prevResults,
            [key]: "Error fetching result",
          }));
        }
      }
    },
    [callReadFunction, readFunctions, results, inputValues]
  );

  const handleInputChange = (key, index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...(prevValues[key] || []),
        [index]: value,
      },
    }));
  };

  const tabContent = useMemo(() => {
    return readFunctions.map((data, idx) => ({
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
          {data.inputs && data.inputs.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.inputs.map((input, i) => (
                <input
                  key={i}
                  placeholder={input.name || `Input ${i + 1}`}
                  className="px-3 py-2 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) => handleInputChange(idx, i, e.target.value)}
                />
              ))}
              <button
                onClick={() => handleReadFunction(idx)}
                className="mt-1 w-fit px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Query
              </button>
            </div>
          )}

          {results[idx] !== undefined && (
            <div className="mt-3 p-3 rounded-lg bg-[var(--color-code-bg)] border border-[var(--color-code-border)] text-sm font-mono">
              {readFunctions[idx].outputs &&
              readFunctions[idx].outputs.length > 0 ? (
                readFunctions[idx].outputs.map((output, outputIdx) => (
                  <p key={outputIdx} className="text-foreground">
                    <span className="text-muted-foreground">{output.type}:</span>{" "}
                    {Array.isArray(results[idx])
                      ? results[idx][outputIdx]?.toString()
                      : results[idx]?.toString()}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground">No output</p>
              )}
            </div>
          )}
        </div>
      ),
    }));
  }, [readFunctions, results, inputValues]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <DocumentIcon className="w-4 h-4" />
        Read contract functions
      </div>

      <div className="space-y-3">
        {tabContent.map((item) => (
          <div key={item.key} className="rounded-lg border border-border overflow-hidden">
            <Collapse
              accordion
              expandIconPosition="end"
              onChange={() => handleReadFunction(item.key)}
              items={[{ ...item, collapsible: "header" }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressContractVerifiedReadFunction;
