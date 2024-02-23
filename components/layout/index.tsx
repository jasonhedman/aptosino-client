import React from 'react';

import {Box, Container} from '@chakra-ui/react';


import Navbar, { navbarHeight } from '@/components/layout/navbar'
import IncorrectNetwork from '@/components/utilities/IncorrectNetwork';

import useWallet from '@/hooks/useWallet';
import {Network} from "@aptos-labs/ts-sdk";

interface Props {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {

    const { network, connected } = useWallet();

    const correctNetwork = network?.name.toLowerCase() == Network.RANDOMNET

    return (
        <main>
            <Box
                minH="100vh"
                minW="100vw"
            >
                <Container
                    maxW='6xl'
                    justifyContent='center'
                    p={0}
                    >
                    <Box
                        display='flex'
                        gap={4}
                        p={{ base: 4, md: 8}}
                        pt={{ base: 4 + navbarHeight, md: 8 + navbarHeight }}
                    >
                        <Navbar />
                        {
                            connected && !correctNetwork
                                ? <IncorrectNetwork />
                                : children
                        }
                    </Box>
                </Container>
            </Box>
        </main>
    );
}

export default DefaultLayout;