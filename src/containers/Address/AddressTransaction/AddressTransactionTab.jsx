import React from "react";
import AddresssTransactionSummary from "./AddressTransactionSummary";
import AddresssTransactionList from "./AddresssTransactionList";

const AddressTransactionTab = ({ transactions }) => {
  return (
    <div>
      <AddresssTransactionSummary totalTxs={transactions?.length} />
      <AddresssTransactionList transactions={transactions} />
    </div>
  );
};

export default AddressTransactionTab;
