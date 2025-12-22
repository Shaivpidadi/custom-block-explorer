import { Modal } from "antd";
import React from "react";

const PreviewOnlyWarningModal = ({ open, onOkayClick }) => {
  return (
    <Modal
      title="PREVIEW MODE"
      centered
      open={open}
      okText="Proceed"
      style={{ border: "1px solid black", borderRadius: "8px" }}
      onOk={onOkayClick}
      onClose={onOkayClick}
      onCancel={onOkayClick}
    >
      <p>
        THESE ARE MOCK DATA, USE LOCAL VERSION TO LINK IT WITH YOUR <code>hardhat</code> PROJECT
      </p>
    </Modal>
  );
};

export default PreviewOnlyWarningModal;
