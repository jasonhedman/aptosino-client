import React from 'react';
import {HStack, Skeleton, Text, VStack} from "@chakra-ui/react";
import CoinBalance from "@/components/utilities/CoinBalance";
import useWallet from "@/hooks/useWallet";
import {APTOS_COIN} from "@aptos-labs/ts-sdk";
import {houseCoin} from "@/config/modules/houseModule";

const UserInformation = () => {

    const { address } = useWallet();

    if(!address) {
        return <Skeleton height={'100px'} width={'100%'}/>;
    }

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
            border={'1px solid'}
            rounded={'md'}
            p={2}
            borderColor={'brand.500'}
        >
            <Text
                fontSize={'sm'}
                fontWeight={'bold'}
                color={'brand.500'}
            >
                User Information
            </Text>
            <HStack
                w={'100%'}
                spacing={4}
                alignItems={'center'}
            >
                <HStack
                    flex={1}
                >
                    <Text>
                        APT Balance:
                    </Text>
                    <CoinBalance
                        address={address}
                        coinType={APTOS_COIN}
                        symbol={"APT"}
                        decimals={8}
                    />
                </HStack>
                <HStack
                    flex={1}
                >
                    <Text>
                        STAKE balance:
                    </Text>
                    <CoinBalance
                        address={address}
                        coinType={houseCoin}
                        symbol={"STAKE"}
                        decimals={8}
                    />
                </HStack>
            </HStack>
        </VStack>
    );
};

export default UserInformation;
