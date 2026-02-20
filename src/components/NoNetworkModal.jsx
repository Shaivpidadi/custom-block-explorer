import { Modal } from "antd";
import React from "react";

const NoNetworkModal = ({ open, onOkayClick, error }) => {
  return (
    <Modal
      title="No Network Detected"
      centered
      closable={false}
      open={open}
      okText="Retry"
      onOk={onOkayClick}
    >
      <p className="text-[var(--color-card-fg)]">
        Please make sure your Hardhat node is running:
      </p>
      <code className="block mt-2 p-3 rounded-lg bg-[var(--color-code-bg)] border border-[var(--color-code-border)] text-sm font-mono text-[var(--color-fg)]">
        npx hardhat node
      </code>
      {error && (
        <p className="mt-3 text-danger text-sm">{error}</p>
      )}
    </Modal>
  );
};

export default NoNetworkModal;
