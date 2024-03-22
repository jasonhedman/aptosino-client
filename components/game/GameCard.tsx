import React from 'react';

import {Game} from "@/types/Game";
import {Card, Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";

interface Props {
    game: Game,
    children: React.ReactNode
}

const GameCard: React.FC<Props> = ({ game, children }) => {
    return (
        <Card
            w={'100%'}
            p={4}
            gap={4}
        >
            <HStack
                spacing={4}
            >
                <Image
                    src={game.icon}
                    boxSize={16}
                    alt={game.title}
                />
                <VStack
                    alignItems={'left'}
                    spacing={0}
                >
                    <Heading>
                        {game.title}
                    </Heading>
                    <Text
                        fontSize={{
                            base: 'xs',
                            md: 'md'
                        }}
                        opacity={0.75}
                    >
                        {game.description}
                    </Text>
                </VStack>
            </HStack>
            {children}
        </Card>
    );
};

export default GameCard;
