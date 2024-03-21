import {Aptos, InputViewRequestData} from "@aptos-labs/ts-sdk";

import {deserializeU8Vector} from "@/services/utils";

import {Card, Rank, Suit} from "@/types/Card";

export const deserializeCard = (cardString: string): Card => {
    let cardArr = deserializeU8Vector(cardString);
    return {
        rank: cardArr[0] as Rank,
        suit: cardArr[1] as Suit
    }
}

export const getCards = (client: Aptos, payload: InputViewRequestData): Promise<Card[] | null> => {
    return client.view({
        payload
    })
        .then((res) => {
            if(!res[0]) return null;
            return (res[0] as string[]).map((cardStr) => deserializeCard(cardStr))
        })
        .catch((e) => {console.log(e); return null})
}

// gets all possible hand values
export const getHandValue = (cards: Card[]): number[] => {
    let values = [0];
    cards.forEach((card) => {
        let newValues: number[] = [];
        values.forEach((value) => {
            newValues.push(value + Math.min(card.rank, 10));
            if(card.rank === 1) {
                newValues.push(value + 11);
            }
        })
        values = newValues;
    })
    return values;
}