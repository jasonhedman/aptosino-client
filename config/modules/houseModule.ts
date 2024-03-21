import {
    EntryFunctionArgumentTypes,
    MoveStructId,
    MoveValue,
} from "@aptos-labs/ts-sdk";

import {aptosinoPackageAddress} from "@/config/packageAddress";
import {houseModule} from "@/config/modules";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";

const houseViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${houseModule}::${functionName}`, typeArgs, args);

const houseEntryFunction = (functionName: string, args: Array<EntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${houseModule}::${functionName}`, args, typeArgs);

export const houseAddressViewPayload = houseViewFunction('get_house_address');
export const adminAddressViewPayload = houseViewFunction('get_admin_address');
export const minBetViewPayload = houseViewFunction('get_min_bet');
export const maxBetViewPayload = houseViewFunction('get_max_bet');
export const maxMultiplierViewPayload = houseViewFunction('get_max_multiplier');
export const feeBasisPointsViewPayload = houseViewFunction('get_fee_bps');
export const houseBalanceViewPayload = houseViewFunction('get_house_balance');
export const houseSharesSupplyViewPayload = houseViewFunction('get_house_shares_supply');

export const houseSharesAmountFromDepositAmountViewPayload = (depositAmount: number) =>
    houseViewFunction('get_house_shares_amount_from_deposit_amount', undefined, [depositAmount]);

export const withdrawAmountFromSharesAmountViewPayload = (sharesAmount: number) =>
    houseViewFunction('get_withdraw_amount_from_shares_amount', undefined, [sharesAmount]);