import confetti from "canvas-confetti";

export const makeConfetti = (x: number, y: number) => {
    confetti({
        particleCount: 150,
        colors: ['#edce65'],
        startVelocity: 30,
        spread: 360,
        origin: { x, y },
        zIndex: 1000
    });
}