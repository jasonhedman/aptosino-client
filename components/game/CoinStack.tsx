import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import {BiSolidCoin} from "react-icons/bi";

interface Props {
    amount: number,
    color: string,
}

const CoinStack: React.FC<Props> = ({ amount, color }) => {
    return (
        <Box
            position={'relative'}
        >
            <BiSolidCoin
                style={{
                    fontSize: '2.5rem',
                    color,
                }}
            />
            <Text
                fontSize={'sm'}
                position={'absolute'}
                top={'40%'}
                left={'50%'}
                zIndex={2}
                transform={'translate(-50%, -50%)'}
                color={'white'}
            >
                {amount}
            </Text>
        </Box>
    );
};

export default CoinStack;
