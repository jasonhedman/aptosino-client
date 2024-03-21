import React from 'react';

import {Card} from "@/types/Card";
import PlayingCard from "@/components/playingCard";
import {Box, HStack, Text, VStack} from "@chakra-ui/react";

interface Props {
    cards: Card[],
    isPlayer: boolean,
    handValue: number[],
    shouldFlip?: boolean,
    ref?: React.RefObject<HTMLDivElement>,
}

const Hand: React.FC<Props> = ({ cards, isPlayer, shouldFlip, ref, handValue }) => {
    return (
        <VStack
            backgroundColor={isPlayer ? 'brand.500' : undefined}
            rounded={'md'}
            ref={ref}
            flex={1}
            py={4}
        >
            <Text
                color={isPlayer ? 'white' : undefined}
                fontWeight={'bold'}
            >
                {isPlayer ? "Your" : "Dealer's"} Hand
            </Text>
            <HStack
                flexWrap={'wrap'}
                justifyContent={'center'}
            >
                {
                    cards.length === 0 ? (<Box height={150} width={100} />) : (
                        cards.map((card, index) => (
                            <PlayingCard
                                key={`${card.suit}-${card.rank}-${index}`}
                                card={card}
                                height={150}
                                shouldFlip={shouldFlip}
                            />
                        ))
                    )
                }
            </HStack>
            <Text
                color={isPlayer ? 'white' : undefined}
                fontWeight={'bold'}
            >
                Hand Value{handValue.length > 1 ? 's' : ''}: {handValue.length === 0 ? "?" : handValue.join(', ')}
            </Text>
        </VStack>
    );
};

export default Hand;
