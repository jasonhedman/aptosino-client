import {useCallback, useEffect, useMemo, useState} from "react";

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

    const playerHandValue = useMemo(() => {
        return getHandValue(playerCards);
    }, [playerCards]);

    const dealerHandValue = useMemo(() => {
        return getHandValue(dealerCards);
    }, [dealerCards]);

    const resolveGame = (playerHandValue: number[], dealerHandValue: number[]) => {
        let validPlayerValues = playerHandValue.filter((value) => value <= 21);
        let bestPlayerValue =  Math.max(...validPlayerValues.length ? validPlayerValues : playerHandValue);
        let validDealerValues = dealerHandValue.filter((value) => value <= 21);
        let bestDealerValue = Math.max(...validDealerValues.length ? validDealerValues : dealerHandValue);
        console.log(bestPlayerValue, bestDealerValue);
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

    const { returnValue: betAmount, loading, error} =
        useViewFunction(getBetAmountViewPayload(address));

    const fetchCards = useCallback(async (handAddress: string) => {
        const [playerCards, dealerCards] = await Promise.all([
            getCards(client, getPlayerCardsViewPayload(handAddress)),
            getCards(client, getDealerCardsViewPayload(handAddress))
        ]);
        if(!playerCards || !dealerCards) return;
        setPlayerCards(playerCards);
        setDealerCards(dealerCards);
    }, [client]);

    useEffect(() => {
        if(handAddress) {
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
                maxGasAmount: 100000
            }
        })
        if(res) {
            const gameResolvedEvent = res.events.find((event: {type: string}) => event.type.includes("blackjack::GameResolved"));
            if(gameResolvedEvent) {
                let playerCards = (gameResolvedEvent.data.player_cards as string[]).map(deserializeCard);
                let dealerCards = (gameResolvedEvent.data.dealer_cards as string[]).map(deserializeCard);
                setPlayerCards(playerCards)
                setDealerCards(dealerCards);
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
            data: standEntryFunctionPayload()
        })
        if(res) {
            let dealerCards = (res.events[res.events.length - 2].data.dealer_cards as string[]).map(deserializeCard);
            setDealerCards(dealerCards);
            resolveGame(playerHandValue, getHandValue(dealerCards));
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