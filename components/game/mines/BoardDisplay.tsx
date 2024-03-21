import React from 'react';
import {Tile as TileType} from "@/types/Mines";
import {SimpleGrid} from "@chakra-ui/react";
import Tile from "@/components/game/mines/Tile";

interface Props {
    tiles: TileType[][];
    selectCell: (row: number, col: number) => void;
    isGameOver: boolean;
    isGameActive: boolean;
}

const BoardDisplay: React.FC<Props> = ({ tiles, selectCell, isGameOver, isGameActive }) => {
    return (
        <SimpleGrid
            columns={tiles[0].length}
            gap={2}
            w={`${tiles[0].length * 50}px`}
            h={`${tiles.length * 50}px`}
            borderWidth={1}
            rounded={'md'}
            p={2}
            borderColor={isGameActive ? 'brand.500' : undefined}
        >
            {tiles.map((row, i) => (
                row.map((tile, j) => (
                    <Tile
                        key={`${i}-${j}`}
                        isGem={tile.isGem}
                        isRevealed={tile.isRevealed}
                        onClick={() => selectCell(i, j)}
                        isGameOver={isGameOver}
                        isGameActive={isGameActive}
                    />
                ))
            ))}
        </SimpleGrid>
    );
};

export default BoardDisplay;
