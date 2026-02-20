import React, { Fragment, useMemo } from "react";
import dayjs from "dayjs";

import ListItem from "../../components/UI/ListItem";
import { getDifficulty } from "../../utils";

import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Divider from "../../components/UI/Divider";
import { ethers } from "ethers";

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

const BlockTransaction = ({ block }) => {
  const blockOverview = useMemo(() => {
    if (!Object.keys(block).length) {
      return {};
    }

    const overview = [
      {
        id: "hash",
        label: "Block hash",
        value: block.hash,
        type: "string",
        showCopy: true,
      },
      {
        id: "confirmed",
        label: "Confirmed",
        value: block.confirmations,
        type: "number",
        info: "This indicates how many new blocks have been added to this chain since it was generated",
      },
      {
        id: "timestap",
        label: "Time",
        value: dayjs(block.timestamp * 1000).format("LLL"),
        type: "datetime",
      },
      {
        id: "timestampAgo",
        label: "Time Ago",
        value: dayjs(block.timestamp * 1000).fromNow(),
        type: "string",
      },
      {
        id: "transactions",
        label: "Transactions",
        value: `${block.transactions?.length || 0} txns`,
        type: "string",
      },
    ];

    const txs = [
      {
        id: "miner",
        label: "Miner",
        value: block.miner,
        type: "string",
        showCopy: true,
        link: true,
      },
      {
        id: "block_rewards",
        label: "Block rewards",
        value: `${block.totalGasFees} Gwei`,
        type: "string",
        info: "Total rewards gained by generating blocks and packaging transactions",
      },
      {
        id: "difficulty",
        label: "Difficulty",
        value: getDifficulty(block._difficulty),
        type: "number",
      },
      {
        id: "blockSize",
        label: "Block size",
        value: block.number,
        type: "string",
      },
    ];

    const gasData = [
      {
        id: "gasUsed",
        label: "Gas used",
        value: `${block.gasUsed} (${(
          (block.gasUsed / block.gasLimit) *
          100
        ).toFixed(2)}%)`,
        type: "string",
        info: "The total Gas used by all transactions in this block (excluding Blob Gas used) and its share in the total Gas limit",
      },
      {
        id: "gasLimit",
        label: "Gas limit",
        value: block.gasLimit,
        type: "number",
      },
      {
        id: "averageGasPrice",
        label: "Avg. Gas price",
        value: `${ethers.utils.formatUnits(
          ethers.utils.parseUnits(block.averageGasPrice?.toString(), "gwei"),
          "ether"
        )} ETH (${block.averageGasPrice} Gwei)`,
        type: "string",
        info: "Average fee per Gas of all transactions in this block, equivalent to: total Gas fee / Gas used",
      },
      {
        id: "baseFeePerGas",
        label: "Base fee per Gas",
        value: `${getDifficulty(block.baseFeePerGas)} ETH`,
        type: "string",
      },
    ];

    const metadata = [
      {
        id: "extraData",
        label: "Additional data",
        value: block.extraData,
        type: "string",
        showCopy: true,
      },
      {
        id: "parentHash",
        label: "Parent block hash",
        value: block.parentHash,
        type: "string",
        showCopy: true,
      },
      {
        id: "stateRoot",
        label: "State root",
        value: block.stateRoot || "N/A",
        type: "string",
      },
      {
        id: "nonce",
        label: "Nonce",
        value: block.nonce,
        type: "number",
      },
    ];
    return { overview, gasData, txs, metadata };
  }, [block]);

  return (
    <div className="p-5">
      <Fragment>
        {blockOverview?.overview?.map((data) => {
          return <ListItem key={data.id} {...data} />;
        })}
      </Fragment>
      <Divider />
      <Fragment>
        {blockOverview?.txs?.map((data) => {
          return <ListItem key={data.id} {...data} />;
        })}
      </Fragment>
      <Divider />
      <Fragment>
        {blockOverview?.gasData?.map((data) => {
          return <ListItem key={data.id} {...data} />;
        })}
      </Fragment>
      <Divider />
      <Fragment>
        {blockOverview?.metadata?.map((data) => {
          return <ListItem key={data.id} {...data} />;
        })}
      </Fragment>
    </div>
  );
};

export default BlockTransaction;
