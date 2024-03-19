import React from 'react';

import {Box, BoxProps, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {Suit, Rank, Card} from "@/types/Card";

const resolveRank = (rank: Rank): string | number => {
    switch (rank) {
        case 1:
            return 'A'
        case 11:
            return 'J'
        case 12:
            return 'Q'
        case 13:
            return 'K'
        default:
            return rank
    }
}

const resolveSuitFragment = (suit: Suit) => {
    switch (suit) {
        case 0:
            return <>&spades;</>
        case 1:
            return <>&diams;</>
        case 2:
            return <>&hearts;</>
        case 3:
            return <>&clubs;</>
    }
}

const resolveSuitColor = (suit: Suit) => {
    switch (suit) {
        case 0:
        case 3:
            return 'black'
        case 1:
        case 2:
            return 'red'
    }
}

interface NumberAndSuitProps extends BoxProps {
    rank: Rank,
    suit: Suit,
}

const NumberAndSuit: React.FC<NumberAndSuitProps> = ({ rank, suit, ...rest }) => {
    return (
        <VStack
            alignItems={'center'}
            justifyContent={'center'}
            spacing={0}
            position={'absolute'}
            {...rest}
        >
            <Text
                fontSize={'2xl'}
                lineHeight={1}
            >
                {resolveRank(rank)}
            </Text>
            <Text
                fontSize={'2xl'}
                lineHeight={1}
            >
                {resolveSuitFragment(suit)}
            </Text>
        </VStack>
    );
}

interface Props {
    card: Card,
    height: number
}

const PlayingCard: React.FC<Props> = ({ card, height }) => {
    return (
        <Box
            aspectRatio={2/3}
            position={'relative'}
            height={height}
            borderWidth={1}
            borderRadius={4}
            borderColor={useColorModeValue('black', 'white')}
            color={resolveSuitColor(card.suit)}
            bg={'white'}
        >
            <NumberAndSuit
                rank={card.rank}
                suit={card.suit}
                top={1}
                left={1}
            />
            <Text
                fontSize={'6xl'}
                lineHeight={1}
                position={'absolute'}
                top={'50%'}
                left={'50%'}
                transform={'translate(-50%, -50%)'}
            >
                {resolveSuitFragment(card.suit)}
            </Text>
            <NumberAndSuit
                rank={card.rank}
                suit={card.suit}
                bottom={1}
                right={1}
                transform={'rotate(180deg)'}
            />
        </Box>
    );
};

export default PlayingCard;
