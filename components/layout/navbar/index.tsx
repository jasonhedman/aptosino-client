import React from 'react';

import Link from 'next/link';

import {
    Flex,
    HStack,
    Image,
    Button,
    Box, Text
} from '@chakra-ui/react'

import ConnectWallet from './ConnectWallet';
import ColorModeToggle from './ColorModeToggle';
import MobileNav from './MobileNav';
import Navlinks from './navLinks';

export const navbarHeight = 20;
  
const Navbar : React.FC = () => {    
    return (
        <Flex
            position='absolute'
            top={0}
            left={0}
            right={0}
            zIndex={100}
            height={navbarHeight}
            w='100%'
            gap={8}
            alignItems='center'
            p={4}
        >
            <Link
                href='/'
            >
                <Button
                    variant='ghost'
                    colorScheme='brand'
                    px={0}
                    gap={4}
                >
                    <Image 
                        src="/logo.png"
                        height={12}
                        width={12}
                        alt='Aptosino Logo'
                    />
                    <Text
                        fontSize='2xl'
                        fontWeight='bold'
                    >
                        Aptosino
                    </Text>
                </Button>
            </Link>
            <Box
                display={{ base: 'none', md: 'flex' }}
            >
                <Navlinks />
            </Box>
            <HStack 
                flex={1}
                justifyContent='flex-end'
            >
                <ConnectWallet />
                <ColorModeToggle />
                <MobileNav />
            </HStack>
        </Flex>
    );
};

export default Navbar