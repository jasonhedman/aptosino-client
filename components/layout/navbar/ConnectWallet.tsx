import React, { useEffect } from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useBreakpointValue,
    IconButton,
    useClipboard,
    useToast,
    Image,
    Flex, HStack, Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { FaWallet } from 'react-icons/fa'

import { useWallet, Wallet } from '@/wallet-adapter/wallet-adapter-react'

import { ellipsize } from '@/services/utils'
import CoinBalance from "@/components/utilities/CoinBalance";

const ConnectWallet = () => {

    const { connected, account, disconnect, wallets, connect } = useWallet();

    const { onCopy, setValue } = useClipboard("")

    const toast = useToast();

    useEffect(() => {
        if (account?.address) {
            setValue(account?.address?.toString())
        }
    }, [account, setValue])


    const onConnect = async (wallet : Wallet) => {
        connect(wallet.name);
    }

    const copy = () => {
        onCopy();
        toast({
            title: "Address Copied",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }
    

    const mobileView = useBreakpointValue({ base: true, sm: false })

    return (
        <HStack>
            {
                connected && account?.address && !mobileView &&  (
                    <CoinBalance
                        address={account.address.toString()}
                        coinType={"0x1::aptos_coin::AptosCoin"}
                        symbol={'APT'}
                        decimals={8}
                    />
                )
            }
            <Menu>
                {
                    mobileView ? (
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                            as={IconButton}
                            colorScheme={connected ? 'brand': 'gray'}
                            variant={connected ? 'outline' : 'solid'}
                            icon={mobileView ? <FaWallet /> : undefined}
                        >
                            {(connected ? ellipsize(account?.address?.toString()) : 'Connect Wallet')}
                        </MenuButton>
                    ) : (
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                            as={Button}
                            colorScheme={connected ? 'brand': 'gray'}
                            variant={connected ? 'outline' : 'solid'}
                            rightIcon={!mobileView ? <ChevronDownIcon /> : undefined}
                            leftIcon={!mobileView ? <FaWallet /> : undefined}
                        >
                            {(connected ? ellipsize(account?.address?.toString()) : 'Connect Wallet')}
                        </MenuButton>
                    )
                }

                <MenuList>
                    {
                        connected ? (
                            <>
                                <MenuItem
                                    onClick={copy}
                                >
                                    Copy Address
                                </MenuItem>
                                <MenuItem
                                    onClick={() => disconnect()}
                                >
                                    Disconnect
                                </MenuItem>
                            </>
                        ) : (
                            wallets.map(wallet => (
                                <MenuItem
                                    key={wallet.name}
                                    onClick={() => onConnect(wallet)}
                                    icon={<Image src={wallet.icon} boxSize={6} alt={wallet.name} />}
                                    fontWeight="medium"
                                    alignItems='center'
                                >
                                    <Flex
                                        justifyContent='space-between'
                                        alignItems='center'
                                        gap={4}
                                    >
                                        {wallet.name}
                                    </Flex>
                                </MenuItem>
                            ))
                        )
                    }

                </MenuList>
            </Menu>
        </HStack>
    )
}

export default ConnectWallet
