import React from 'react';

import {Heading, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import games from "@/data/games";
import GameCard from "@/components/home/GameCard";

const Home = () => {
    return (
        <VStack
            alignItems={'left'}
            spacing={8}
        >
            <VStack
                alignItems={'left'}
            >
                <Heading>
                    Aptosino
                </Heading>
                <Text>
                    The first provably-fair, truly-random blockchain casino.
                </Text>
            </VStack>
            <SimpleGrid
                columns={{
                    base: 1,
                    sm: 2,
                    md: 3
                }}
                gap={4}
            >
                {
                    games.map(game => (
                        <GameCard
                            key={game.title}
                            game={game}
                        />
                    ))
                }
            </SimpleGrid>
        </VStack>
    );
};

export default Home;
