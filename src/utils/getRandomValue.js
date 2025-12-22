export const getRandomValue = (min=10, max=100, toString=false) => {
    const value = Math.random() * (max - min + 1) + min;
    return !!toString ? value.toString() : value
}