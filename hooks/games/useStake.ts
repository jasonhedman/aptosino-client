import useWallet from "@/hooks/useWallet";

import useViewFunction from "@/hooks/useViewFunction";

import {
    depositEntryPayload,
    houseSharesAmountFromDepositAmountViewPayload,
    withdrawAmountFromSharesAmountViewPayload, withdrawEntryPayload
} from "@/config/modules/houseModule";

import {fromAptos, toAptos} from "@/services/utils";

import {useState} from "react";

const useStake = () => {
    const { address, submitTransaction } = useWallet();

    const { returnValue: houseSharesPerAPT } = useViewFunction(houseSharesAmountFromDepositAmountViewPayload(fromAptos(1)));
    const { returnValue: APTPerHouseShare } = useViewFunction(withdrawAmountFromSharesAmountViewPayload(fromAptos(1)));

    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

    const deposit = async () => {
        if(depositAmount === 0) return;
        await submitTransaction({data: depositEntryPayload(Math.round(fromAptos(depositAmount)))}, {
            title: "Deposit successful",
            description: `You have successfully deposited ${depositAmount} APT`,
        });
    }

    const withdraw = async () => {
        if(withdrawAmount === 0) return;
        console.log(withdrawEntryPayload(Math.round(fromAptos(withdrawAmount))));
        await submitTransaction({data: withdrawEntryPayload(Math.round(fromAptos(withdrawAmount)))}, {
            title: "Withdraw successful",
            description: `You have successfully withdrawn ${withdrawAmount} APT`,
        });
    }

    return {
        houseSharesPerAPT: houseSharesPerAPT ? toAptos(parseInt(houseSharesPerAPT[0] as string)) : 0,
        APTPerHouseShare: APTPerHouseShare ? toAptos(parseInt(APTPerHouseShare[0] as string)) : 0,
        deposit,
        withdraw,
        depositAmount,
        setDepositAmount,
        withdrawAmount,
        setWithdrawAmount,
        address
    }

}

export default useStake;