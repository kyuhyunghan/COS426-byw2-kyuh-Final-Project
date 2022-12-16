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
    if (i <= 3) return this.getRandomInt(100, 200)
    if (i <= 6) return this.getRandomInt(150, 250)
    if (i <= 9) return this.getRandomInt(200, 300)
    if (i <= 12) return this.getRandomInt(250, 350)
    if (i <= 15) return this.getRandomInt(300, 400)
    if (i <= 18) return this.getRandomInt(350, 450)
}