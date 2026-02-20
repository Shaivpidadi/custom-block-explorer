import React from "react";
import { useParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

import Divider from "../components/UI/Divider";
import CopyBlock from "../components/CopyBlock";
import AddressOverview from "../containers/Address/AddressOverview";
import TransactionInfo from "../containers/Address/TransactionInfo";
import MoreInfo from "../containers/Address/MoreInfo";
import AddressSection from "../containers/Address/AddressSection";
import AddressContractSection from "../containers/Address/AddressContractSection";
import {
  useAddressTransactionDataV2,
  useAddressData,
  useContractDetails,
} from "../hooks";
import ContractInfo from "../containers/Address/ContractInfo";

const AddressPage = () => {
  const { address } = useParams();
  const { summary, isContractAddress } = useAddressData(address);
  const {
    transactions,
    latestTransaction,
    firstTransaction,
    totalTransactions,
    tokenTransfers,
    nftTransfers,
    contractDetails: contractCreationTx,
  } = useAddressTransactionDataV2(address, isContractAddress);

  const { contractDetails } = useContractDetails(address);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <UserIcon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">
              {isContractAddress ? "Contract" : "Address"}
            </h1>
            {isContractAddress && (
              <span className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium">
                Contract
              </span>
            )}
          </div>
          <div className="mt-1">
            <CopyBlock value={address} />
          </div>
        </div>
      </div>

      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card shadow-card p-5">
          <AddressOverview
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
        </div>
        <div className="rounded-xl border border-border bg-card shadow-card p-5">
          <TransactionInfo
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
        </div>
        <div className="rounded-xl border border-border bg-card shadow-card p-5">
          {!isContractAddress ? (
            <MoreInfo
              totalTxs={totalTransactions || null}
              latestTx={latestTransaction || null}
              firstTx={firstTransaction || null}
            />
          ) : (
            <ContractInfo
              address={address}
              tokenInfo={contractDetails?.tokenInfo}
              creator={contractCreationTx?.from}
              txHash={contractCreationTx?.hash}
            />
          )}
        </div>
      </div>

      <div>
        {!isContractAddress ? (
          <AddressSection
            transactions={transactions}
            tokenTransfers={tokenTransfers}
            nftTransfers={nftTransfers}
          />
        ) : (
          <AddressContractSection
            transactions={transactions}
            tokenTransfers={tokenTransfers}
            nftTransfers={nftTransfers}
            deploymentCode={contractCreationTx?.data}
            creationCode={contractDetails?.deploymentCode}
            contractCreator={contractCreationTx?.from}
            contractTxHash={contractCreationTx?.hash}
          />
        )}
      </div>
    </div>
  );
};

export default AddressPage;
