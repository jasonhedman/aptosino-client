import React from 'react';

import {Card, Heading, TabList, TabPanel, TabPanels, Tab, Tabs, Text, VStack, Divider} from "@chakra-ui/react";

import Deposit from "@/components/stake/Deposit";
import HouseInformation from "@/components/stake/HouseInformation";
import UserInformation from "@/components/stake/UserInformation";
import Withdraw from "@/components/stake/Withdraw";

import useStake from "@/hooks/games/useStake";

import {useHouse} from "@/contexts/HouseContext";


const Stake = () => {

    const {
        houseAddress,
        minBet,
        maxBet,
        maxMultiplier,
        feeBasisPoints
    } = useHouse();

    const {
        depositAmount,
        setDepositAmount,
        withdrawAmount,
        setWithdrawAmount,
        deposit,
        withdraw,
        address,
        houseSharesPerAPT,
        APTPerHouseShare
    } = useStake();

    return (
        <Card
            w={'100%'}
            p={4}
            gap={4}
        >
            <VStack
                w={'100%'}
                spacing={0}
                alignItems={'flex-start'}
            >
                <Heading>
                    Stake
                </Heading>
                <Text>
                    Stake your APT to the house to earn fees.
                </Text>
            </VStack>
            <UserInformation />
            <Divider />
            <Tabs
                w={'100%'}
                isFitted
                colorScheme={'brand'}
            >
                <TabList>
                    <Tab>
                        Deposit
                    </Tab>
                    <Tab>
                        Withdraw
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Deposit
                            depositAmount={depositAmount}
                            setDepositAmount={setDepositAmount}
                            deposit={deposit}
                            houseSharesPerAPT={houseSharesPerAPT}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Withdraw
                            withdrawAmount={withdrawAmount}
                            setWithdrawAmount={setWithdrawAmount}
                            withdraw={withdraw}
                            APTperHouseShares={APTPerHouseShare}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Divider />
            <HouseInformation
                houseAddress={houseAddress}
                minBet={minBet}
                maxBet={maxBet}
                maxMultiplier={maxMultiplier}
                feeBasisPoints={feeBasisPoints}
                houseSharesPerAPT={houseSharesPerAPT}
                APTPerHouseShare={APTPerHouseShare}
            />
        </Card>
    );
};

export default Stake;
