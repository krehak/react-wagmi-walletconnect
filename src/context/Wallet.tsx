import React, { useEffect, useState } from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const chains = [bsc];
const projectId = import.meta.env.VITE_WALLET_CONNECT_KEY || '';

// Wagmi provider
const { provider } = configureChains(chains, [
    publicProvider({
        stallTimeout: 1000,
    }),
    w3mProvider({ projectId }),
]);

// Wagmi client
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export function WalletProvider({ children }) {
    return <>
        <WagmiConfig client={wagmiClient}>
            {children}
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeMode="dark" />
    </>;
}
