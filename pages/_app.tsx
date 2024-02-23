import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import {AptosWalletAdapterProvider} from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter"

import {AptosProvider} from "@/contexts/AptosContext";

import type { AppProps } from "next/app";
import theme from "@/theme";

const wallets = [
    new PetraWallet()
];

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AptosWalletAdapterProvider
          plugins={wallets}
          autoConnect={true}
      >
          <AptosProvider>
              <ChakraProvider
                theme={theme}
              >
                <Component {...pageProps} />
              </ChakraProvider>
          </AptosProvider>
        </AptosWalletAdapterProvider>
  );
}
