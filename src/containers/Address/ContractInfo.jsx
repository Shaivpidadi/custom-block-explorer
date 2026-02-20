import React from "react";
import { truncateAddress } from "../../utils";
import { CubeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ContractInfo = ({ creator, txHash, tokenInfo }) => {
  return (
    <div>
      <h2 className="font-bold text-base text-foreground mb-4">
        Contract Info
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Contract Creator
          </p>
          <div className="text-sm">
            <Link className="text-link hover:opacity-80" to={`/address/${creator}`}>
              {truncateAddress(creator)}
            </Link>
            <span className="text-muted-foreground mx-1">at txn</span>
            <Link className="text-link hover:opacity-80" to={`/tx/${txHash}`}>
              {truncateAddress(txHash)}
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Token Tracker
          </p>
          <div className="flex items-center gap-1.5 text-sm text-foreground">
            <CubeIcon className="w-4 h-4 text-muted-foreground" />
            {`${tokenInfo?.symbol} (${tokenInfo?.name})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
