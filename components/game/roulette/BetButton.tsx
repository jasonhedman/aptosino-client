import React from 'react';

import {Button} from "@chakra-ui/react";

import CoinStack from "@/components/game/CoinStack";

interface Props {
    title: string,
    betAmount: number,
    incrementAmount: number,
    updateBet: (amount: number) => void,
    colorScheme?: string,
    backgroundColor?: string,
    textColor?: string,
    hoverColor?: string,
}

const BetButton: React.FC<Props> = ({ title, betAmount, colorScheme, incrementAmount, updateBet, backgroundColor, textColor, hoverColor}) => {
    return (
        <Button
            colorScheme={colorScheme}
            onClick={() => {
                updateBet(betAmount + incrementAmount)
            }}
            flex={1}
            position={'relative'}
            gap={2}
            px={2}
            bg={backgroundColor}
            color={textColor}
            {
                ...hoverColor && {
                    _hover: {
                        bg: hoverColor
                    }
                }
            }
        >
            {
                betAmount > 0 && (
                    <CoinStack
                        amount={betAmount}
                        color={"#ad8c40"}
                    />
                )
            }
            {title}
        </Button>
    );
};

export default BetButton;
