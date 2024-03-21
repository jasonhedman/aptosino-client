import React, {useEffect} from 'react';
import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import PlayingCard from "@/components/playingCard";
import useBlackjack, {GameStates, Results} from "@/hooks/games/blackjack/useBlackjack";
import {makeConfetti} from "@/services/confetti";
import StartGame from "@/components/game/blackjack/StartGame";

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
                justifyContent={'space-between'}
            >
                <VStack
                    p={4}
                    backgroundColor={'brand.500'}
                    rounded={'md'}
                    ref={playerHandRef}
                >
                    <Text
                        color={'white'}
                        fontWeight={'bold'}
                    >
                        Your Hand
                    </Text>
                    <HStack>
                        {
                            playerCards.map((card, index) => (
                                <PlayingCard
                                    key={index}
                                    card={card}
                                    height={150}
                                />
                            ))
                        }
                    </HStack>
                    <Text
                        color={'white'}
                        fontWeight={'bold'}
                    >
                        Hand Value{playerHandValue.length > 1 ? 's' : ''}: {playerHandValue.toString()}
                    </Text>
                    {
                        gameState === GameStates.PLAYING && (
                            <HStack>
                                <Button
                                    onClick={hit}
                                >
                                    Hit
                                </Button>
                                <Button
                                    onClick={stand}
                                >
                                    Stand
                                </Button>
                            </HStack>
                        )
                    }
                </VStack>
                <VStack>
                    <Text
                        fontWeight={'bold'}
                    >
                        Dealer&apos;s Hand
                    </Text>
                    <HStack>
                        {
                            dealerCards.map((card, index) => (
                                <PlayingCard
                                    key={index}
                                    card={card}
                                    height={150}
                                />
                            ))
                        }
                    </HStack>
                    <Text
                        fontWeight={'bold'}
                    >
                        Hand Value{dealerHandValue.length > 1 ? 's' : ''}: {dealerHandValue.toString()}
                    </Text>
                </VStack>
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
                        <Text
                            fontWeight={'bold'}
                            fontSize={'lg'}
                        >
                            Wager: {betAmount} APT
                        </Text>
                    )
                }
            </HStack>
        </VStack>
    );
};

export default BlackjackHand;
