function fibonacci(numberOfDigits: number, startBy = 1): number[] {
    let suite = [0, startBy];
    while (suite.length < numberOfDigits) {
        let startIndex = suite.length - 2;
        suite.push(suite[startIndex] + suite[startIndex + 1])
    }
    return suite;
}
let fibo = fibonacci(10);
fibo.splice(1, 1);
const breakpoints = [480, 768, 1024, 1200].map(bp => bp + "px");
const mediaQueries = breakpoints.map(breakpoint => `@media screen and (min-width: ${breakpoint})`)
const space = [
    0,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512
];
const fontSizes = [
    0,
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    96
];
const radii = fibo;
const borderWidths = fibo;
const sizes = fibo;
const fontWeights = {
    "normal": 400,
    "semi-bold": 600,
    "bold": 900,
}
const lineHeights = fibo.map(n => (n > 0 ? (n / 2).toFixed(1) : n) + "px")

export {
    breakpoints,
    mediaQueries,
    fontSizes,
    space,
    radii,
    lineHeights,
    borderWidths,
    fontWeights,
    sizes,
}