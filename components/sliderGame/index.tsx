import React from 'react';

import {Button, Card, Flex, Heading, SimpleGrid, Text, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import useSliderGame from "@/hooks/useSliderGame";
import SliderInput from "@/components/utilities/SliderInput";

const SliderGame = () => {

    const {
        coinAmount,
        setCoinAmount,
        predicted,
        setPredicted,
        multiplier,
        setMultiplier,
        minBet,
        maxBet,
        maxMultiplier,
        feeBasisPoints,
        disabled,
        onSubmit,
    } = useSliderGame()

    return (
        <Card
            w={'100%'}
            p={4}
            gap={4}
        >
            <VStack
                alignItems={'left'}
            >
                <Heading>
                    Dice Roll
                </Heading>
                <Text>
                    Choose your multiplier and roll the dice. If the result is your predicted number, you win!
                </Text>
            </VStack>
            <VStack
                alignItems={'left'}
                spacing={2}
                w={'100%'}
            >
                <Text
                    fontWeight={'bold'}
                    fontSize={'sm'}
                >
                    Dice Roll Parameters
                </Text>
                <SimpleGrid
                    columns={2}
                    gap={2}
                    w={'100%'}
                >
                    <Text>
                        Min Bet: {minBet} APT
                    </Text>
                    <Text>
                        Max Bet: {maxBet} APT
                    </Text>
                    <Text>
                        Max Multiplier: {maxMultiplier}x
                    </Text>
                    <Text>
                        Fee: {feeBasisPoints / 10000}%
                    </Text>
                </SimpleGrid>
            </VStack>
            <CoinAmountInput
                decimals={8}
                amount={coinAmount}
                setAmount={setCoinAmount}
                max={maxBet}
                min={minBet}
                symbol="APT"
                label="Bet Amount"
            />
            <SliderInput
                value={multiplier}
                setValue={setMultiplier}
                min={2}
                max={maxMultiplier}
                step={1}
                label="Multiplier"
                suffix="x"
            />
            <SliderInput
                value={predicted}
                setValue={setPredicted}
                min={0}
                max={multiplier - 1}
                step={1}
                label="Predicted Outcome"
                suffix=""
            />
            <Flex
                w={'100%'}
                gap={2}
                direction={'column'}
                borderWidth={1}
                rounded={'md'}
                borderColor={'brand.500'}
                p={4}
            >
                <Text>
                    Risk {coinAmount} APT to win {coinAmount * (multiplier - feeBasisPoints / 10000)} APT
                </Text>
                <Button
                    colorScheme={'brand'}
                    onClick={onSubmit}
                    w={'100%'}
                    isDisabled={disabled}
                >
                    Roll
                </Button>
            </Flex>
        </Card>
    );
};

export default SliderGame;
