import React from 'react';

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb, FormControl, FormLabel, HStack, Text,
} from '@chakra-ui/react'

interface Props {
    value: number;
    setValue: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label?: string;
    suffix?: string;
}

const SliderInput: React.FC<Props> = ({ value, setValue, min, max, step, label, suffix }) => {
    return (
        <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <HStack
                w={'100%'}
                spacing={4}
            >
                <Slider
                    value={value}
                    onChange={setValue}
                    min={min}
                    max={max}
                    step={step}
                    focusThumbOnChange={false}
                    colorScheme={'brand'}
                    flex={1}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text
                    fontSize="sm"
                    fontWeight="medium"
                >
                    {value}{suffix || ""}
                </Text>
            </HStack>
        </FormControl>
    );
};

export default SliderInput;
