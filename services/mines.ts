import {Aptos} from "@aptos-labs/ts-sdk";

import {
    getGemCoordinatesViewPayload,
    getMinesBoardAddressViewPayload, getMinesBoardBetAmountViewPayload,
    getNumColsViewPayload, getNumMinesViewPayload,
    getNumRowsViewPayload
} from "@/config/modules/minesModule";

import {Address} from "@/types/Address";
import {MinesBoard, Tile} from "@/types/Mines";
import {deserializeU8Vector, toAptos} from "@/services/utils";

export const fetchMinesBoardAddress = (client: Aptos, playerAddress: string) =>
    client.view({
        payload: getMinesBoardAddressViewPayload(playerAddress)
    })
        .then((res) => {
            if(!res[0]) return null;
            return (res[0] as Address).inner as string
        })
        .catch((e) => {console.log(e); return null});

export const fetchMinesBoard = async (client: Aptos, playerAddress: string): Promise<MinesBoard> => {
    const [num_rows, num_cols, num_mines, gem_coordinates, bet_amount] = await Promise.all([
        client.view({
            payload: getNumRowsViewPayload(playerAddress)
        }).catch((e) => {console.log(e); return [0]}),
        client.view({
            payload: getNumColsViewPayload(playerAddress)
        }).catch((e) => {console.log(e); return [0]}),
        client.view({
            payload: getNumMinesViewPayload(playerAddress)
        }).catch((e) => {console.log(e); return [0]}),
        client.view({
            payload: getGemCoordinatesViewPayload(playerAddress)
        }).catch((e) => {console.log(e); return ["0x0000"]}),
        client.view({
            payload: getMinesBoardBetAmountViewPayload(playerAddress)
        }).catch((e) => {console.log(e); return ["0"]})
    ])
    let gemCoordinates = (gem_coordinates[0] as string[]).map((coord) => {
        let [x, y] = deserializeU8Vector(coord as string);
        return {x, y};
    })
    return {
        numRows: num_rows[0] as number,
        numCols: num_cols[0] as number,
        numMines: num_mines[0] as number,
        betAmount: toAptos(parseInt(bet_amount[0] as string)),
        gemCoordinates
    }
}

export const makeBoard = (rows: number, cols: number): Tile[][] => {
    const board: Tile[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: Tile[] = [];
        for (let j = 0; j < cols; j++) {
            row.push({x: i, y: j, isGem: false, isRevealed: false});
        }
        board.push(row);
    }
    return board;
}