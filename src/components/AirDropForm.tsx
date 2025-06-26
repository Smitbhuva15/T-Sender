"use client";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/utils/constant";
import { InputForm } from "./ui/InputForm";
import { useMemo, useState } from "react";
import { useAccount, useChainId, useConfig, useWriteContract, useWaitForTransactionReceipt, } from 'wagmi'
import { readContract } from '@wagmi/core';
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import { waitForTransactionReceipt } from "@wagmi/core"

export function AirDropForm() {

    const [tokenAddress, setTokenAddress] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");
    const chainId = useChainId();
    const config = useConfig()
    const account = useAccount()
    const totalAmount = useMemo(() => calculateTotal(amounts), [amounts])

    const { data: hash, isPending, error, writeContractAsync } = useWriteContract()

    async function getAppovedAmount(tsenderAddress: string) {
        if (!tsenderAddress) {
            alert("TSender contract not found for the connected network. Please switch networks.");
            return 0;
        }

        // token.allowance(account.address, tsenderAddress)
        const response = await readContract(config, {
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: "allowance",
            args: [account.address, tsenderAddress as `0x${string}`]
        })

        return response as number;

    }


    async function handleSubmit() {
        // tsenderAddress is the address of the T-Sender contract for the current chain
        const tsenderAddress = chainsToTSender[chainId]["tsender"];
        const approvedAmount = await getAppovedAmount(tsenderAddress);
        //  console.log("Approved Amount: ", approvedAmount);

        if (approvedAmount < totalAmount) {

            const approvalHash = await writeContractAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: "approve",
                args: [tsenderAddress as `0x${string}`, BigInt(totalAmount)],
            })

             const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash,
            })

            console.log("Approval confirmed:", approvalReceipt)

            await writeContractAsync({
                address: tsenderAddress as `0x${string}`,
                abi: tsenderAbi,
                functionName: "airdropERC20",
                args: [
                    tokenAddress as `0x${string}`,
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(totalAmount)
                ]
            })
            setTokenAddress("");
            setRecipients("");
            setAmounts("");

        }
        else{
            console.log("Already approved enough amount, proceeding with airdrop...");
            await writeContractAsync({
                address: tsenderAddress as `0x${string}`,
                abi: tsenderAbi,
                functionName: "airdropERC20",
                args: [
                    tokenAddress as `0x${string}`,
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(totalAmount)
                ]
            })
            setTokenAddress("");
            setRecipients("");
            setAmounts("");

        }

    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <InputForm
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />

            <InputForm
                label="Recipients"
                placeholder="0x123..., 0x456..."
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                large={true} // Example of another prop
            />

            <InputForm
                label="Amounts"
                placeholder="100, 200, ..."
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                large={true}
            />

            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 w-full mb-4">
                Send Tokens
            </button>
        </form>
    )
}