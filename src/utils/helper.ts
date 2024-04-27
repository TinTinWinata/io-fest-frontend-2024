export function replaceAllSymbol(
    text: string,
    symbol: string,
    replaceValue: string
) {
    let result = text.replaceAll(symbol, replaceValue);

    return result;
}
