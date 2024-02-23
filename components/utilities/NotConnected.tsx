import React from 'react'

import {Card, Text} from '@chakra-ui/react'


const NotConnected = () => {
  return (
    <Card>
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Not Connected
        </Text>
        <Text>
            You must have a connected wallet to view this page.
        </Text>
    </Card>
  )
}

export default NotConnected