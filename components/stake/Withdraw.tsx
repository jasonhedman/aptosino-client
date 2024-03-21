import React from 'react';

import {Button, Text, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";

interface Props {
    withdrawAmount: number;
    setWithdrawAmount: (amount: number) => void;
    withdraw: () => Promise<void>;
    APTperHouseShares: number;
}

const Withdraw: React.FC<Props> = ({ withdrawAmount, setWithdrawAmount, withdraw, APTperHouseShares }) => {
    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
            <Text
                fontSize={'sm'}
            >
                Withdraw your STAKE in exchange for APT
            </Text>
            <CoinAmountInput
                label={"Withdraw Amount"}
                amount={withdrawAmount}
                setAmount={setWithdrawAmount}
                decimals={8}
                symbol={"STAKE"}
            />
            <Text>
                House shares amount: {(withdrawAmount * APTperHouseShares).toFixed(4)} APT
            </Text>
            <Button
                onClick={withdraw}
                colorScheme={'brand'}
                w={'100%'}
            >
                Withdraw
            </Button>
        </VStack>
    );
};

export default Withdraw;
