import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { BanknotesIcon } from "@heroicons/react/24/solid";

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
      className={`p-2 rounded-lg relative my-2 ${isLoading && "animate-pulse"}`}
    >
      <div className="absolute justify-center text-lg items-center top-[25%] left-[3%] hidden md:block">
        {!isTransaction ? "Bk" : "Tx"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-2 md:ml-12">
        <div className="col-span-2">
          {!isTransaction ? (
            <Link
              to={`/block/${blockNumber}`}
              className="text-blue-500 font-bold"
            >
              {blockNumber}
            </Link>
          ) : (
            <Link to={`/tx/${txhash}`} className="text-blue-500 font-bold">
              {truncateAddress(txhash)}
            </Link>
          )}
          <div className="text-gray-500">
            {dayjs.unix(timeStamp).isAfter(dayjs())
              ? dayjs.unix(timeStamp).fromNow()
              : dayjs().to(dayjs.unix(timeStamp))}
          </div>
        </div>

        {!isTransaction ? (
          <div className="col-span-4">
            <div className="text-gray-700">
              <span className="font-semibold">Producer: </span>
              <Link
                to={`/address/${producer}`}
                className="text-blue-500 truncate"
              >
                {truncateAddress(producer)}
              </Link>
            </div>
            <div className="flex">
              <span className="font-bold">{txns} txs &nbsp;</span>
              <div className="text-gray-500">
                <span className="font-semibold"> Reward: </span>
                {roundUpNumber(totalGasFees)} ETH
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-4">
            <div className="text-gray-700">
              <span className="font-semibold">From: &nbsp;</span>
              <Link
                to={`/address/${txFrom}`}
                className="text-blue-500 truncate"
              >
                {truncateAddress(txFrom)}
              </Link>
            </div>
            <div className="flex ">
              <span className="font-semibold">To: &nbsp;</span>
              <Link
                to={`/address/${!!txTo ? txTo : creates}`}
                className="text-blue-500 truncate"
              >
                {!!txTo ? truncateAddress(txTo) : "Create: Contract"}
              </Link>
            </div>
          </div>
        )}

        <div className="flex col-span-2 justify-start items-start sm:justify-center sm:items-center">
          <div className="flex items-center h-fit bg-[#e1dede6b] rounded">
            {!isTransaction && <BanknotesIcon className="w-4 h-4" />}
            {!isTransaction ? (
              <span className="ml-2 font-extrabold">
                {`${roundUpNumber(averageGasPrice)} Gwei`}
              </span>
            ) : (
              <span className="ml-2 font-extrabold">
                {`${roundUpNumber(
                  ethers.utils.formatUnits(txValue, "ether")
                )} Eth`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
