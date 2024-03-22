import React from 'react';

import {Box, BoxProps, Image, Text, VStack} from "@chakra-ui/react";

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
    height: number,
    shouldFlip?: boolean,
    flipOffset?: number,
}

const PlayingCard: React.FC<Props> = ({ card, height, shouldFlip, flipOffset }) => {

    const [isFlipped, setIsFlipped] = React.useState(false)

    React.useEffect(() => {
        if (shouldFlip) {
            const timeout = setTimeout(() => {
                setIsFlipped(true);
            }, 500 + (flipOffset || 0))
            return () => clearTimeout(timeout)
        }
    }, [shouldFlip])

    return (
        <Box
            aspectRatio={2/3}
            height={height}
            color={resolveSuitColor(card.suit)}
            style={{
                perspective: '1000px',
            }}
        >
            <Box
                position={'relative'}
                style={{
                    transformStyle: 'preserve-3d',
                }}
                transition={'transform 0.5s '}
                w={'100%'}
                h={'100%'}
                transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
                borderWidth={1}
                borderColor={'black'}
                rounded={'md'}
            >
                <Box
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    transform={isFlipped ? 'scaleX(-1)' : 'scaleX(1)'}
                    bg={'white'}
                    rounded={'md'}
                >
                    <Box
                        position={'relative'}
                        style={{
                            backfaceVisibility: 'hidden',
                        }}
                        w={'100%'}
                        h={'100%'}
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
                </Box>
                <Box
                    w={'100%'}
                    h={'100%'}
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    style={{
                        backfaceVisibility: 'hidden',
                    }}
                    // transform={isFlipped ? 'scaleX(1)' : 'scaleX(-1)'}
                    bg={'white'}
                    rounded={'md'}
                >
                    <VStack
                        position={'absolute'}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%)'}
                    >
                        <Image
                            src={'/logo.png'}
                            boxSize={12}
                            alt={'Logo'}
                        />
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
};

export default PlayingCard;
