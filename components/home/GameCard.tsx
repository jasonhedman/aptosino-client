import React from 'react';

import {Game} from "@/types/Game";
import {Button, Card, Image, Text} from "@chakra-ui/react";
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
                width: '100%',
            }}
        >
            <Button
                h={'100%'}
                animation={'all 0.2s ease-in-out'}
                aspectRatio={1}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                p={2}
                variant={'outline'}
                colorScheme={'brand'}
                w={'100%'}
            >
                <Image
                    alt={game.title}
                    src={game.icon}
                    boxSize={24}
                />
                <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                >
                    {game.title}
                </Text>
            </Button>
        </Link>
    );
};

export default GameCard;
