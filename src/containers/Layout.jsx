import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

import routes from "../routes";
import PageNotFound from "../containers/PageNotFound";
import FooterComponent from "../components/UI/Footer";
import useIsBlockchainReady from "../hooks/useIsBlockchainReady";
import NoNetworkModal from "../components/NoNetworkModal";
import { useTheme } from "../context/ThemeContext";

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
      { key: "txs", label: "Transactions" },
    ],
  },
  {
    key: "tk",
    label: "Tokens",
    children: [
      { key: "tokens", label: "ERC-20 Tokens" },
      { key: "nfts", label: "NFT Transfers" },
    ],
  },
];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    if (/^0x[a-fA-F0-9]{64}$/.test(q)) {
      navigate(`/tx/${q}`);
    } else if (/^0x[a-fA-F0-9]{40}$/.test(q)) {
      navigate(`/address/${q}`);
    } else if (/^\d+$/.test(q)) {
      navigate(`/block/${q}`);
    }
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by address, tx hash, or block number..."
        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </form>
  );
};

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </button>
  );
};

const AppLayout = () => {
  const navigate = useNavigate();
  const { isReady, refreshBlockchainData, loading, error } =
    useIsBlockchainReady();

  const handleMenuClick = (item) => {
    navigate(item.key);
  };

  return (
    <Layout className="min-h-screen bg-background">
      <Header
        className="sticky top-0 z-50 flex items-center gap-4 px-4 md:px-8 h-16 border-b"
        style={{
          background: "var(--color-header-bg)",
          borderColor: "var(--color-header-border)",
          backdropFilter: "blur(12px)",
          lineHeight: "normal",
          padding: "0 16px",
        }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0 mr-2"
          onClick={() => navigate("/")}
        >
          <CubeIcon className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground text-lg hidden sm:inline">
            HardhatScan
          </span>
        </div>

        <Menu
          mode="horizontal"
          items={NAVBAR}
          className="header-menu flex-shrink-0 border-none"
          onClick={handleMenuClick}
          style={{ background: "transparent", minWidth: 0, flex: "none" }}
          selectable={false}
        />

        <div className="flex-1" />

        <SearchBar />

        <ThemeToggle />
      </Header>

      <Content className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        <NoNetworkModal
          open={!loading && !isReady}
          onOkayClick={refreshBlockchainData}
          error={error}
        />
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Content>

      <Footer
        className="border-t"
        style={{
          background: "var(--color-card)",
          borderColor: "var(--color-border)",
          padding: "24px 16px",
        }}
      >
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
