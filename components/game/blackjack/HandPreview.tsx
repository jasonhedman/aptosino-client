import React from 'react';
import {HStack} from "@chakra-ui/react";
import Hand from "@/components/game/blackjack/Hand";
import {Card} from "@/types/Card";

const dummyCards: Card[] = [
    {
        suit: 1,
        rank: 1
    },
    {
        suit: 1,
        rank: 13
    }
];

const HandPreview = () => {
    return (
        <HStack
            w={'100%'}
        >
            <Hand
                cards={dummyCards}
                isPlayer={true}
                handValue={[]}
            />
            <Hand
                cards={dummyCards.slice(0, 1)}
                isPlayer={false}
                handValue={[]}
            />
        </HStack>
    );
};

export default HandPreview;
