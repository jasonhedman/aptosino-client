import React from 'react';
import {MoveStructId} from "@aptos-labs/ts-sdk";
import useCoinBalance from "@/hooks/useCoinBalance";
import {Skeleton, Text} from "@chakra-ui/react";

interface Props {
    address: string,
    coinType: MoveStructId,
    symbol: string,
    decimals: number,
    fontSize?: string,
}

const CoinBalance: React.FC<Props> = ({ address, coinType, symbol, decimals, fontSize}) => {

    const {balance, loading} = useCoinBalance(address, coinType, decimals);

    if(loading) {
        return <Skeleton height="20px" width="100px" />
    }

    return (
        <Text
            fontSize={fontSize}
            fontWeight="bold"
        >
            {balance.toFixed(4)} {symbol}
        </Text>
    );
};

export default CoinBalance;
