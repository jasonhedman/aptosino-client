import useWallet from "@/hooks/useWallet";
import useCoinBalance from "./useCoinBalance";

import {MoveStructId} from "@aptos-labs/ts-sdk";


const useUserCoinBalance = (coinType: MoveStructId, decimals: number) => {
    const { address } = useWallet();

    return useCoinBalance(address, coinType, decimals);
}

export default useUserCoinBalance;