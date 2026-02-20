import React from "react";
import ListItem from "../../components/UI/ListItem";
import Divider from "../../components/UI/Divider";

import { useParityTraceTransaction } from "../../hooks";

const OVERVIEW = [
  {
    action: 1,
    from: "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
    callType: "call",
    gasLimit: 31118,
    to: "0xe082b284a7e3ccee3765c29283a622fb5eadc92a",
    value: "0.055624924205467283 ETH",
    error: "--",
    gasUsed: 31118,
    subtraces: 2,
    type: "call",
    inputData: "0x",
    outputData: "0x",
  },
  {
    action: 2,
    from: "0xe082b284a7e3ccee3765c29283a622fb5eadc92a",
    callType: "staticcall",
    gasLimit: 5169,
    to: "0x3c55986cfee455e2533f4d29006634ecf9b7c03f",
    contractName: "UpgradeableBeacon",
    value: "0 ETH",
    error: "--",
    gasUsed: 2307,
    subtraces: 0,
    type: "call",
    inputData: "0x5c60da1b",
    outputData: "0x00000000",
  },
  {
    action: 3,
    from: "0xe082b284a7e3ccee3765c29283a622fb5eadc92a",
    callType: "delegatecall",
    gasLimit: 92,
    to: "0x942ceddafe32395608f99dea7b6ea8801a8f4748",
    value: "0.055624924205467283 ETH",
    error: "--",
    gasUsed: 55,
    subtraces: 0,
    type: "call",
    inputData: "0x",
    outputData: "0x",
  },
];

const ParityTrace = ({ transaction }) => {
  const { trace } = useParityTraceTransaction(transaction.hash);

  return (
    <div className="p-5">
      <p className="text-muted-foreground text-sm mb-4">
        Total {OVERVIEW.length} actions
      </p>

      {OVERVIEW.map((data, idx) => {
        return (
          <div key={idx} className="mb-2">
            {Object.keys(data).map((k) => {
              return (
                <ListItem
                  key={k}
                  label={k}
                  value={data[k]}
                  withTooltip={Math.random() * 10 > 5}
                  info={data[k]}
                />
              );
            })}
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default ParityTrace;
