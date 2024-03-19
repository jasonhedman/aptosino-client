import React from 'react';
import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import {Button, HStack} from "@chakra-ui/react";

interface Props {
    betAmount: number;
    setBetAmount: (amount: number) => void;
    startGame: () => void;
}

const StartGame: React.FC<Props> = ({ betAmount, setBetAmount, startGame }) => {
    return (
        <HStack
            w={'100%'}
            alignItems={'flex-end'}
        >
            <CoinAmountInput
                amount={betAmount}
                setAmount={setBetAmount}
                decimals={8}
                label={'Bet Amount'}
                symbol={'APT'}
            />
            <Button
                onClick={startGame}
                colorScheme={'brand'}
            >
                Start Game
            </Button>
        </HStack>
    );
};

export default StartGame;
