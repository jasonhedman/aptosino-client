export interface Coordinate {
    x: number;
    y: number;
}

export interface Tile extends Coordinate {
    isGem: boolean;
    isRevealed: boolean;
}

export interface MinesBoard {
    numRows: number;
    numCols: number;
    numMines: number;
    gemCoordinates: Coordinate[];
    betAmount: number;
}

export interface GemRevealedEvent {
    player_address: string;
    predicted_row: number;
    predicted_col: number;
}

export interface MineRevealedEvent {
    player_address: string;
    predicted_row: number;
    predicted_col: number;
}