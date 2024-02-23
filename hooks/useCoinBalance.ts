import { useEffect, useState } from 'react';

import { useAptos } from '@/contexts/AptosContext';

import {MoveStructId} from "@aptos-labs/ts-sdk";


const useCoinBalance = (accountAddress: string, coinType: MoveStructId, decimals: number) => {

    const { client } = useAptos();

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const getBalance = async () => {
        setLoading(true);
        const balance = await client.account.getAccountCoinAmount({
            accountAddress,
            coinType
        })
        setBalance(balance / Math.pow(10, decimals));
        setLoading(false);
    }

    useEffect(() => {
        getBalance();
    }, [coinType, client])

    return {
        balance,
        loading
    };
}

export default useCoinBalance