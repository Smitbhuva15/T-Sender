"use client";
import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
    anvil,
    zksync,
    mainnet
} from 'wagmi/chains';


//Use TypeScript non-null assertion (only if you're sure the variable will exist)
const WalletprojectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;


const config =getDefaultConfig({
    appName: 'T-sender',
    projectId: WalletprojectId ,
    chains: [anvil, zksync, mainnet],
    ssr: false,
})

export default config;