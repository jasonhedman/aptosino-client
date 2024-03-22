import React from 'react';

import {Button, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import useWallet from "@/hooks/useWallet";

interface Props {
    betAmount: number;
    setBetAmount: (amount: number) => void;
    startGame: () => void;
}

const StartGame: React.FC<Props> = ({ betAmount, setBetAmount, startGame }) => {

    const { connected } = useWallet();

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
            />
            <Button
                onClick={startGame}
                colorScheme={'brand'}
                w={'100%'}
                isDisabled={!connected || betAmount <= 0}
            >
                Start Game
            </Button>
        </VStack>
    );
};

export default StartGame;
