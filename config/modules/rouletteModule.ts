import {
    EntryFunctionArgumentTypes,
    MoveStructId,
    MoveValue, MoveVector,
    U64,
    U8
} from "@aptos-labs/ts-sdk";

import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {aptosinoPackageAddress} from "@/config/packageAddress";
import {rouletteModule} from "@/config/modules";

export const NUM_SLOTS = 36;

const rouletteViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${rouletteModule}::${functionName}`, typeArgs, args);

const rouletteEntryFunction = (functionName: string, args: Array<EntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${rouletteModule}::${functionName}`, args, typeArgs);

export const spinWheelEntryFunctionPayload = (betAmounts: number[], predictedOutcomes: number[][]) =>
    rouletteEntryFunction('spin_wheel', [
        new MoveVector(betAmounts.map(bet => new U64(Math.round(bet)))),
        new MoveVector(predictedOutcomes.map(outcomes => new MoveVector(outcomes.map(outcome => new U8(outcome)))))
    ]);

export const payoutViewPayload = (betAmount: number, maxOutcome: number, predictedOutcome: number) =>
    rouletteViewFunction('get_payout', undefined, [betAmount, maxOutcome, predictedOutcome]);