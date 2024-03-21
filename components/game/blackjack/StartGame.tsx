import React from 'react';

import {Button, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";

interface Props {
    betAmount: number;
    setBetAmount: (amount: number) => void;
    startGame: () => void;
}

const StartGame: React.FC<Props> = ({ betAmount, setBetAmount, startGame }) => {
    return (
        <VStack
            w={'100%'}
        >
            <CoinAmountInput
                amount={betAmount}
                setAmount={setBetAmount}
                decimals={8}
                label={'Bet Amount'}
                symbol={'APT'}
                placeholder={'Enter bet amount'}
            />
            <Button
                onClick={startGame}
                colorScheme={'brand'}
                w={'100%'}
            >
                Start Game
            </Button>
        </VStack>
    );
};

export default StartGame;
