import React from 'react';

import {Game} from "@/types/Game";
import {Card, Image, Text} from "@chakra-ui/react";
import Link from "next/link";

interface Props {
    game: Game
}

const GameCard: React.FC<Props> = ({ game }) => {
    return (
        <Link
            href={game.url}
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <Card
                _hover={{
                    transform: "scale(1.02)"
                }}
                h={'100%'}
                animation={'all 0.2s ease-in-out'}
            >
                <Image
                    alt={game.title}
                    src={game.icon}
                    boxSize={12}
                />
                <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                >
                    {game.title}
                </Text>
                <Text
                    fontSize={'sm'}
                >
                    {game.description}
                </Text>
            </Card>
        </Link>
    );
};

export default GameCard;
