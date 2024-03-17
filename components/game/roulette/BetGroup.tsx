import React from 'react';
import {Button, HStack, IconButton} from "@chakra-ui/react";

interface Props {
    title: string,
    betAmount: number,
    incrementAmount: number,
    updateBet: (amount: number) => void,
    removeBet: () => void,
    colorScheme?: string,
}

const BetGroup: React.FC<Props> = ({ title, betAmount, colorScheme, incrementAmount, removeBet, updateBet}) => {
    return (
        <HStack>
            <Button
                colorScheme={colorScheme}
                onClick={() => {
                    updateBet(betAmount + incrementAmount)
                }}
            >
                {title}
            </Button>
            <IconButton
                aria-label={"Remove Bet"}
                onClick={removeBet}
            />
        </HStack>
    );
};

export default BetGroup;
