import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { ThemeProvider } from "@/context/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-responsive-modal/styles.css";
import { Toaster } from "@/components/ui/sonner";
// connectkit
// import { WagmiProvider, createConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import AuthProvider from "@/context/auth/AuthProvider";

// const config = createConfig(
//   getDefaultConfig({
//     // Your dApps chains
//     chains: [mainnet, polygon, optimism, arbitrum],
//     // transports: {
//     // // RPC URL for each chain
//     // [mainnet.id]: http(
//     //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
//     // ),
//     // },

//     // Required API Keys
//     // walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
//     walletConnectProjectId: import.meta.env
//       .VITE_PUBLIC_WALLETCONNECT_PROJECT_ID,

//     // Required App Info
//     appName: "Your App Name",

//     // Optional App Info
//     // appDescription: "Your App Description",
//     // appUrl: "https://family.co", // your app's url
//     // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   })
// );

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      {/* <WagmiProvider config={config}> */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <ConnectKitProvider> */}
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </AuthProvider>
        {/* </ConnectKitProvider> */}
      </QueryClientProvider>
      {/* </WagmiProvider> */}
    </ThemeProvider>
  </StrictMode>
);
