import React from 'react';

import {Button, Card, Flex, Heading, SimpleGrid, Text, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import SliderInput from "@/components/utilities/SliderInput";

import useDiceGame from "@/hooks/useDiceGame";

import {useHouse} from "@/contexts/HouseContext";
import {MAX_OUTCOME} from "@/config/modules/diceModule";
import GameCard from "@/components/game/GameCard";
import {dice} from "@/data/games";

const SliderGame = () => {

    const {
        minBet,
        maxBet,
        feeBasisPoints
    } = useHouse();

    const {
        coinAmount,
        setCoinAmount,
        predicted,
        setPredicted,
        disabled,
        onSubmit,
        payout,
    } = useDiceGame()

    return (
        <GameCard
            game={dice}
        >
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
                    columns={3}
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
                        Fee: {feeBasisPoints / 100}%
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
                value={predicted}
                setValue={setPredicted}
                min={1}
                max={MAX_OUTCOME - 1}
                defaultValue={MAX_OUTCOME / 2}
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
                    Risk {coinAmount} APT to win {payout} APT
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
        </GameCard>
    );
};

export default SliderGame;
