import { updateWallpaperConfig } from './components/config.js'
import { refreshCanvas, drawCanvas } from './components/ui.js'
import { Star } from './components/star.js'
import { randVel } from './components/utils.js'

let stars = []
let prevSpeed = 1

function main() {

    // load config
    const config = updateWallpaperConfig()
    refreshCanvas(config.backgroundColor)

    // reset stars if speed changes
    if (prevSpeed != config.starSpeed) {
        stars = []
    }

    // create stars
    while (stars.length < config.starCount) {
        const randX = Math.random() * window.innerWidth
        const randY = Math.random() * window.innerHeight
        const randVelX = randVel() * config.starSpeed
        const randVelY = randVel() * config.starSpeed
        const star = new Star(randX, randY, randVelX, randVelY)
        stars.push(star)
    }

    // reduce stars if user changes value
    while (stars.length > config.starCount) {
        stars.pop()
    }

    // redraw
    drawCanvas(stars, config)

    // update star speed if user changes value
    prevSpeed = config.starSpeed
}

main()
setInterval(main, 16)
