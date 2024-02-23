import React from 'react';
import {MoveStructId} from "@aptos-labs/ts-sdk";
import useCoinBalance from "@/hooks/useCoinBalance";
import {Skeleton, Text} from "@chakra-ui/react";

interface Props {
    address: string,
    coinType: MoveStructId,
    symbol: string,
    decimals: number
}

const CoinBalance: React.FC<Props> = ({ address, coinType, symbol, decimals}) => {

    const {balance, loading} = useCoinBalance(address, coinType, decimals);

    if(loading) {
        return <Skeleton height="20px" width="100px" />
    }

    return (
        <Text
            fontSize="sm"
            fontWeight="bold"
        >
            {balance} {symbol}
        </Text>
    );
};

export default CoinBalance;
