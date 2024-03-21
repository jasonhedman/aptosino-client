import React from 'react';
import {Tile as TileType} from "@/types/Mines";
import {SimpleGrid} from "@chakra-ui/react";
import Tile from "@/components/game/mines/Tile";

interface Props {
    tiles: TileType[][];
    selectCell: (row: number, col: number) => void;
    isGameOver: boolean;
}

const BoardDisplay: React.FC<Props> = ({ tiles, selectCell, isGameOver }) => {
    return (
        <SimpleGrid
            columns={tiles[0].length}
            gap={2}
            w={`${tiles[0].length * 50}px`}
            h={`${tiles.length * 50}px`}
        >
            {tiles.map((row, i) => (
                row.map((tile, j) => (
                    <Tile
                        key={`${i}-${j}`}
                        isGem={tile.isGem}
                        isRevealed={tile.isRevealed}
                        onClick={() => selectCell(i, j)}
                        isGameOver={isGameOver}
                    />
                ))
            ))}
        </SimpleGrid>
    );
};

export default BoardDisplay;
