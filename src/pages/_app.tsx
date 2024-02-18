import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@/wagmi";
import { WagmiConfig } from "wagmi";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [ui, setUi] = useState(false);
  useEffect(() => setUi(true), []);
  return (
    <WagmiConfig config={config}>
      {ui && <Component {...pageProps} />}
    </WagmiConfig>
  );
}
