import React from 'react';

import Link from "next/link";

import {Box, Button, Image, Text, Tooltip, useColorModeValue} from "@chakra-ui/react";

import {Game} from "@/types/Game";

interface Props {
    game: Game,
}

const GameButton: React.FC<Props> = ({ game }) => {
    return (
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
                color={useColorModeValue('black', 'white')}
            >
                {game.title}
            </Text>
        </Button>
    );
}

const GameCard: React.FC<Props> = ({ game }) => {

    if(game.comingSoon) {
        return (
            <Tooltip
                label={'Coming Soon'}
                aria-label={'Coming Soon'}
            >
                <Box>
                    <GameButton game={game} />
                </Box>
            </Tooltip>
        )
    }

    return (
        <Link
            href={game.url}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <GameButton game={game} />
        </Link>
    );
};

export default GameCard;
