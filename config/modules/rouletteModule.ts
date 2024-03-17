import {
    EntryFunctionArgumentTypes,
    MoveStructId,
    MoveValue, MoveVector,
    SimpleEntryFunctionArgumentTypes, U64, U8
} from "@aptos-labs/ts-sdk";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {aptosinoPackageAddress} from "@/config/packageAddress";
import {diceModule, rouletteModule} from "@/config/modules";
import {u8} from "@noble/hashes/utils";

export const NUM_SLOTS = 36;

const rouletteViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${rouletteModule}::${functionName}`, typeArgs, args);

const rouletteEntryFunction = (functionName: string, args: Array<EntryFunctionArgumentTypes> | Array<SimpleEntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${rouletteModule}::${functionName}`, args, typeArgs);

export const spinWheelEntryFunctionPayload = (betAmounts: number[], predictedOutcomes: number[][]) =>
    rouletteEntryFunction('spin_wheel', [
        `[${betAmounts.toString()}]`,
        `[${predictedOutcomes.map(outcomes => `[${outcomes.toString()}]`).toString()}]`,
        // new MoveVector(betAmounts.map(bet => new U64(bet))),
        // new MoveVector(predictedOutcomes.map(outcomes => new MoveVector(outcomes.map(outcome => new U8(outcome)))))
    ]);

export const payoutViewPayload = (betAmount: number, maxOutcome: number, predictedOutcome: number) =>
    rouletteViewFunction('get_payout', undefined, [betAmount, maxOutcome, predictedOutcome]);