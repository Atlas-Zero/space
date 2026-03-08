import { updateWallpaperConfig } from './components/config.js'
import { inBoxBounds } from './components/utils.js'
import { drawCanvas } from './components/ui.js'
import { handleStars } from './components/star.js'

// frames
const FPS = 60
const TIMEOUT = 1000 / FPS

// stars
let stars = []
let prevSpeed = 1

// ui
let box = {}
let clickedUI = false

function main() {
    const config = updateWallpaperConfig()

    handleStars(stars, prevSpeed, config)
    box = drawCanvas(stars, clickedUI, config)

    // update star speed if user changes value
    prevSpeed = config.starSpeed
}

main()
window.addEventListener('click', (ev) => clickedUI = inBoxBounds(box, ev.x, ev.y))

// main entry
setInterval(main, TIMEOUT)
