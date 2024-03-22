import React from 'react';

import {VStack} from "@chakra-ui/react";


import GameCard from "@/components/game/GameCard";
import BlackjackHand from "@/components/game/blackjack/BlackjackHand";
import StartGame from "@/components/game/blackjack/StartGame";
import HandPreview from "@/components/game/blackjack/HandPreview";
import BlackjackHit from "@/components/game/blackjack/BlackjackHit";

import useStartBlackjack from "@/hooks/games/blackjack/useStartBlackjack";

import {blackjack} from "@/data/games";


const BlackjackGame = () => {

    const {
        betAmount,
        handAddress,
        isBlackjack,
        result,
        playerCards,
        dealerCards,
        setBetAmount,
        startGame,
    } = useStartBlackjack();

    return (
        <GameCard game={blackjack}>
            {
                isBlackjack ? (
                    <BlackjackHit
                        playerCards={playerCards}
                        dealerCards={dealerCards}
                        result={result}
                        newBetAmount={betAmount}
                        setNewBetAmount={setBetAmount}
                        startGame={startGame}
                    />
                ) : (
                    handAddress == null
                        ? (
                            <VStack
                                w={'100%'}
                            >
                                <HandPreview />
                                <StartGame
                                    betAmount={betAmount}
                                    setBetAmount={setBetAmount}
                                    startGame={startGame}
                                />
                            </VStack>
                        )
                        : (
                            <BlackjackHand
                                handAddress={handAddress}
                                betAmount={betAmount}
                                setBetAmount={setBetAmount}
                                startGame={startGame}
                            />
                        )
                )
            }
        </GameCard>
    );
};

export default BlackjackGame;
