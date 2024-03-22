import React, {useEffect} from 'react';

import {Box, Stack, Text, useToast, VStack} from "@chakra-ui/react";

import Hand from "@/components/game/blackjack/Hand";

import useDelayedMemo from "@/hooks/useDelayedMemo";

import {getHandValue} from "@/services/cards";
import {makeConfetti} from "@/services/confetti";

import {Card} from "@/types/Card";
import {Results} from "@/types/Blackjack";
import StartGame from "@/components/game/blackjack/StartGame";

interface Props {
    playerCards: Card[];
    dealerCards: Card[];
    result: Results | undefined;
    newBetAmount: number;
    setNewBetAmount: (amount: number) => void;
    startGame: () => Promise<void>;
}

const BlackjackHit: React.FC<Props> = ({ playerCards, dealerCards, result, newBetAmount, setNewBetAmount, startGame}) => {

    const toast = useToast();

    const playerHandValue = useDelayedMemo(() => getHandValue(playerCards), [playerCards], 500);
    const dealerHandValue = useDelayedMemo(() => getHandValue(dealerCards), [dealerCards], 500);

    const playerHandRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(result !== undefined) {
            if(result === Results.BLACKJACK) {
                toast({
                    title: 'Blackjack!',
                    description: 'You hit a blackjack!',
                    status: 'success',
                    duration: 5000,
                });
                if (playerHandRef.current) {
                    const rect = playerHandRef.current.getBoundingClientRect();
                    const x = (rect.left + rect.width / 2) / window.innerWidth;
                    const y = (rect.top + rect.height / 2) / window.innerHeight;
                    makeConfetti(x, y)
                }
            } else {
                toast({
                    title: 'You pushed!',
                    description: 'You tied with the dealer!',
                    status: 'info',
                    duration: 5000,
                });
            }
        }
    }, [result]);

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <Stack
                w={'100%'}
                direction={{
                    base: 'column',
                    md: 'row'
                }}
            >
                <Box
                    ref={playerHandRef}
                    flex={1}
                >
                    <Hand
                        cards={playerCards}
                        isPlayer={true}
                        handValue={playerHandValue}
                        shouldFlip
                    />
                </Box>
                <Hand
                    cards={dealerCards}
                    isPlayer={false}
                    handValue={dealerHandValue}
                    shouldFlip
                />
            </Stack>
            {
                result !== undefined && (
                    <VStack
                        flex={1}
                        alignItems={'left'}
                        w={'100%'}
                    >
                        <Text
                            fontWeight={'bold'}
                        >
                            Result: {result}, Play again?
                        </Text>
                        <StartGame
                            betAmount={newBetAmount}
                            setBetAmount={setNewBetAmount}
                            startGame={startGame}
                        />
                    </VStack>
                )
            }
        </VStack>
    );
};

export default BlackjackHit;
