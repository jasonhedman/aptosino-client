import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import {PiPokerChipFill} from "react-icons/pi";

interface Props {
    amount: number,
    color: string,
    bgColor?: string,
    textColor?: string,
}

const CoinStack: React.FC<Props> = ({ amount, color, bgColor, textColor }) => {

    return (
        <Box
            position={'relative'}
            bg={bgColor || 'white'}
            borderRadius={'full'}
            p={'-0.5rem'}
            h={'32px'}
            w={'32px'}
        >
            <PiPokerChipFill
                style={{
                    fontSize: '2.5rem',
                    color,
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <Text
                fontSize={'2xs'}
                position={'absolute'}
                top={'50%'}
                left={'50%'}
                zIndex={2}
                transform={'translate(-50%, -50%)'}
                color={textColor || 'white'}
            >
                {Math.round(amount * 10) / 10}
            </Text>
        </Box>
    );
};

export default CoinStack;
