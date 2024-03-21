import {useCallback, useEffect, useMemo, useState} from "react";

import {useToast} from "@chakra-ui/react";

import useWallet from "@/hooks/useWallet";

import {useAptos} from "@/contexts/AptosContext";

import {fromAptos} from "@/services/utils";
import {fetchMinesBoardAddress, makeBoard} from "@/services/mines";

import {createBoardEntryFunctionPayload} from "@/config/modules/minesModule";

const useMines = () => {

    const toast = useToast();

    const { address, submitTransaction } = useWallet();

    const { client } = useAptos();

    const [isLoading, setIsLoading] = useState(false);
    const [betAmount, setBetAmount] = useState(0);
    const [numRows, setNumRows] = useState(5);
    const [numCols, setNumCols] = useState(5);
    const [numMines, setNumMines] = useState(12);
    const [boardAddress, setBoardAddress] = useState<string | null>(null);

    const boardDisplay = useMemo(() => {
        return makeBoard(numRows, numCols);
    }, [numRows, numCols]);

    const isDisabled = useMemo(() => {
        return betAmount <= 0 || numCols <= 0 || numRows <= 0 || numMines <= 0;
    }, [betAmount, numCols, numRows, numMines]);

    const fetchGameData = useCallback(async (address: string) => {
        setIsLoading(true);
        const boardAddress = await fetchMinesBoardAddress(client, address);
        setBoardAddress(boardAddress);
        setIsLoading(false);
    }, [client]);

    useEffect(() => {
        if(address) {
            fetchGameData(address);
        }
    }, [address]);

    useEffect(() => {
        if(numMines >= numRows * numCols) {
            setNumMines(numRows * numCols - 1);
        }
    }, [numRows, numCols]);

    const startGame = async () => {
        if(isDisabled) return;
        let res = await submitTransaction({
            data: createBoardEntryFunctionPayload(
                fromAptos(betAmount),
                numRows,
                numCols,
                numMines
            ),
            options: {
                maxGasAmount: 10000,
            }
        })
        if (res) {
            toast({
                title: "Board Created",
                description: `You have started a game with a bet of ${betAmount} APT`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            fetchGameData(address);
        }
    }

    const resetBoard = () => {
        setBoardAddress(null);
    }

    return {
        betAmount,
        numCols,
        numRows,
        numMines,
        boardAddress,
        boardDisplay,
        isDisabled,
        isLoading,
        setBetAmount,
        setNumCols,
        setNumRows,
        setNumMines,
        startGame,
        resetBoard
    }
}

export default useMines;
