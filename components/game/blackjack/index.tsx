import React from 'react';

import {Button, HStack} from "@chakra-ui/react";

import GameCard from "@/components/game/GameCard";
import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import BlackjackHand from "@/components/game/blackjack/BlackjackHand";

import useStartBlackjack from "@/hooks/games/useStartBlackjack";

import {blackjack} from "@/data/games";
import StartGame from "@/components/game/blackjack/StartGame";

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
                        <StartGame
                            betAmount={betAmount}
                            setBetAmount={setBetAmount}
                            startGame={startGame}
                        />
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
