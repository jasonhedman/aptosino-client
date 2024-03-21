import React from 'react';


import GameCard from "@/components/game/GameCard";
import BlackjackHand from "@/components/game/blackjack/BlackjackHand";
import StartGame from "@/components/game/blackjack/StartGame";

import useStartBlackjack from "@/hooks/games/blackjack/useStartBlackjack";

import {blackjack} from "@/data/games";
import {VStack} from "@chakra-ui/react";
import HandPreview from "@/components/game/blackjack/HandPreview";


const BlackjackGame = () => {

    const {
        betAmount,
        handAddress,
        setBetAmount,
        startGame,
    } = useStartBlackjack();

    return (
        <GameCard game={blackjack}>
            {
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
            }
        </GameCard>
    );
};

export default BlackjackGame;
