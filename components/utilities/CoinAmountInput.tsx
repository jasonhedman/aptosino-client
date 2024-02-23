import React, {useEffect, useState} from 'react';

import {FormControl, FormLabel, InputGroup, InputRightAddon, NumberInput, NumberInputField} from "@chakra-ui/react";

interface Props {
    amount: number;
    setAmount: (amount: number) => void;
    decimals: number;
    max?: number;
    min?: number;
    symbol?: string;
    label?: string;
}

const CoinAmountInput: React.FC<Props> = ({ decimals, max, min, amount, setAmount, symbol, label }) => {

    const zeroWithDecimals = `0.${'0'.repeat(decimals)}`;

    const [amountAsString, setAmountAsString] = useState(zeroWithDecimals);

    useEffect(() => {
        if(amount === 0) {
            setAmountAsString("");
        } else {
            setAmountAsString(amount.toString());
        }
    }, [decimals, amount, zeroWithDecimals]);

    const handleTextChange = (value: string) => {
        setAmountAsString(value);
        if(value == ""){
            setAmount(0);
        } else if(value[value.length-1] !== "."){
            setAmount(parseFloat(value));
        }
    }

    const onFocus = () => {
        if(amount === 0){
            setAmountAsString("");
        }
    }

    return (
        <FormControl>
            {
                label && <FormLabel>{label}</FormLabel>
            }
            <InputGroup>
                <NumberInput
                    value={amountAsString}
                    onChange={handleTextChange}
                    w='100%'
                    max={max}
                    min={min}
                    precision={decimals}
                    defaultValue={0}
                    focusBorderColor='brand.500'
                    onFocus={onFocus}
                >
                    <NumberInputField />
                </NumberInput>
                {
                    symbol && <InputRightAddon>{symbol}</InputRightAddon>
                }
            </InputGroup>
        </FormControl>
    );
};

export default CoinAmountInput;
