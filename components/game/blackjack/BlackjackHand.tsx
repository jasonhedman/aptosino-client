import React, {useEffect} from 'react';

import {Button, HStack, Text, VStack} from "@chakra-ui/react";

import StartGame from "@/components/game/blackjack/StartGame";
import Hand from "@/components/game/blackjack/Hand";

import useBlackjack, {GameStates, Results} from "@/hooks/games/blackjack/useBlackjack";

import {makeConfetti} from "@/services/confetti";


interface Props {
    handAddress: string;
    betAmount: number;
    setBetAmount: (amount: number) => void;
    startGame: () => Promise<void>;
}

const BlackjackHand: React.FC<Props> = ({ handAddress, betAmount: newBetAmount, setBetAmount: setNewBetAmount, startGame }) => {

    const {
        playerCards,
        playerHandValue,
        dealerCards,
        dealerHandValue,
        betAmount,
        gameState,
        result,
        hit,
        stand,
    } = useBlackjack(handAddress);

    const playerHandRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (playerHandRef.current && gameState === GameStates.RESOLVED
            && (result === Results.BLACKJACK || result === Results.PLAYER_WIN)) {
            const rect = playerHandRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            makeConfetti(x, y)
        }
    }, [result]);

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <HStack
                w={'100%'}
            >
                <Hand
                    cards={playerCards}
                    isPlayer={true}
                    handValue={playerHandValue}
                    ref={playerHandRef}
                    shouldFlip
                />
                <Hand
                    cards={dealerCards}
                    isPlayer={false}
                    handValue={dealerHandValue}
                    shouldFlip
                />
            </HStack>
            <HStack
                w={'100%'}
                alignItems={'left'}
            >
                {
                    gameState === GameStates.RESOLVED ? (
                        <VStack
                            flex={1}
                            alignItems={'left'}
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
                    ) : (
                        <VStack
                            w={'100%'}
                        >
                            {
                                gameState === GameStates.PLAYING && (
                                    <HStack
                                        w={'100%'}
                                    >
                                        <Button
                                            onClick={hit}
                                            flex={1}
                                            variant={'outline'}
                                            colorScheme={'brand'}
                                        >
                                            Hit
                                        </Button>
                                        <Button
                                            onClick={stand}
                                            flex={1}
                                            colorScheme={'brand'}
                                            variant={'outline'}
                                        >
                                            Stand
                                        </Button>
                                    </HStack>
                                )
                            }
                            <Text
                                fontWeight={'bold'}
                                fontSize={'lg'}
                            >
                                Wager: {betAmount} APT
                            </Text>
                        </VStack>
                    )
                }
            </HStack>
        </VStack>
    );
};

export default BlackjackHand;
