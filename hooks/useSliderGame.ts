import {useState} from "react";

import useViewFunction from "@/hooks/useViewFunction";

import {
    feeBasisPointsViewPayload,
    maxBetViewPayload,
    maxMultiplierViewPayload,
    minBetViewPayload, spinWheelEntryFunctionPayload
} from "@/config/modules/rouletteModule";
import {fromAptos, toAptos} from "@/services/utils";
import useWallet from "@/hooks/useWallet";

const useSliderGame = () => {

    const { submitTransaction } = useWallet();

    const {returnValue: minBet, loading: minBetLoading} = useViewFunction(minBetViewPayload);
    const {returnValue: maxBet, loading: maxBetLoading} = useViewFunction(maxBetViewPayload);
    const {returnValue: maxMultiplier, loading: maxMultiplierLoading} = useViewFunction(maxMultiplierViewPayload);
    const {returnValue: feeBasisPoints, loading: feeBasisPointsLoading} = useViewFunction(feeBasisPointsViewPayload);

    const [coinAmount, setCoinAmountState] = useState(0);
    const [multiplier, setMultiplierState] = useState(2);
    const [predicted, setPredictedResultState] = useState(0);

    const setCoinAmount = (amount: number) => {
        setCoinAmountState(amount);
    }

    const setMultiplier = (amount: number) => {
        setMultiplierState(amount);
        if(predicted >= amount) setPredicted(amount - 1);
    }

    const setPredicted = (amount: number) => {
        setPredictedResultState(amount);
    }

    const onSubmit = async () => {
        if(coinAmount > 0 && multiplier > 0 && predicted >= 0) {
            console.log(spinWheelEntryFunctionPayload(fromAptos(coinAmount), multiplier, predicted))
            await submitTransaction({
                data: spinWheelEntryFunctionPayload(fromAptos(coinAmount), multiplier, predicted)
            }, {
                title: "Spin Wheel Succeeded",
                description: "Your spin has been submitted",
            });
        }
    }

    return {
        coinAmount,
        multiplier,
        predicted,
        setCoinAmount,
        setMultiplier,
        setPredicted,
        onSubmit,
        loading: minBetLoading || maxBetLoading || maxMultiplierLoading || feeBasisPointsLoading,
        minBet: toAptos(parseInt(minBet ? minBet[0] as string : "0")),
        maxBet: toAptos(parseInt(maxBet ? maxBet[0] as string : "0")),
        maxMultiplier: (maxMultiplier ? maxMultiplier[0] : 0) as number,
        feeBasisPoints: (feeBasisPoints ? feeBasisPoints[0] : 0) as number,
    }
}

export default useSliderGame;