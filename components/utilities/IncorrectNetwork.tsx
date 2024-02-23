import React from 'react'

import {Card, Text} from '@chakra-ui/react'

const IncorrectNetwork = () => {
  return (
    <Card
        p={8}
    >
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Incorrect Network
        </Text>
        <Text>
            Aptosino is currently only available on the Aptos Randomnet. You must connect your wallet and switch to the Aptos Randomnet to use Aptosino.
        </Text>
    </Card>
  )
}

export default IncorrectNetwork