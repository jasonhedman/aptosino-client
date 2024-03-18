import React from 'react';
import {Box, Button, Flex, HStack, IconButton, Text} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {RiCoinFill} from "react-icons/ri";
import {BiSolidCoin} from "react-icons/bi";

interface Props {
    title: string,
    betAmount: number,
    incrementAmount: number,
    updateBet: (amount: number) => void,
    removeBet: () => void,
    colorScheme?: string,
}

const BetGroup: React.FC<Props> = ({ title, betAmount, colorScheme, incrementAmount, removeBet, updateBet}) => {
    return (
        <Box
            position={'relative'}
        >
            <Button
                colorScheme={colorScheme}
                onClick={() => {
                    updateBet(betAmount + incrementAmount)
                }}
                flex={1}
                position={'relative'}
            >
                {
                    betAmount > 0 && (
                        <>
                            <BiSolidCoin
                                style={{
                                    fontSize: '2.5rem',
                                    color: 'gold',
                                    zIndex: 1,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                            <Text
                                fontSize={'sm'}
                                position={'absolute'}
                                top={'40%'}
                                left={'50%'}
                                zIndex={2}
                                transform={'translate(-50%, -50%)'}
                                color={'black'}
                            >
                                {betAmount}
                            </Text>
                        </>
                    )
                }
                {title}
            </Button>
        </Box>
    );
};

export default BetGroup;
