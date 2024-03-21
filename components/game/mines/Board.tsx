import React from 'react';

import useMinesBoard from "@/hooks/games/mines/useMinesBoard";
import {Button, HStack, Skeleton, Text, VStack} from "@chakra-ui/react";
import BoardDisplay from "@/components/game/mines/BoardDisplay";

interface Props {
    boardAddress: string,
    resetBoard: () => void
}

const Board: React.FC<Props> = ({ boardAddress, resetBoard }) => {

    const {
        board,
        tiles,
        payout,
        isGameOver,
        selectCell,
        cashOut,
    } = useMinesBoard(boardAddress);

    if(!board || !tiles) return (<Skeleton h={'500px'} w={'100%'} />);

    let remainingGems = board.numRows * board.numCols - board.numMines - board.gemCoordinates.length;

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <VStack>
                <Text
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                >
                    Mines Board
                </Text>
                <HStack
                    spacing={4}
                >
                    <Text>
                        Number of Mines: {board.numMines}
                    </Text>
                    <Text>
                        Remaining Gems: {remainingGems}
                    </Text>
                </HStack>
            </VStack>
            <BoardDisplay
                tiles={tiles}
                selectCell={selectCell}
                isGameOver={isGameOver}
            />
            {
                isGameOver ? (
                    <Button
                        onClick={resetBoard}
                        colorScheme={'brand'}
                    >
                        Play Again
                    </Button>
                ) : (
                    <Button
                        onClick={cashOut}
                        colorScheme={'brand'}
                        isDisabled={isGameOver}
                    >
                        Cash Out {payout.toFixed(4)} APT
                    </Button>
                )
            }

        </VStack>
    );
};

export default Board;
