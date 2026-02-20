import { lazy, Suspense } from "react";
import AddressPage from "../pages/Address";

const Home = lazy(() => import("../pages/Home"));
const BlockList = lazy(() => import("../pages/BlockList"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Block = lazy(() => import("../pages/Block"));
const Transaction = lazy(() => import("../pages/Transaction"));
const VerifyContract = lazy(() => import("../pages/VerifyContract"));
const Tokens = lazy(() => import("../pages/Tokens"));
const NFTTokens = lazy(() => import("../pages/NFTTokens"));

const LoadingFallback = ({ label = "Loading..." }) => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  </div>
);

const routes = [
  {
    path: "/",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading dashboard..." />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/block-list",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading blocks..." />}>
        <BlockList />
      </Suspense>
    ),
  },
  {
    path: "/block/:id",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading block..." />}>
        <Block />
      </Suspense>
    ),
  },
  {
    path: "/txs",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading transactions..." />}>
        <Transactions />
      </Suspense>
    ),
  },
  {
    path: "/tx/:hash",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading transaction..." />}>
        <Transaction />
      </Suspense>
    ),
  },
  {
    path: "/address/:address",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading address..." />}>
        <AddressPage />
      </Suspense>
    ),
  },
  {
    path: "/verify-contract/:address",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading..." />}>
        <VerifyContract />
      </Suspense>
    ),
  },
  {
    path: "/tokens",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading tokens..." />}>
        <Tokens />
      </Suspense>
    ),
  },
  {
    path: "/nfts",
    component: (
      <Suspense fallback={<LoadingFallback label="Loading NFTs..." />}>
        <NFTTokens />
      </Suspense>
    ),
  },
];

export default routes;
