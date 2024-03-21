import {useCallback, useEffect, useState} from "react";

import useWallet from "@/hooks/useWallet";

import {deserializeCard, getCards, getHandValue} from "@/services/cards";

import {
    getBetAmountViewPayload,
    getDealerCardsViewPayload,
    getPlayerCardsViewPayload,
    hitEntryFunctionPayload,
    standEntryFunctionPayload
} from "@/config/modules/blackjackModule";

import {Card} from "@/types/Card";
import {useAptos} from "@/contexts/AptosContext";
import useViewFunction from "@/hooks/useViewFunction";
import {toAptos} from "@/services/utils";
import {useToast} from "@chakra-ui/react";
import useDelayedMemo from "@/hooks/useDelayedMemo";

export enum GameStates {
    PLAYING = "Playing",
    RESOLVED = "Resolved",
}

export enum Results {
    BUST = "You Busted",
    PLAYER_WIN = "You Won!",
    BLACKJACK = "You got Blackjack!",
    DEALER_WIN = "The Dealer Won",
    DRAW = "You Drew"
}

const useBlackjack = (handAddress: string) => {

    const toast = useToast();

    const { submitTransaction, address } = useWallet();

    const { client } = useAptos();

    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [dealerCards, setDealerCards] = useState<Card[]>([]);

    const [gameState, setGameState] = useState<GameStates>(GameStates.PLAYING);
    const [result, setResult] = useState<Results>();

    const playerHandValue = useDelayedMemo(() => getHandValue(playerCards), [playerCards], 500);
    const dealerHandValue = useDelayedMemo(() => getHandValue(dealerCards), [dealerCards], 500);

    const resolveGame = (playerHandValue: number[], dealerHandValue: number[]) => {
        let validPlayerValues = playerHandValue.filter((value) => value <= 21);
        let bestPlayerValue =  Math.max(...validPlayerValues.length ? validPlayerValues : playerHandValue);
        let validDealerValues = dealerHandValue.filter((value) => value <= 21);
        let bestDealerValue = Math.max(...validDealerValues.length ? validDealerValues : dealerHandValue);
        if(bestPlayerValue > 21) {
            setResult(Results.BUST);
            toast({
                title: "Bust!",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else if(bestPlayerValue === 21) {
            if(bestDealerValue === 21) {
                setResult(Results.DRAW);
                toast({
                    title: "Draw!",
                    status: "info",
                    duration: 3000,
                    isClosable: true
                })
            } else {
                setResult(Results.BLACKJACK);
                if(!betAmount) return;
                toast({
                    title: `Blackjack! You won ${toAptos(toAptos(parseInt(betAmount[0] as string)) * 1.5)} APT`,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        } else if(bestDealerValue > 21) {
            setResult(Results.PLAYER_WIN);
            if (!betAmount) return;
            toast({
                title: `You won ${toAptos(parseInt(betAmount[0] as string))} APT!`,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } else if(bestDealerValue > bestPlayerValue) {
            toast({
                title: `The dealer won!`,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setResult(Results.DEALER_WIN);
        } else if(bestDealerValue < bestPlayerValue) {
            setResult(Results.PLAYER_WIN);
            if (!betAmount) return;
            toast({
                title: `You won ${toAptos(parseInt(betAmount[0] as string))} APT!`,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } else {
            setResult(Results.DRAW);
            toast({
                title: "Draw!",
                status: "info",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const { returnValue: betAmount} =
        useViewFunction(getBetAmountViewPayload(address));

    const fetchCards = useCallback(async (handAddress: string) => {
        const [playerCards, dealerCards] = await Promise.all([
            getCards(client, getPlayerCardsViewPayload(handAddress)),
            getCards(client, getDealerCardsViewPayload(handAddress))
        ]);
        if(!playerCards || !dealerCards) return;
        await Promise.all(Array.from({length: playerCards.length}, async (_, index) => {
            await new Promise((resolve) => setTimeout(resolve, 1000 * index));
            setPlayerCards(playerCards.slice(0, index + 1));
        }))
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDealerCards(dealerCards);
    }, [client]);

    useEffect(() => {
        if(handAddress) {
            setPlayerCards([]);
            setDealerCards([]);
            fetchCards(handAddress);
            setResult(undefined);
            setGameState(GameStates.PLAYING);
        }
    }, [handAddress]);

    const hit = async () => {
        if(!handAddress) return;
        const res = await submitTransaction({
            data: hitEntryFunctionPayload(),
            options: {
                maxGasAmount: 10000
            }
        })
        if(res) {
            const gameResolvedEvent = res.events.find((event: {type: string}) => event.type.includes("blackjack::GameResolved"));
            if(gameResolvedEvent) {
                // add the player card, then each of the dealers cards with 500 ms between each, then resolve the game
                let playerCards = (gameResolvedEvent.data.player_cards as string[]).map(deserializeCard);
                let finalDealerCards = (gameResolvedEvent.data.dealer_cards as string[]).map(deserializeCard);
                setPlayerCards(playerCards);
                await new Promise((resolve) => setTimeout(resolve, 500));
                let newDealerCards = finalDealerCards.filter((_, index) => index >= dealerCards.length);
                for (const dealerCard of newDealerCards) {
                    setDealerCards((prev) => [...prev, dealerCard]);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
                await new Promise((resolve) => setTimeout(resolve, 500));
                resolveGame(getHandValue(playerCards), getHandValue(dealerCards));
                setGameState(GameStates.RESOLVED);
            } else {
                setPlayerCards([...playerCards, deserializeCard(res.events[0].data.new_card as string)])
            }
        }
    }

    const stand = async () => {
        if(!handAddress) return;
        let res = await submitTransaction({
            data: standEntryFunctionPayload(),
            options: {
                maxGasAmount: 10000
            }
        })
        if(res) {
            let finalDealerCards = (res.events[res.events.length - 2].data.dealer_cards as string[]).map(deserializeCard);
            let newDealerCards = finalDealerCards.filter((_, index) => index >= dealerCards.length);
            for (const dealerCard of newDealerCards) {
                setDealerCards((prev) => [...prev, dealerCard]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            resolveGame(playerHandValue, getHandValue(finalDealerCards));
            setGameState(GameStates.RESOLVED);
        }
    }

    return {
        playerCards,
        dealerCards,
        playerHandValue,
        dealerHandValue,
        gameState,
        result,
        betAmount: betAmount ? toAptos(parseInt(betAmount[0] as string)) : 0,
        hit,
        stand,
    }
}

export default useBlackjack;