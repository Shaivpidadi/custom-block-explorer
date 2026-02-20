import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, theme as antTheme } from "antd";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AppLayout from "./containers/Layout";

import "./App.css";

const AntConfigWrapper = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antTheme.darkAlgorithm
          : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: isDarkMode ? "#60a5fa" : "#3b82f6",
          fontFamily: "Inter, system-ui, sans-serif",
          colorBgContainer: isDarkMode ? "#131928" : "#ffffff",
          colorBgElevated: isDarkMode ? "#1a2236" : "#ffffff",
          colorText: isDarkMode ? "#e2e8f0" : "#0f172a",
          colorTextSecondary: isDarkMode ? "#94a3b8" : "#64748b",
          colorBorder: isDarkMode ? "#1e293b" : "#e2e8f0",
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AntConfigWrapper>
          <AppLayout />
        </AntConfigWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
