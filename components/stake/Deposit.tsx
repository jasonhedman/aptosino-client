import React from 'react';
import {Button, Text, VStack} from "@chakra-ui/react";
import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import useWallet from "@/hooks/useWallet";

interface Props {
    depositAmount: number;
    setDepositAmount: (amount: number) => void;
    deposit: () => Promise<void>;
    houseSharesPerAPT: number;
}

const Deposit: React.FC<Props> = ({ depositAmount, setDepositAmount, deposit, houseSharesPerAPT }) => {

    const { connected } = useWallet();

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
            <Text
                fontSize={'sm'}
            >
                Deposit APT in exchange for STAKE, a share of the house&apos;s earnings
            </Text>
            <CoinAmountInput
                label={"Deposit Amount"}
                amount={depositAmount}
                setAmount={setDepositAmount}
                decimals={8}
                symbol={"APT"}
            />
            <Text>
                House shares amount: {(depositAmount * houseSharesPerAPT).toFixed(4)} STAKE
            </Text>
            <Button
                onClick={deposit}
                colorScheme={'brand'}
                w={'100%'}
                isDisabled={!connected || depositAmount <= 0}
            >
                Deposit
            </Button>
        </VStack>
    );
};

export default Deposit;
