import React from 'react';

import dynamic from "next/dynamic";

import {Box, Button, Flex, HStack, Text, useToast, VStack} from "@chakra-ui/react";

import { makeConfetti as makeConfettiService } from "@/services/confetti";

const Wheel = dynamic(
    async () => {
        const mod = await import("react-custom-roulette");
        return mod.Wheel;
    },
    { ssr: false }
);
import GameCard from "@/components/game/GameCard";
import BetButton from "@/components/game/roulette/BetButton";

import useRouletteGame, {betNames, bets} from "@/hooks/games/useRouletteGame";

import {roulette} from "@/data/games";

import {BetTypes} from "@/types/Roulette";
import wheelData from "@/components/game/roulette/wheelData";
import {DeleteIcon} from "@chakra-ui/icons";

const RouletteGame = () => {

    const toast = useToast();

    const {
        resetBets,
        updateBet,
        onSubmit,
        stopSpinning,
        betAmounts,
        payouts,
        isSpinning,
        prizeNumber,
        disabled,
        totalBetAmount
    } = useRouletteGame();

    const rouletteRef = React.useRef<HTMLDivElement>(null);

    const onStopSpinning = () => {
        stopSpinning();
        let amountWon = payouts[prizeNumber] - totalBetAmount;
        toast({
            title: amountWon > 0
                ? `You won ${amountWon.toFixed(2)} APT!`
                : `You lost ${Math.abs(amountWon).toFixed(2)}`,
            status: amountWon > 0
                ? 'success'
                : 'error',
            duration: 5000,
            isClosable: true
        })
        if(amountWon > 0) {
            makeConfetti();
        }
    }

    const makeConfetti = () => {
        if(!rouletteRef.current) return;
        const rect = rouletteRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        makeConfettiService(x, y);
    }

    return (
        <GameCard
            game={roulette}
        >
            <Flex
                w={'full'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
            >
                <Box
                    position={'relative'}
                    ref={rouletteRef}
                >
                    <Wheel
                        mustStartSpinning={isSpinning}
                        prizeNumber={prizeNumber}
                        onStopSpinning={onStopSpinning}
                        data={wheelData}
                        innerRadius={40}
                        innerBorderWidth={30}
                        innerBorderColor={'#2b211a'}
                        outerBorderWidth={15}
                        outerBorderColor={'#2b211a'}
                        perpendicularText
                        textDistance={75}
                        radiusLineWidth={2}
                        radiusLineColor={'#f8b082'}
                        fontSize={14}
                        fontWeight={900}
                        pointerProps={{
                            style: {
                                stroke: 'black'
                            }
                        }}
                    />
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                        position={'absolute'}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%)'}
                        zIndex={10}
                        isDisabled={disabled}
                    >
                        Spin
                    </Button>
                </Box>
            </Flex>
            <VStack
                spacing={1}
                w={'full'}
            >
                <Flex
                    w={'full'}
                    gap={1}
                >
                    <BetButton
                        key={betNames[BetTypes.HALVES][0]}
                        title={betNames[BetTypes.HALVES][0]}
                        betAmount={betAmounts[BetTypes.HALVES][0]}
                        incrementAmount={1}
                        updateBet={(amount: number) => updateBet(BetTypes.HALVES, 0, amount)}
                    />
                    <BetButton
                        key={betNames[BetTypes.EVEN_ODD][0]}
                        title={betNames[BetTypes.EVEN_ODD][0]}
                        betAmount={betAmounts[BetTypes.EVEN_ODD][0]}
                        incrementAmount={1}
                        updateBet={(amount: number) => updateBet(BetTypes.EVEN_ODD, 0, amount)}
                    />
                    {
                        bets[BetTypes.COLOR].map((bet, index) => {
                            return (
                                <BetButton
                                    key={betNames[BetTypes.COLOR][index]}
                                    title={betNames[BetTypes.COLOR][index]}
                                    betAmount={betAmounts[BetTypes.COLOR][index]}
                                    incrementAmount={1}
                                    updateBet={(amount: number) => updateBet(BetTypes.COLOR, index, amount)}
                                    backgroundColor={betNames[BetTypes.COLOR][index] === 'Red' ? '#a30904' : '#1f1f21'}
                                    textColor={'white'}
                                    hoverColor={betNames[BetTypes.COLOR][index] === 'Red' ? 'red.800' : 'blackAlpha.800'}
                                />
                            )
                        })
                    }
                    <BetButton
                        key={betNames[BetTypes.EVEN_ODD][1]}
                        title={betNames[BetTypes.EVEN_ODD][1]}
                        betAmount={betAmounts[BetTypes.EVEN_ODD][1]}
                        incrementAmount={1}
                        updateBet={(amount: number) => updateBet(BetTypes.EVEN_ODD, 1, amount)}
                    />
                    <BetButton
                        key={betNames[BetTypes.HALVES][1]}
                        title={betNames[BetTypes.HALVES][1]}
                        betAmount={betAmounts[BetTypes.HALVES][1]}
                        incrementAmount={1}
                        updateBet={(amount: number) => updateBet(BetTypes.HALVES, 1, amount)}
                    />
                </Flex>
                <Box
                    display="grid"
                    gridAutoFlow="column dense"
                    gridTemplateRows="repeat(3, 1fr)"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={1}
                    width="100%"
                >
                    {
                        bets[BetTypes.NUMBER].map((bet, index) => {
                            return (
                                <BetButton
                                    key={index}
                                    title={betNames[BetTypes.NUMBER][index]}
                                    betAmount={betAmounts[BetTypes.NUMBER][index]}
                                    incrementAmount={1}
                                    updateBet={(amount: number) => updateBet(BetTypes.NUMBER, index, amount)}
                                    backgroundColor={bets[BetTypes.COLOR][0].includes(index) ? '#a30904' : '#1f1f21'}
                                    textColor={'white'}
                                    hoverColor={bets[BetTypes.COLOR][0].includes(index) ? 'red.800' : 'blackAlpha.800'}
                                />
                            )
                        })
                    }
                </Box>
                <Flex
                    w={'full'}
                    gap={1}
                >
                    {
                        bets[BetTypes.DOZENS].map((bet, index) => {
                            return (
                                <BetButton
                                    key={betNames[BetTypes.DOZENS][index]}
                                    title={betNames[BetTypes.DOZENS][index]}
                                    betAmount={betAmounts[BetTypes.DOZENS][index]}
                                    incrementAmount={1}
                                    updateBet={(amount: number) => updateBet(BetTypes.DOZENS, index, amount)}
                                />
                            )
                        })
                    }
                </Flex>
                <HStack
                    w={'full'}
                    justifyContent={'space-between'}
                >
                    <Text
                        fontWeight={'bold'}
                        fontSize={'sm'}
                    >
                        Total Bet: {totalBetAmount.toFixed(2)} APT
                    </Text>
                    <Button
                        onClick={resetBets}
                        leftIcon={<DeleteIcon />}
                        variant={'ghost'}
                    >
                        Clear Bets
                    </Button>
                </HStack>
            </VStack>
        </GameCard>
    );
};

export default RouletteGame;
