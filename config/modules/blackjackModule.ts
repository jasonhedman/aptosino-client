import {MoveStructId, MoveValue, SimpleEntryFunctionArgumentTypes} from "@aptos-labs/ts-sdk";

import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {aptosinoPackageAddress} from "@/config/packageAddress";
import {blackjackModule} from "@/config/modules";

const blackjackViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${blackjackModule}::${functionName}`, typeArgs, args);

const blackjackEntryFunction = (functionName: string, args: Array<SimpleEntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${blackjackModule}::${functionName}`, args, typeArgs);

export const startGameEntryFunctionPayload = (bet: number) =>
    blackjackEntryFunction('start_game', [bet]);

export const hitEntryFunctionPayload = () =>
    blackjackEntryFunction('hit', []);

export const standEntryFunctionPayload = () =>
    blackjackEntryFunction('stand', []);

export const getPlayerHandAddressViewPayload = (player_address: string) =>
    blackjackViewFunction('get_player_hand', undefined, [player_address]);

export const getPlayerCardsViewPayload = (hand_address: string) =>
    blackjackViewFunction('get_player_cards', undefined, [hand_address]);

export const getDealerCardsViewPayload = (hand_address: string) =>
    blackjackViewFunction('get_dealer_cards', undefined, [hand_address]);

export const getBetAmountViewPayload = (player_address: string) =>
    blackjackViewFunction('get_bet_amount', undefined, [player_address]);
