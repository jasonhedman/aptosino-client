import {
    MoveStructId,
    MoveValue,
    SimpleEntryFunctionArgumentTypes,
} from "@aptos-labs/ts-sdk";

import {aptosinoPackageAddress} from "@/config/packageAddress";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {diceModule} from "@/config/modules";

export const MAX_OUTCOME = 100;

const diceViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${diceModule}::${functionName}`, typeArgs, args);

const diceEntryFunction = (functionName: string, args: Array<SimpleEntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${diceModule}::${functionName}`, args, typeArgs);

export const rollDiceEntryFunctionPayload = (bet: number, max_outcome: number, predicted: number) =>
    diceEntryFunction('roll_dice', [bet, max_outcome, predicted]);

export const payoutViewPayload = (betAmount: number, maxOutcome: number, predictedOutcome: number) =>
    diceViewFunction('get_payout', undefined, [betAmount, maxOutcome, predictedOutcome]);