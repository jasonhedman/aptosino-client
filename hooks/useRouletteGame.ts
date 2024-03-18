import {useMemo, useState} from "react";

import useWallet from "@/hooks/useWallet";
import {useHouse} from "@/contexts/HouseContext";
import {NUM_SLOTS, spinWheelEntryFunctionPayload} from "@/config/modules/rouletteModule";
import {fromAptos} from "@/services/utils";
import {Bet, BetTypes} from "@/types/Roulette";

export const bets = {
    [BetTypes.COLOR]: [
        [0, 2, 4, 6, 8, 11, 13, 15, 17, 18, 20, 22, 24, 26, 29, 31, 33, 35],
        [1, 3, 5, 7, 9, 10, 12, 14, 16, 19, 21, 23, 25, 27, 28, 30, 32, 34]
    ],
    [BetTypes.NUMBER]: Array.from({length: NUM_SLOTS}, (_, i) => [i]),
    [BetTypes.EVEN_ODD]: [
        Array.from({length: 36 / 2}, (_, i) => i * 2),
        Array.from({length: 36 / 2}, (_, i) => i * 2 + 1)
    ],
    [BetTypes.DOZENS]: [
        Array.from({length: 12}, (_, i) => i),
        Array.from({length: 12}, (_, i) => i + 12),
        Array.from({length: 12}, (_, i) => i + 24)
    ],
    [BetTypes.HALVES]: [
        Array.from({length: 18}, (_, i) => i),
        Array.from({length: 18}, (_, i) => i + 18)
    ]
}

export const betNames = {
    [BetTypes.COLOR]: ["Red", "Black"],
    [BetTypes.NUMBER]: Array.from({length: NUM_SLOTS}, (_, i) => (i + 1).toString()),
    [BetTypes.EVEN_ODD]: ["Off", "Even"],
    [BetTypes.DOZENS]: ["1-12", "13-24", "25-36"],
    [BetTypes.HALVES]: ["1-18", "19-36"]
}

const initialBetAmounts = () => ({
    [BetTypes.COLOR]: bets[BetTypes.COLOR].map(() => 0),
    [BetTypes.NUMBER]: bets[BetTypes.NUMBER].map(() => 0),
    [BetTypes.EVEN_ODD]: bets[BetTypes.EVEN_ODD].map(() => 0),
    [BetTypes.DOZENS]: bets[BetTypes.DOZENS].map(() => 0),
    [BetTypes.HALVES]: bets[BetTypes.HALVES].map(() => 0),
})

const useRouletteGame = () => {

    const { submitTransaction, connected } = useWallet();

    const { maxBet } = useHouse();

    const { feeBasisPoints } = useHouse();

    const [betAmounts, setBetAmounts] = useState(initialBetAmounts());
    const [isSpinning, setIsSpinning] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState<number>(0);

    const currentBets = useMemo(() => Object.keys(bets).map((betType) => {
        let betTypeInt = parseInt(betType) as BetTypes;
        return bets[betTypeInt].map((predictedOutcome, index) => {
            return {
                predictedOutcome,
                name: betNames[betTypeInt][index],
                amount: betAmounts[betTypeInt][index]
            } as Bet
        })
    }).flat().filter((bet) => bet.amount > 0), [betAmounts, feeBasisPoints]);

    const totalBetAmount = useMemo(() => {
        return currentBets.reduce((acc, bet) => acc + bet.amount, 0);
    }, [currentBets]);

    const payouts = useMemo(() => {
        return Array.from({length: NUM_SLOTS}, (_, i) => (i)).map((slot) => {
            return currentBets.reduce((acc, bet) => {
                if(bet.predictedOutcome.includes(slot)) {
                    return acc + bet.amount * (NUM_SLOTS / bet.predictedOutcome.length) * (10000 - feeBasisPoints) / 10000;
                }
                return acc;
            }, 0);
        });
    }, [currentBets, feeBasisPoints]);

    const updateBet = (betType: BetTypes, index: number, amount: number) => {
        let newBetArray = betAmounts[betType];
        newBetArray[index] = amount;
        setBetAmounts({
            ...betAmounts,
            [betType]: newBetArray
        });
    }

    const resetBets = () => {
        setBetAmounts(initialBetAmounts());
    }

    const onSubmit = async () => {
        if(currentBets.length > 0) {
            const res = await submitTransaction({
                data: spinWheelEntryFunctionPayload(
                    currentBets.map(bet => fromAptos(bet.amount)),
                    currentBets.map(bet => bet.predictedOutcome)
                ),
                options: {
                    maxGasAmount: 1000000
                }
            }, {
                title: "Spin Wheel Successful",
                description: "Your spin has been submitted",
            });
            if(res) {
                setIsSpinning(true);
                setPrizeNumber(res.events[res.events.length - 2].data.result);
            }
        }
    }

    const stopSpinning = () => {
        setIsSpinning(false);
        setPrizeNumber(0);
    }

    return {
        updateBet,
        resetBets,
        onSubmit,
        stopSpinning,
        betAmounts,
        disabled: !connected || currentBets.length === 0 || totalBetAmount > maxBet,
        payouts,
        currentBets,
        isSpinning,
        prizeNumber,
        totalBetAmount
    }
}

export default useRouletteGame;