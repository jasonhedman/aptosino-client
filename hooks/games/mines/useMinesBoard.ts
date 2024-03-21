import {useCallback, useEffect, useState} from "react";

import {useToast} from "@chakra-ui/react";

import useWallet from "@/hooks/useWallet";
import useViewFunction from "@/hooks/useViewFunction";

import {fetchMinesBoard, makeBoard} from "@/services/mines";

import {useAptos} from "@/contexts/AptosContext";

import {
    cashOutEntryFunctionPayload,
    getPayoutMultiplierViewPayload,
    selectCellEntryFunctionPayload
} from "@/config/modules/minesModule";

import { Event } from "@/types/Event";
import {GemRevealedEvent, MinesBoard, Tile} from "@/types/Mines";
import {useHouse} from "@/contexts/HouseContext";


const useMinesBoard = (boardAddress: string) => {

    const toast = useToast();

    const { address, submitTransaction } = useWallet();

    const { feeBasisPoints } = useHouse();

    const { client } = useAptos();

    const [board, setBoard] = useState<MinesBoard>();

    const [tiles, setTiles] = useState<Tile[][]>();

    const { returnValue: payoutMultiplier } = useViewFunction(getPayoutMultiplierViewPayload(boardAddress));

    const [isGameOver, setIsGameOver] = useState(false);

    const fetchBoard = useCallback(async (playerAddress: string) => {
        const board = await fetchMinesBoard(client, playerAddress);
        const tiles = makeBoard(board.numRows, board.numCols);
        board.gemCoordinates.forEach(({x, y}) => {
            tiles[x][y].isRevealed = true;
            tiles[x][y].isGem = true;
        });
        setBoard(board);
        setTiles(tiles);
    }, [client]);

    useEffect(() => {
        if(boardAddress) {
            setIsGameOver(false);
            fetchBoard(address);
        }
    }, [boardAddress]);

    const selectCell = async (row: number, col: number) => {
        if(!board || !tiles) return;
        let res = await submitTransaction({
            data: selectCellEntryFunctionPayload(
                row,
                col
            ),
            options: {
                maxGasAmount: 10000,
            }
        })
        if(res) {
            const events = res.events as Event<any>[];
            const revealedEvent = events.find((event) => event.type.includes("Revealed"));
            if(!revealedEvent) return;
            if(revealedEvent.type.includes("GemRevealed")) {
                const gemRevealedEvent = revealedEvent.data as GemRevealedEvent;
                const {predicted_row, predicted_col} = gemRevealedEvent;
                const newTiles = [...tiles];
                newTiles[predicted_row][predicted_col].isRevealed = true;
                newTiles[predicted_row][predicted_col].isGem = true;
                setTiles(newTiles);
                const newGemCoordinates = board.gemCoordinates.concat({x: predicted_row, y: predicted_col});
                setBoard({...board, gemCoordinates: newGemCoordinates});
            } else {
                const mineRevealedEvent = revealedEvent.data as GemRevealedEvent;
                const {predicted_row, predicted_col} = mineRevealedEvent;
                const newTiles = [...tiles];
                newTiles[predicted_row][predicted_col].isRevealed = true;
                setTiles(newTiles);
                setIsGameOver(true);
                toast({
                    title: "Game Over!",
                    description: "You hit a mine",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }

    const cashOut = async () => {
        let res = await submitTransaction({
            data: cashOutEntryFunctionPayload(),
            options: {
                maxGasAmount: 10000,
            }
        })
        if(res) {
            setIsGameOver(true);
            toast({
                title: "Success",
                description: "Successfully cashed out",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Error",
                description: "Failed to cash out",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return {
        board,
        tiles,
        isGameOver,
        payout: payoutMultiplier && board?.betAmount
            ? parseInt(payoutMultiplier[0] as string) * board.betAmount / parseInt(payoutMultiplier[1] as string) * (10000 - feeBasisPoints) / 10000
            : 0,
        selectCell,
        cashOut,
    }
}

export default useMinesBoard;