import React from 'react';


import GameCard from "@/components/game/GameCard";
import BlackjackHand from "@/components/game/blackjack/BlackjackHand";
import StartGame from "@/components/game/blackjack/StartGame";

import useStartBlackjack from "@/hooks/games/blackjack/useStartBlackjack";

import {blackjack} from "@/data/games";


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
