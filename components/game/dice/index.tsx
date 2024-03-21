import React, {useEffect} from 'react';

import {Button, Flex, keyframes, Text, useToast, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import SliderInput from "@/components/utilities/SliderInput";

import useDiceGame from "@/hooks/games/useDiceGame";

import {useHouse} from "@/contexts/HouseContext";
import {MAX_OUTCOME} from "@/config/modules/diceModule";
import GameCard from "@/components/game/GameCard";
import {dice} from "@/data/games";
import {makeConfetti} from "@/services/confetti";

const roll = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

const SliderGame = () => {

    const toast = useToast();

    const {
        minBet,
        maxBet,
    } = useHouse();

    const {
        coinAmount,
        setCoinAmount,
        predicted,
        setPredicted,
        disabled,
        onSubmit,
        payout,
        result,
    } = useDiceGame();

    let diceRef = React.useRef<HTMLButtonElement>(null);

    let [resultDisplay, setResultDisplay] = React.useState<number>();
    let [isAnimating, setIsAnimating] = React.useState<boolean>(false);

    useEffect(() => {
        triggerResultSlotEffect();
    }, [result]);

    const triggerResultSlotEffect = () => {
        if(!result) return;
        if(isAnimating) return;
        let i = 0;
        let interval = setInterval(() => {
            setIsAnimating(true);
            setResultDisplay(Math.floor(Math.random() * MAX_OUTCOME));
            i++;
            if(i > 100) {
                clearInterval(interval);
                setIsAnimating(false);
                setResultDisplay(result);
                const success = result <= predicted;
                toast({
                    title: success
                        ? `You won ${payout} APT`
                        : `You lost ${coinAmount} APT`,
                    status: success ? 'success' : 'error',
                    duration: 5000,
                    isClosable: true,
                });
                if(success) {
                    if(diceRef.current) {
                        const rect = diceRef.current.getBoundingClientRect();
                        const x = (rect.left + rect.width / 2) / window.innerWidth;
                        const y = (rect.top + rect.height / 2) / window.innerHeight;
                        makeConfetti(x, y);
                    }
                }
            }
        }, 20);
    }

    return (
        <GameCard
            game={dice}
        >
            <VStack
                spacing={2}
                w={'100%'}
            >
                <VStack
                    w={'100%'}
                    spacing={4}
                >
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
                    <VStack
                        alignItems={'left'}
                        w={'100%'}
                    >
                        <CoinAmountInput
                            decimals={8}
                            amount={coinAmount}
                            setAmount={setCoinAmount}
                            max={maxBet}
                            min={minBet}
                            symbol="APT"
                            label="Bet Amount"
                        />
                        <Text
                            whiteSpace={'nowrap'}
                        >
                            To win: {payout.toFixed(4)} APT
                        </Text>
                    </VStack>
                </VStack>
                <Flex
                    gap={4}
                    direction={'column'}
                    p={2}
                    alignItems={'center'}
                >
                    <Button
                        colorScheme={'brand'}
                        ref={diceRef}
                        h={'200px'}
                        w={'200px'}
                        onClick={onSubmit}
                        isDisabled={disabled}
                        shadow={'2xl'}
                    >
                        <VStack>
                            <Text
                                fontSize={'8xl'}
                                fontWeight={'bold'}
                                animation={isAnimating ? `${roll} 0.1s infinite linear` : undefined}
                                display={'inline-block'}
                            >
                                {resultDisplay ? resultDisplay : '?'}
                            </Text>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                                opacity={0.8}
                            >
                                Click to Roll
                            </Text>
                        </VStack>
                    </Button>
                </Flex>
            </VStack>
        </GameCard>
    );
};

export default SliderGame;
