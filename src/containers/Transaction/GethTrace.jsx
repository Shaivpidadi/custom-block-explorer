import React, { useMemo } from "react";
import { Table } from "antd";
import { useTransactionTrace } from "../../hooks";

const COLUMNS = [
  {
    title: "Step",
    dataIndex: "step",
    key: "step",
    render: (text) => <span className="text-muted-foreground text-sm">{text}</span>,
  },
  {
    title: "PC",
    dataIndex: "pc",
    key: "pc",
  },
  {
    title: "Operation",
    dataIndex: "op",
    key: "operation",
    render: (text) => (
      <span className="font-mono font-semibold text-sm text-primary">{text}</span>
    ),
  },
  {
    title: "Gas Limit",
    dataIndex: "gas",
    key: "gasLimittxs",
  },
  {
    title: "Gas Cost",
    dataIndex: "gasCost",
    key: "gasCost",
  },
  {
    title: "Depth",
    dataIndex: "depth",
    key: "depth",
  },
];

const GethTraces = ({ transaction }) => {
  const { trace } = useTransactionTrace(transaction.hash);

  const traceData = useMemo(() => {
    if (!trace) return [];
    let data = [];

    trace.structLogs?.map((tx, idx) => {
      data.push({ ...tx, step: `[${idx + 1}]` });
    });

    return data;
  }, [trace]);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm">
          Total {trace?.structLogs?.length || 0} steps
        </span>
      </div>

      <Table
        size="middle"
        columns={COLUMNS}
        dataSource={traceData}
        scroll={{ x: true }}
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default GethTraces;
