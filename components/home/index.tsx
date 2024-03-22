import React from 'react';

import {Image, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import games from "@/data/games";
import GameCard from "@/components/home/GameCard";
import LogoText from "@/components/utilities/LogoText";

const Home = () => {
    return (
        <VStack
            w={'100%'}
        >
            <VStack
                spacing={8}
                w={'100%'}
                maxW={'640px'}
            >
                <VStack>
                    <Image
                        src={'/logo.png'}
                        alt={'Logo'}
                        w={'100px'}
                    />
                    <LogoText
                        direction={'row'}
                        size={'4xl'}
                    />
                    <Text
                        textAlign={'center'}
                    >
                        The first provably-fair, full-transparent, on-chain casino.
                    </Text>
                </VStack>
                <SimpleGrid
                    columns={{
                        base: 2,
                        sm: 3
                    }}
                    gap={4}
                    w={'100%'}
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
                <Text
                    fontSize={'sm'}
                    textAlign={'center'}
                    opacity={0.75}
                >
                    Disclaimer: This is a demo site and is NOT intended for real use. The games are for demo purposes only and do not offer real money gambling or an opportunity to win real money or prizes. The games are solely intended to display the capabilities of a fully on-chain casino.
                </Text>
            </VStack>
        </VStack>
    );
};

export default Home;
