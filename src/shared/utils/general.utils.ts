export function thousandSeperator(input: number) {
    const initial = input.toFixed(2);
    const toNumber = Number(initial).toLocaleString(undefined, {minimumFractionDigits: 2});
    return toNumber;
}