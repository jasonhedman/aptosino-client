import React from 'react';
import {HStack, SimpleGrid, Skeleton, Text, VStack} from "@chakra-ui/react";
import CoinBalance from "@/components/utilities/CoinBalance";
import {APTOS_COIN} from "@aptos-labs/ts-sdk";
import Copyable from "@/components/utilities/Copyable";
import {ellipsize} from "@/services/utils";

interface Props {
    houseAddress: string;
    minBet: number;
    maxBet: number;
    maxMultiplier: number;
    feeBasisPoints: number;
    houseSharesPerAPT: number;
    APTPerHouseShare: number;
}

const HouseInformation: React.FC<Props> = ({ houseAddress, minBet, maxBet, maxMultiplier, feeBasisPoints, houseSharesPerAPT, APTPerHouseShare }) => {

    if(!houseAddress) return <Skeleton
        height={'100px'}
        w={'100%'}
    />;

    const information: {title: string, component: React.ReactNode}[] = [
        {
            title: 'House Balance',
            component: <CoinBalance
                address={houseAddress}
                coinType={APTOS_COIN}
                symbol={"APT"}
                decimals={8}
            />
        },
        {
            title: 'House Address',
            component: <Copyable display={ellipsize(houseAddress)} copyText={houseAddress} fontWeight={'bold'}/>
        },
        {
            title: 'House Shares per APT',
            component: <Text><strong>{houseSharesPerAPT.toFixed(4)} STAKE</strong></Text>
        },
        {
            title: 'APT per House Share',
            component: <Text><strong>{APTPerHouseShare.toFixed(4)} APT</strong></Text>
        },
        {
            title: 'Min Bet',
            component: <Text><strong>{minBet} APT</strong></Text>
        },
        {
            title: 'Max Bet',
            component: <Text><strong>{maxBet} APT</strong></Text>
        },
        {
            title: 'Max Multiplier',
            component: <Text><strong>{maxMultiplier}x</strong></Text>
        },
        {
            title: 'Fee Basis Points',
            component: <Text><strong>{feeBasisPoints/10000}%</strong></Text>
        }
    ];

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
                House Information
            </Text>
            <SimpleGrid
                columns={2}
                w={'100%'}
                spacing={4}
            >
                {
                    information.map((info, index) => (
                        <HStack
                            key={index}
                            justifyContent={'space-between'}
                        >
                            <Text>
                                {info.title}:
                            </Text>
                            {info.component}
                        </HStack>
                    ))
                }
            </SimpleGrid>
        </VStack>
    );
};

export default HouseInformation;
