export function randomNum(min: number, max: number) {
    const range = Math.abs(min - max + 1);
    const startNumber = Math.min(min, max);

    return Math.floor(Math.random() * range + startNumber);
}

export function getRandomItem<Item = any>(values: Item[]): Item {
    if(values.length === 0) return undefined;
    if(values.length === 1) return values[0];

    return values[randomNum(0, values.length - 1)];
}

export type OperAB = "+" | "-";
export type OperXY = "×" | "÷";

export type Oper = OperAB | OperXY;