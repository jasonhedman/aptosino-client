import {useCallback, useEffect, useState} from "react";

import useWallet from "@/hooks/useWallet";

import {useAptos} from "@/contexts/AptosContext";

import {getPlayerHandAddressViewPayload, startGameEntryFunctionPayload} from "@/config/modules/blackjackModule";

import {fromAptos} from "@/services/utils";
import {deserializeCard, getHandValue} from "@/services/cards";

import {Address} from "@/types/Address";
import {Event} from "@/types/Event";
import {Card} from "@/types/Card";
import {Results} from "@/types/Blackjack";


const useStartBlackjack = () => {
    const { address, submitTransaction } = useWallet();

    const { client } = useAptos();

    const [betAmount, setBetAmount] = useState(0);
    const [handAddress, setHandAddress] = useState<string | null>(null);

    const [isBlackjack, setIsBlackjack] = useState(false);
    const [result, setResult] = useState<Results>();
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [dealerCards, setDealerCards] = useState<Card[]>([]);

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
            const events = res.events as Event<any>[];
            const gameResolvedEvent = events.find((event) => event.type === "blackjack::GameResolved");
            if(gameResolvedEvent) {
                setIsBlackjack(true);
                let playerCards = (gameResolvedEvent.data.player_cards as string[]).map(deserializeCard);
                let dealerCards = (gameResolvedEvent.data.dealer_cards as string[]).map(deserializeCard);
                setPlayerCards([playerCards[0]]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setPlayerCards((prev) => [...prev, playerCards[1]]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDealerCards([dealerCards[0]]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDealerCards((prev) => [...prev, dealerCards[1]]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setResult(Math.max(...getHandValue(dealerCards)) === 21 ? Results.DRAW : Results.BLACKJACK);
            } else {
                setIsBlackjack(false);
                setResult(undefined);
                setPlayerCards([]);
                setDealerCards([]);
                fetchGameData(address);
            }
        }
    }

    return {
        betAmount,
        handAddress,
        setBetAmount,
        startGame,
        isBlackjack,
        result,
        playerCards,
        dealerCards
    }
}

export default useStartBlackjack;
