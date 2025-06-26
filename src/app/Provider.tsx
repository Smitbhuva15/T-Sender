"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {

    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import config from "../rainbowKitConfig"

export function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )

}