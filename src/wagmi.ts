import { bsc } from "wagmi/chains";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const chainRpcs: any = {
  56: "https://bsc-dataseed1.binance.org/",
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain: any) => ({
        http: chainRpcs[chain.id],
      }),
    }),
  ]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new InjectedConnector({ chains })],
});
