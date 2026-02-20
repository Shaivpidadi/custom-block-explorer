import React, { Fragment, useMemo } from "react";
import dayjs from "dayjs";

import ListItem from "../../components/UI/ListItem";

import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Divider from "../../components/UI/Divider";
import {
  bnToCurrency,
  getCurrencyInEth,
  humanizeString,
  truncateAddress,
} from "../../utils";

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

const TRANSACTION_TYPE_MAPPER = {
  0: "Legacy transaction (pre-EIP-1559) using only gasPrice",
  1: "Access list transaction (EIP-2930) allows specifying access lists to reduce gas costs",
  2: "EIP-1559 transaction with maxFeePerGas and maxPriorityFeePerGas fields",
  115: "Blob transaction (EIP-4844), used to carry large amounts of data in transactions (planned for future updates)",
};

const Badge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
        status
          ? "bg-success-light text-success-dark"
          : "bg-danger-light text-danger-dark"
      }`}
    >
      {status ? "Success" : "Failed"}
    </span>
  );
};

const BlockTransaction = ({ transaction }) => {
  const txOverview = useMemo(() => {
    if (!Object.keys(transaction).length) {
      return {};
    }

    let overview = [
      {
        id: "status",
        label: "Status",
        value: <Badge status={transaction.status} />,
        type: "string",
      },
      {
        id: "blockNumber",
        label: "Block",
        value: `${transaction.blockNumber} (${transaction.confirmations} Block Confirmations)`,
        type: "component",
      },
      {
        label: "Timestamp",
        value: `${dayjs(transaction?.block?.timestamp * 1000).format(
          "LLL"
        )} (${dayjs(transaction?.block?.timestamp * 1000).fromNow()})`,
        type: "datetime",
      },
    ];

    let txs = [
      {
        id: "from",
        label: "From Address",
        value: `${transaction.from}`,
        type: "string",
        showCopy: true,
        link: `/address/${transaction.from}`,
      },
      {
        label: "Method",
        value: transaction.methodName
          ? humanizeString(transaction.methodName)
          : truncateAddress(transaction.data),
        type: "string",
      },
      {
        label: "To Address",
        value: transaction.to ? transaction.to : transaction.creates,
        type: "string",
        info: "The receiver of this transaction",
        showCopy: true,
        link: `/address/${
          transaction.to ? transaction.to : transaction.creates
        }`,
      },
    ];

    let gasData = [
      {
        id: "value",
        label: "Amount",
        value: `${bnToCurrency(transaction.value)} ETH`,
        type: "number",
      },
      {
        id: "rewardData",
        label: "Transaction Fee",
        value: `${getCurrencyInEth(transaction.rewardData)} ETH`,
        type: "number",
      },
      {
        id: "gasPrice",
        label: "Gas Price",
        value: `${bnToCurrency(transaction.effectiveGasPrice)} Gwei`,
        type: "number",
        info: "The cost per Gas unit specified for this transaction, in ETH or Gwei. The higher the Gas Price, the greater the chance that the transaction will be included in the block",
      },
      {
        id: "gasLimit",
        label: "Gas Limit",
        type: "number",
        value: transaction.gasLimit?.toString(),
      },
      {
        id: "cumulativeGasUsed",
        label: "Gas Usage",
        type: "number",
        value: `${transaction.cumulativeGasUsed?.toString()} | (${(
          (transaction.cumulativeGasUsed / transaction.gasLimit) *
          100
        ).toFixed(2)}%)`,
      },
    ];

    let metadata = [
      {
        id: "type",
        label: "Other attributes",
        value: `${transaction.type} (${
          TRANSACTION_TYPE_MAPPER[transaction.type]
        })  ·  Nonce: ${transaction?.block?.nonce}  ·  Position in Block: ${
          transaction?.block?.number
        }`,
        type: "string",
      },
      {
        id: "data",
        label: "Input Data",
        value: `${transaction?.data}`,
        type: "codeblock",
        info: "The method called by the initiator and the parameters passed in when calling a smart contract. If the contract failed to be verified, the data will display as hexadecimal numbers and cannot be parsed out",
      },
    ];
    return { overview, txs, gasData, metadata };
  }, [transaction]);

  return (
    <div className="p-5">
      <Fragment>
        {txOverview.overview?.map((data) => {
          return <ListItem key={data.id || data.label} {...data} />;
        })}
        <Divider />
      </Fragment>

      <Fragment>
        {txOverview.txs?.map((data) => {
          return <ListItem key={data.id || data.label} {...data} />;
        })}
        <Divider />
      </Fragment>

      <Fragment>
        {txOverview.gasData?.map((data) => {
          return <ListItem key={data.id || data.label} {...data} />;
        })}
        <Divider />
      </Fragment>

      <Fragment>
        {txOverview.metadata?.map((data) => {
          return <ListItem key={data.id || data.label} {...data} />;
        })}
      </Fragment>
    </div>
  );
};

export default BlockTransaction;
