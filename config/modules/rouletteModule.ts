import {
    MoveStructId,
    MoveValue,
    SimpleEntryFunctionArgumentTypes,
} from "@aptos-labs/ts-sdk";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {aptosinoPackageAddress} from "@/config/packageAddress";

const rouletteModuleName = 'roulette';

const rouletteViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${rouletteModuleName}::${functionName}`, typeArgs, args);

const rouletteEntryFunction = (functionName: string, args: Array<SimpleEntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${rouletteModuleName}::${functionName}`, args, typeArgs);

export const minBetViewPayload = rouletteViewFunction('get_min_bet');
export const maxBetViewPayload = rouletteViewFunction('get_max_bet');
export const maxMultiplierViewPayload = rouletteViewFunction('get_max_multiplier');
export const feeBasisPointsViewPayload = rouletteViewFunction('get_fee_bps');

export const spinWheelEntryFunctionPayload = (bet: number, multiplier: number, predicted: number) =>
    rouletteEntryFunction('spin_wheel', [bet, multiplier, predicted]);