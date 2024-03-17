import {useState} from "react";

import useWallet from "@/hooks/useWallet";

import {rollDiceEntryFunctionPayload, MAX_OUTCOME} from "@/config/modules/diceModule";

import {fromAptos} from "@/services/utils";
import {useHouse} from "@/contexts/HouseContext";

const useDiceGame = () => {

    const { submitTransaction, connected } = useWallet();

    const { feeBasisPoints } = useHouse();

    const [coinAmount, setCoinAmountState] = useState(0);
    const [predicted, setPredictedResultState] = useState(MAX_OUTCOME / 2);

    const setCoinAmount = (amount: number) => {
        setCoinAmountState(amount);
    }

    const setPredicted = (amount: number) => {
        setPredictedResultState(amount);
    }

    const onSubmit = async () => {
        if(coinAmount > 0 && predicted >= 0 && predicted < MAX_OUTCOME) {
            await submitTransaction({
                data: rollDiceEntryFunctionPayload(fromAptos(coinAmount), MAX_OUTCOME, predicted)
            }, {
                title: "Dice Roll Successful",
                description: "Your roll has been submitted",
            });
        }
    }

    return {
        coinAmount,
        predicted,
        setCoinAmount,
        setPredicted,
        onSubmit,
        disabled: !connected || coinAmount <= 0 || predicted < 0,
        payout: coinAmount * (MAX_OUTCOME / predicted - 1) * (10000 - feeBasisPoints) / 10000,
    }
}

export default useDiceGame;