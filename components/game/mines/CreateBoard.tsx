import React from 'react';

import {Button, Stack, VStack} from "@chakra-ui/react";

import CoinAmountInput from "@/components/utilities/CoinAmountInput";
import SliderInput from "@/components/utilities/SliderInput";

interface Props {
    betAmount: number;
    setBetAmount: (betAmount: number) => void;
    numCols: number;
    setNumCols: (numCols: number) => void;
    numRows: number;
    setNumRows: (numRows: number) => void;
    numMines: number;
    setNumMines: (numMines: number) => void;
    createBoard: () => Promise<void>;
    isDisabled: boolean;
}

const CreateBoard: React.FC<Props> = ({ betAmount, setBetAmount, numCols, setNumCols, numRows, setNumRows, numMines, setNumMines, createBoard, isDisabled }) => {
    return (
        <VStack
            w={'100%'}
        >
            <CoinAmountInput
                amount={betAmount}
                setAmount={setBetAmount}
                decimals={8}
                label={"Bet Amount"}
                symbol={"APT"}
            />
            <Stack
                w={'100%'}
                spacing={{
                    base: 2,
                    md: 8
                }}
                direction={{
                    base: 'column',
                    md: 'row'
                }}
            >
                <SliderInput
                    value={numCols}
                    setValue={setNumCols}
                    min={3}
                    max={10}
                    label={"Columns"}
                />
                <SliderInput
                    value={numRows}
                    setValue={setNumRows}
                    min={3}
                    max={10}
                    label={"Rows"}
                />
                <SliderInput
                    value={numMines}
                    setValue={setNumMines}
                    min={1}
                    max={numCols * numRows - 1}
                    label={"Mines"}
                />
            </Stack>
            <Button
                onClick={createBoard}
                colorScheme={'brand'}
                w={'100%'}
                isDisabled={isDisabled}
            >
                Create Board
            </Button>
        </VStack>
    );
};

export default CreateBoard;
