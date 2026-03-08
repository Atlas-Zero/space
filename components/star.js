import { randVel } from './utils.js'

class Star {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
}

function createStars(stars, speed) {
    const randX = Math.random() * window.innerWidth
    const randY = Math.random() * window.innerHeight
    const randVelX = randVel() * speed
    const randVelY = randVel() * speed
    const star = new Star(randX, randY, randVelX, randVelY)
    stars.push(star)
}

function deleteStars(stars) {
    stars.pop()
}

export function handleStars(stars, config) {
    while (stars.length < config.starCount) {
        createStars(stars, config.starSpeed)
    }

    while (stars.length > config.starCount) {
        deleteStars(stars)
    }
}