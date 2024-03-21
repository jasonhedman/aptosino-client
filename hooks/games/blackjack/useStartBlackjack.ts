import {useCallback, useEffect, useState} from "react";

import useWallet from "@/hooks/useWallet";

import {useAptos} from "@/contexts/AptosContext";

import { getPlayerHandAddressViewPayload, startGameEntryFunctionPayload} from "@/config/modules/blackjackModule";

import {fromAptos} from "@/services/utils";

import {Address} from "@/types/Address";

const useStartBlackjack = () => {
    const { address, submitTransaction } = useWallet();

    const { client } = useAptos();

    const [betAmount, setBetAmount] = useState(0);
    const [handAddress, setHandAddress] = useState<string | null>(null);

    const fetchGameData = useCallback(async (address: string) => {
        const playerHandAddress = await client.view({
            payload: getPlayerHandAddressViewPayload(address)
        })
            .then((res) => {
                if(!res[0]) return null;
                return (res[0] as Address).inner as string
            })
            .catch((e) => {console.log(e); return null});
        setHandAddress(playerHandAddress);
    }, [client]);

    useEffect(() => {
        if(address) {
            fetchGameData(address);
        }
    }, [address]);

    const startGame = async () => {
        if(betAmount <= 0) return;
        let res = await submitTransaction({
            data: startGameEntryFunctionPayload(fromAptos(betAmount)),
            options: {
                maxGasAmount: 10000,
            }
        })
        if (res) {
            fetchGameData(address);
        }
    }

    return {
        betAmount,
        handAddress,
        setBetAmount,
        startGame,
    }
}

export default useStartBlackjack;
