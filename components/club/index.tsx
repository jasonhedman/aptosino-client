import React, {useEffect, useState} from 'react';

import {Card, Heading, HStack, Icon, Image, SimpleGrid, Tag, Text, VStack} from "@chakra-ui/react";
import {MdLeaderboard, MdOutlineMoneyOffCsred} from "react-icons/md";
import {RiGovernmentFill} from "react-icons/ri";

const benefits = [
    {
        icon: MdOutlineMoneyOffCsred,
        text: 'Zero Fees'
    },
    {
        icon: MdLeaderboard,
        text: 'Boosted Rewards'
    },
    {
        icon: RiGovernmentFill,
        text: 'Governance'
    }
]

const Club = () => {

    const [selectedImages, setSelectedImages] = useState<number[]>([1, 2, 3]);

    useEffect(
        () => {
        const interval = setInterval(() => {
            setSelectedImages(prevState => {
                let newImage1 = Math.floor(Math.random() * 7) + 1;
                while (prevState.includes(newImage1)) {
                    newImage1 = Math.floor(Math.random() * 7) + 1;
                }
                let newImage2 = Math.floor(Math.random() * 7) + 1;
                while (newImage2 === newImage1 || prevState.includes(newImage2)) {
                    newImage2 = Math.floor(Math.random() * 7) + 1;
                }
                let newImage3 = Math.floor(Math.random() * 7) + 1;
                while (newImage3 === newImage1 || newImage3 === newImage2 || prevState.includes(newImage3)) {
                    newImage3 = Math.floor(Math.random() * 7) + 1;
                }
                return [newImage1, newImage2, newImage3];
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            w={'100%'}
            p={4}
            gap={4}
        >
            <HStack
                w={'100%'}
                spacing={0}
                justifyContent={'space-between'}
            >
                <Heading>
                    Join the Club
                </Heading>
                <Tag
                    colorScheme={'brand'}
                >
                    Coming Soon
                </Tag>
            </HStack>
            <Text>
                The Lucky Leapords Club is a collection of 7,777 unique NFTs that will grant access to exclusive benefits and features on the platform.
            </Text>
            <HStack
                spacing={8}
                w={'100%'}
                justifyContent={'space-evenly'}
            >
                {
                    benefits.map((benefit) => (
                        <VStack key={benefit.text}>
                            <Icon
                                as={benefit.icon}
                                w={16}
                                h={16}
                                color={'brand.500'}
                            />
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                            >
                                {benefit.text}
                            </Text>
                        </VStack>
                    ))
                }
            </HStack>
            <SimpleGrid
                columns={3}
                gap={8}
            >
                {
                    selectedImages.map((selectedImage) => (
                        <Image
                            key={selectedImage}
                            src={`/leopards/${selectedImage}.png`}
                            alt={`Club Member ${selectedImage}`}
                            rounded={'md'}
                        />
                    ))
                }
            </SimpleGrid>
        </Card>
    );
};

export default Club;
