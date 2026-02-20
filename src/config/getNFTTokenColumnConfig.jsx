import { Link } from "react-router-dom";
import { truncateAddress } from "../utils";
import { getTransactionColumnConfig } from "./getTransactionColumnConfig";

export const getNFTTokenColumnConfig = () => {
  return [
    ...getTransactionColumnConfig(["txsFee", "value"]),
    {
      title: "Token",
      dataIndex: "tokenAddress",
      key: "tokenAddress",
      render: (tokenAddress) => (
        <Link to={`/address/${tokenAddress}`} className="text-link font-mono text-sm">
          {truncateAddress(tokenAddress)}
        </Link>
      ),
    },
    {
      title: "Token Id",
      dataIndex: "tokenId",
      key: "tokenId",
      render: (tokenId) => (
        <span className="font-semibold text-sm">{`NFT #${tokenId}`}</span>
      ),
    },
  ];
};
