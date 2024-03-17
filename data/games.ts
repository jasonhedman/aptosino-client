import {Game} from "@/types/Game";

export const dice: Game = {
    title: "Dice",
    description: "Pick a number between 1 and 100. If a number is rolled that is less than or equal to your pick, you win!",
    url: "/dice",
    icon: "/dice.png",
}

export const roulette: Game = {
    title: "Roulette",
    description: "Pick combinations of numbers between 1 and 36. If the ball lands on one of your numbers, you win!",
    icon: "/roulette.png",
    url: "/roulette"
}

export const mines: Game = {
    title: "Mines",
    description: "Create a 5x5 board by choosing a number of mines. With each gem you find, your payout increases. You can cash out after picking at least one gem, but if you hit a mine, the game is over!",
    icon: "/mines.png",
    url: "/roulette",
    comingSoon: true
};

export const blackjack: Game = {
    title: "Blackjack",
    description: "Hit until you reach 21.",
    icon: "/blackjack.png",
    url: "/blackjack",
    comingSoon: true
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
    mines,
    blackjack,
    poker,
    slots
]

export default games