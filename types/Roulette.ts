export enum BetTypes {
    COLOR,
    NUMBER,
    EVEN_ODD,
    DOZENS,
    HALVES,
    // NUMBER,
    // EIGHTS
}

export interface Bet {
    predictedOutcome: number[];
    name: string;
    amount: number;
}