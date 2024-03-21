import {EntryFunctionArgumentTypes, MoveStructId, MoveValue, U64, U8} from "@aptos-labs/ts-sdk";
import {entryFunctionPayload, viewPayload} from "@/config/modules/utils";
import {aptosinoPackageAddress} from "@/config/packageAddress";
import {minesModule} from "@/config/modules";

const minesViewFunction = (functionName: string, typeArgs?: Array<MoveStructId>, args?: Array<MoveValue>) =>
    viewPayload(`${aptosinoPackageAddress}::${minesModule}::${functionName}`, typeArgs, args);

const minesEntryFunction = (functionName: string, args: Array<EntryFunctionArgumentTypes>, typeArgs?: Array<MoveStructId>) =>
    entryFunctionPayload(`${aptosinoPackageAddress}::${minesModule}::${functionName}`, args, typeArgs);

export const createBoardEntryFunctionPayload = (bet: number, num_rows: number, num_cols: number, num_mines: number) =>
    minesEntryFunction('create_board', [
        new U64(bet),
        new U8(num_rows),
        new U8(num_cols),
        new U8(num_mines)
    ]);

export const selectCellEntryFunctionPayload = (row: number, col: number) =>
    minesEntryFunction('select_cell', [
        new U8(row),
        new U8(col)
    ]);

export const cashOutEntryFunctionPayload = () =>
    minesEntryFunction('cash_out', []);

export const getNumRowsViewPayload = (player_address: string) =>
    minesViewFunction('get_num_rows', [], [player_address]);

export const getNumColsViewPayload = (player_address: string) =>
    minesViewFunction('get_num_cols', [], [player_address]);

export const getNumMinesViewPayload = (player_address: string) =>
    minesViewFunction('get_num_mines', [], [player_address]);

export const getGemCoordinatesViewPayload = (player_address: string) =>
    minesViewFunction('get_gem_coordinates', [], [player_address]);

export const getPayoutMultiplierViewPayload = (board_address: string) =>
    minesViewFunction('get_payout_multiplier', [], [board_address]);

export const getMinesBoardAddressViewPayload = (player_address: string) =>
    minesViewFunction('get_mines_board_object', [], [player_address]);

export const getMinesBoardBetAmountViewPayload = (player_address: string) =>
    minesViewFunction('get_bet_amount', [], [player_address]);


