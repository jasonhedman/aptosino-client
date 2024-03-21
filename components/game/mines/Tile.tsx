import React, {useEffect} from 'react';
import {Icon, IconButton} from "@chakra-ui/react";
import {FaBomb, FaQuestion} from "react-icons/fa6";
import {FaGem} from "react-icons/fa";
import {makeConfetti} from "@/services/confetti";

interface Props {
    isGem: boolean,
    isRevealed: boolean,
    onClick: () => void,
    isGameOver: boolean
}

const Tile: React.FC<Props> = ({ isGem, isRevealed, onClick, isGameOver }) => {

    let buttonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(isGem && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            makeConfetti(x, y)
        }
    }, [isGem]);


    return (
        <IconButton
            aria-label={'tile'}
            icon={
                <Icon
                    as={isRevealed
                        ? (isGem
                            ? FaGem
                            : FaBomb
                        ) : FaQuestion
                    }
                    color={'white'}
                />
            }
            onClick={(isRevealed || isGameOver) ? undefined : onClick}
            colorScheme={
                isRevealed
                    ? (isGem
                        ? 'brand'
                        : 'red'
                    ) : 'gray'
            }
            w={'100%'}
            h={'100%'}
            ref={buttonRef}
        />
    );
};

export default Tile;
