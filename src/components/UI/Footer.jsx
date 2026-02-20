import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CubeIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">HardhatScan</span>
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            to="/block-list"
            className="hover:text-foreground transition-colors"
          >
            Blocks
          </Link>
          <Link to="/txs" className="hover:text-foreground transition-colors">
            Transactions
          </Link>
          <Link
            to="/tokens"
            className="hover:text-foreground transition-colors"
          >
            Tokens
          </Link>
        </div>

        <div className="text-xs text-muted-foreground">
          Powered by Hardhat & Ethers.js
        </div>
      </div>
    </div>
  );
};

export default Footer;
