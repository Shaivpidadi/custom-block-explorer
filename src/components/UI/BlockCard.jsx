import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { CubeIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

import { roundUpNumber, truncateAddress } from "../../utils";
import { ethers } from "ethers";

dayjs.extend(relativeTime);

const ListCard = ({
  blockNumber,
  timeStamp,
  producer,
  totalGasFees,
  averageGasPrice,
  txns,
  txValue = "",
  txhash = "",
  txFrom = "",
  txTo = "",
  creates = "",
  isTransaction = false,
  isLoading = false,
}) => {
  return (
    <div
      className={`group px-3 py-3 rounded-lg transition-colors hover:bg-muted/50 ${
        isLoading ? "animate-pulse" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-muted shrink-0">
          {isTransaction ? (
            <ArrowsRightLeftIcon className="w-4 h-4 text-muted-foreground" />
          ) : (
            <CubeIcon className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-8 gap-1 sm:gap-3">
          <div className="col-span-2">
            {!isTransaction ? (
              <Link
                to={`/block/${blockNumber}`}
                className="text-link font-semibold text-sm hover:opacity-80"
              >
                {blockNumber}
              </Link>
            ) : (
              <Link
                to={`/tx/${txhash}`}
                className="text-link font-semibold text-sm hover:opacity-80"
              >
                {truncateAddress(txhash)}
              </Link>
            )}
            <div className="text-muted-foreground text-xs">
              {dayjs.unix(timeStamp).isAfter(dayjs())
                ? dayjs.unix(timeStamp).fromNow()
                : dayjs().to(dayjs.unix(timeStamp))}
            </div>
          </div>

          {!isTransaction ? (
            <div className="col-span-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Producer </span>
                <Link
                  to={`/address/${producer}`}
                  className="text-link hover:opacity-80"
                >
                  {truncateAddress(producer)}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-foreground font-medium">
                  {txns} txs
                </span>
                <span className="text-muted-foreground">
                  Reward: {roundUpNumber(totalGasFees)} ETH
                </span>
              </div>
            </div>
          ) : (
            <div className="col-span-4">
              <div className="text-sm">
                <span className="text-muted-foreground">From </span>
                <Link
                  to={`/address/${txFrom}`}
                  className="text-link hover:opacity-80"
                >
                  {truncateAddress(txFrom)}
                </Link>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">To </span>
                <Link
                  to={`/address/${txTo || creates}`}
                  className="text-link hover:opacity-80"
                >
                  {txTo ? truncateAddress(txTo) : "Create: Contract"}
                </Link>
              </div>
            </div>
          )}

          <div className="flex col-span-2 items-center sm:justify-center">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-xs font-semibold text-foreground">
              {!isTransaction
                ? `${roundUpNumber(averageGasPrice)} Gwei`
                : `${roundUpNumber(ethers.utils.formatUnits(txValue, "ether"))} Eth`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
