import {useMemo, useState} from "react";

import useWallet from "@/hooks/useWallet";
import {useHouse} from "@/contexts/HouseContext";
import {MAX_OUTCOME} from "@/config/modules/diceModule";
import {NUM_SLOTS, spinWheelEntryFunctionPayload} from "@/config/modules/rouletteModule";
import {fromAptos} from "@/services/utils";
import {BetTypes} from "@/types/Roulette";

export const bets = {
    [BetTypes.BLACK]: [Array.from({length: 36 / 2}, (_, i) => i * 2)],
    [BetTypes.RED]: [Array.from({length: 36 / 2}, (_, i) => i * 2 + 1)],
}

const initialBetAmounts = {
    [BetTypes.BLACK]: [0],
    [BetTypes.RED]: [0]
}

const useRouletteGame = () => {

    const { submitTransaction, connected } = useWallet();

    const { feeBasisPoints } = useHouse();

    const [betAmounts, setBetAmounts] = useState(initialBetAmounts);

    const payouts = useMemo(() => Object.keys(betAmounts).map((bet, index) => {
        return (betAmounts[parseInt(bet as string) as BetTypes]).map((amount) =>
            (amount * MAX_OUTCOME / bets[parseInt(bet as string) as BetTypes].length)
            * (10000 - feeBasisPoints / 10000));
    }), [betAmounts, feeBasisPoints]);

    const updateBet = (betType: BetTypes, index: number, amount: number) => {
        let newBetArray = betAmounts[betType];
        newBetArray[index] = amount;
        setBetAmounts({
            ...betAmounts,
            [betType]: newBetArray
        });
    }

    const removeBet = (betType: BetTypes, index: number) => {
        let newBetAmounts = betAmounts[betType];
        newBetAmounts[index] = 0;
        setBetAmounts({
            ...betAmounts,
            [betType]: newBetAmounts
        })
    }

    const onSubmit = async () => {
        let betArray = Object.keys(bets).map((betType) => {
            return bets[parseInt(betType) as BetTypes].map((predictedOutcome, index) => {
                return [predictedOutcome, betAmounts[parseInt(betType) as BetTypes][index]] as const
            })
        }).flat().filter((bet) => bet[1] > 0);
        if(betArray.length > 0) {
            await submitTransaction({
                data: spinWheelEntryFunctionPayload(
                    betArray.map(bet => fromAptos(bet[1])),
                    betArray.map(bet => bet[0])
                )
            }, {
                title: "Spin Wheel Successful",
                description: "Your spin has been submitted",
            });
        }
    }

    return {
        removeBet,
        updateBet,
        onSubmit,
        betAmounts,
        disabled: !connected,
        payouts
    }
}

export default useRouletteGame;