import { updateWallpaperConfig } from './components/config.js'
import { inExtendedBounds, inBoxBounds } from './components/utils.js'
import { configLabels, initInputs } from './components/inputs.js'
import { drawCanvas } from './components/ui.js'
import { handleStars } from './components/star.js'

// frames
const FPS = 60
const TIMEOUT = 1000 / FPS

// config
let config = updateWallpaperConfig()
const inputs = initInputs(config)
inputs.forEach((input, idx) => {
    input.value = config[configLabels[idx]]
})

// stars
let stars = []
let prevSpeed = 1

// ui
let box = {}
let visible = false

function main() {
    config = updateWallpaperConfig()

    handleStars(stars, prevSpeed, config)
    box = drawCanvas(stars, visible, config)

    // update star speed if user changes value
    prevSpeed = config.starSpeed
}

main()
window.addEventListener('click', (ev) => {
    visible = (visible) ? inExtendedBounds(box, ev.x, ev.y) : inBoxBounds(box, ev.x, ev.y);
})

// main entry
setInterval(main, TIMEOUT)
