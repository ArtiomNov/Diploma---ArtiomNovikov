export function getRandomInt(from: number, to: number): number {
    return Math.round(Math.random() * (to - from + 1)) + to;
}