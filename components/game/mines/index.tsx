import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import GameCard from "@/components/game/GameCard";
import CreateBoard from "@/components/game/mines/CreateBoard";
import BoardDisplay from "@/components/game/mines/BoardDisplay";
import Board from "@/components/game/mines/Board";

import useMines from "@/hooks/games/mines/useMines";

import {mines} from "@/data/games";

const MinesGame = () => {

    const {
        boardAddress,
        startGame,
        betAmount,
        setBetAmount,
        numCols,
        setNumCols,
        numRows,
        setNumRows,
        numMines,
        setNumMines,
        boardDisplay,
        isDisabled,
        resetBoard
    } = useMines();

    return (
        <GameCard game={mines}>
                {
                    boardAddress ? (
                        <Board
                            boardAddress={boardAddress}
                            resetBoard={resetBoard}
                        />
                    ) : (
                        <VStack
                            w={'100%'}
                            spacing={4}
                        >
                            <Text
                                fontSize={'xl'}
                                fontWeight={'bold'}
                            >
                                Create a Mines Board
                            </Text>
                            <BoardDisplay
                                tiles={boardDisplay}
                                selectCell={() => {}}
                                isGameOver={false}
                                isGameActive={false}
                            />
                            <CreateBoard
                                betAmount={betAmount}
                                setBetAmount={setBetAmount}
                                numCols={numCols}
                                setNumCols={setNumCols}
                                numRows={numRows}
                                setNumRows={setNumRows}
                                numMines={numMines}
                                setNumMines={setNumMines}
                                createBoard={startGame}
                                isDisabled={isDisabled}
                            />
                        </VStack>
                    )
                }
        </GameCard>
    );
};

export default MinesGame;
