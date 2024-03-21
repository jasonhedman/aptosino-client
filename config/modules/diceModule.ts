import {
    EntryFunctionArgumentTypes,
    MoveStructId,
    MoveValue,
    U64,
} from "@aptos-labs/ts-sdk";

import {aptosinoPackageAddress} from "@/config/packageAddress";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {diceModule} from "@/config/modules";

export const MAX_OUTCOME = 100;

const diceViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${diceModule}::${functionName}`, typeArgs, args);

const diceEntryFunction = (functionName: string, args: Array<EntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${diceModule}::${functionName}`, args, typeArgs);

export const rollDiceEntryFunctionPayload = (bet: number, max_outcome: number, predicted: number) =>
    diceEntryFunction('roll_dice', [
        new U64(bet),
        new U64(max_outcome),
        new U64(predicted)
    ]);

export const payoutViewPayload = (betAmount: number, maxOutcome: number, predictedOutcome: number) =>
    diceViewFunction('get_payout', undefined, [betAmount, maxOutcome, predictedOutcome]);