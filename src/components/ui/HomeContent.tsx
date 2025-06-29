"use client";
import { useAccount } from "wagmi";
import { AirDropForm } from "../AirDropForm";

export function HomeContent() {

    const { isConnected } = useAccount()

    return (


        isConnected ?
            (
                <div>
                    <AirDropForm />
                </div>
            )
            : (
                <div className="flex items-center justify-center  text-2xl font-bold text-gray-700 ">
                    Please connect your wallet..
                </div>
            )




    );
}