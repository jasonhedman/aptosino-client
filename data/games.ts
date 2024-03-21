import {Game} from "@/types/Game";

export const dice: Game = {
    title: "Dice",
    description: "Test your luck by betting on the outcome of a thrilling 100-sided dice roll! If the outcome is less than your prediction, you win!",
    url: "/dice",
    icon: "/dice.png",
}

export const roulette: Game = {
    title: "Roulette",
    description: "Place your bets on a spinning wheel for the opportunity to win big in a modern version of a casino classic!",
    icon: "/roulette.png",
    url: "/roulette"
}

export const mines: Game = {
    title: "Mines",
    description: "Navigate a virtual minefield, carefully uncovering gems and avoiding mines to secure big winnings!",
    icon: "/mines.png",
    url: "/mines",
    comingSoon: false
};

export const blackjack: Game = {
    title: "Blackjack",
    description: "Aim to beat the dealer by getting as close to 21 without going over!",
    icon: "/blackjack.png",
    url: "/blackjack",
}

export const poker: Game = {
    title: "Poker",
    description: "Heads up texas holdem",
    icon: "/poker.png",
    url: "/poker",
    comingSoon: true
}

export const slots: Game = {
    title: "Slots",
    description: "Spin the wheel and win big!",
    icon: "/slots.png",
    url: "/slots",
    comingSoon: true
}

const games: Game[] = [
    dice,
    roulette,
    blackjack,
    mines,
    poker,
    slots
]

export default games