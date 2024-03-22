import React from 'react';
import {Stack, Text, useColorModeValue} from "@chakra-ui/react";

const LogoSubtext = ({children} : {children: React.ReactNode}) => {

    const logoSubcolor = useColorModeValue('black', 'white');

    return (
        <Text
            as='span'
            color={logoSubcolor}
            fontSize={'sm'}
        >
            {children}
        </Text>
    );
}

interface Props {
    direction?: 'row' | 'column';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const LogoText: React.FC<Props> = ({ direction='column', size='xl' }) => {
    return (
        <Stack
            spacing={0}
            alignItems='flex-start'
            direction={direction}
        >
            <Text
                fontSize={size}
                fontWeight='bold'
                color={'brand.500'}
                lineHeight={1}
            >
                L<LogoSubtext>ucky</LogoSubtext>
            </Text>
            <Text
                fontSize={size}
                fontWeight='bold'
                color={'brand.500'}
                lineHeight={1}
            >
                L<LogoSubtext>eopards</LogoSubtext>
            </Text>
            <Text
                fontSize={size}
                fontWeight='bold'
                color={'brand.500'}
                lineHeight={1}
            >
                C<LogoSubtext>lub</LogoSubtext>
            </Text>
        </Stack>
    );
};

export default LogoText;
