import React from 'react';
import GameCard from "@/components/game/GameCard";
import {roulette} from "@/data/games";
import {Button, SimpleGrid} from "@chakra-ui/react";
import BetGroup from "@/components/game/roulette/BetGroup";
import useRouletteGame from "@/hooks/useRouletteGame";
import {BetTypes} from "@/types/Roulette";

const RouletteGame = () => {

    const {
        removeBet,
        updateBet,
        onSubmit,
        betAmounts
    } = useRouletteGame();

    return (
        <GameCard
            game={roulette}
        >
            <SimpleGrid>
                <BetGroup
                    title={"Evens"}
                    betAmount={betAmounts[BetTypes.BLACK][0]}
                    incrementAmount={10}
                    updateBet={(amount: number) => updateBet(BetTypes.BLACK, 0, amount)}
                    removeBet={() => removeBet(BetTypes.BLACK, 0)}
                />
            </SimpleGrid>
            <Button
                colorScheme={'brand'}
                width={'full'}
                onClick={onSubmit}
            >
                Spin Wheel
            </Button>
        </GameCard>
    );
};

export default RouletteGame;
