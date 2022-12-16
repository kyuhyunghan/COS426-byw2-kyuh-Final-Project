// copied from https://stackoverflow.com/questions/18921134/math-random-numbers-between-50-and-80
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function chooseXCoord(i) {
    if (i % 3 == 1) return 2.8
    if (i % 3 == 2) return 0
    if (i % 3 == 0) return -2.8
}

export function chooseInitialZ(i) {
    if (i <= 3) return getRandomInt(100, 200)
    if (i <= 6) return getRandomInt(150, 250)
    if (i <= 9) return getRandomInt(200, 300)
    if (i <= 12) return getRandomInt(250, 350)
    if (i <= 15) return getRandomInt(300, 400)
    if (i <= 18) return getRandomInt(350, 450)
}