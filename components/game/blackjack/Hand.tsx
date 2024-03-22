import React from 'react';

import {Card} from "@/types/Card";
import PlayingCard from "@/components/playingCard";
import {HStack, Text, VStack} from "@chakra-ui/react";

interface Props {
    cards: Card[],
    isPlayer: boolean,
    handValue: number[],
    shouldFlip?: boolean,
}

const Hand: React.FC<Props> = ({ cards, isPlayer, shouldFlip, handValue }) => {
    return (
        <VStack
            backgroundColor={isPlayer ? 'brand.500' : undefined}
            rounded={'md'}
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
                    cards.map((card, index) => (
                        <PlayingCard
                            key={`${card.suit}-${card.rank}-${index}`}
                            card={card}
                            height={{
                                base: 100,
                                md: 150
                            }}
                            shouldFlip={shouldFlip}
                        />
                    ))
                }
                {
                    isPlayer ? (
                        cards.length < 2 && (
                            Array.from({length: 2 - cards.length}).map((_, index) => (
                                <PlayingCard
                                    key={index}
                                    card={{
                                        suit: 1,
                                        rank: 1
                                    }}
                                    height={150}
                                />
                            ))
                        )
                    ) : (
                        cards.length < 1 && (
                            <PlayingCard
                                card={{
                                    suit: 1,
                                    rank: 1
                                }}
                                height={150}
                            />
                        )
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
