import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Routes, Route } from "react-router-dom";

import routes from "../routes";
import PageNotFound from "../containers/PageContent";
import FooterComponent from "../components/UI/Footer";
import useIsBlockchainReady from "../hooks/useIsBlockchainReady";
import PreviewOnlyWarningModal from "../components/PreviewOnlyWarningModal";

const { Header, Content, Footer } = Layout;

const NAVBAR = [
  {
    key: "",
    label: "Home",
  },
  {
    key: "tx",
    label: "Blockchain",
    children: [
      { key: "block-list", label: "Latest Blocks" },
      {
        key: "txs",
        label: "Transactions",
      },
    ],
  },
  {
    key: "tk",
    label: "Token",
    children: [
      {
        key: "tokens",
        label: "Token List",
      },
      { key: "nfts", label: "NFT list" },
    ],
  },
  {
    key: "dev",
    label: "Developers",
    children: [
      {
        key: "api",
        label: "APIs",
      },
      { key: "documentations", label: "API Documentation" },
    ],
  },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const { isReady, refreshBlockchainData, loading } = useIsBlockchainReady();
  const [showPreviewWarning, setShowPreviewWarning] = useState(process.env.REACT_APP_PREVIEW)

  const handleMenuClick = (item) => {
    navigate(item.key);
  };

  return (
    <Layout className="font-varela ">
      <Header className="flex sticky w-100 align-item-center z-[999] top-0 bg-black text-white">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={NAVBAR}
          className="flex-1 min-w-0 bg-black "
          onClick={handleMenuClick}
        />
      </Header>
      <Content className="xl:px-50 lg:px-32 md:px-16 sm:px-6 min-h-[calc(100vh-132px)]">
        <PreviewOnlyWarningModal
          open={showPreviewWarning}
          onOkayClick={() => setShowPreviewWarning(false)}
        />
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Content>
      <Footer className="text-center bg-black text-white">
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
