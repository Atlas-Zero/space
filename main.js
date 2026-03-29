import { updateWallpaperConfig, configLabels } from './components/config.js'
import { inExtendedBounds, inBoxBounds } from './components/utils.js'
import { initUIinputs, initURLinputs } from './components/inputs.js'
import { drawCanvas } from './components/ui.js'
import { handleStars } from './components/star.js'


// frames
const FPS = 60
const TIMEOUT = 1000 / FPS

// config
let config = updateWallpaperConfig()
const URLinputs = initURLinputs(config)
const UIinputs = initUIinputs(config)
UIinputs.forEach((input, idx) => {
    input.value = config[configLabels[idx]]
})

// stars
let stars = []

// ui
let box = {}
let UIhidden = URLinputs.has("hidden") || URLinputs.has("uihidden")
let UIminimized = false

function main() {
    handleStars(stars, config)
    box = drawCanvas(stars, UIhidden, UIminimized, config)

    UIinputs.forEach((input, idx) => {
        config[configLabels[idx]] = input.value
    })
}

main()
document.addEventListener('click', (ev) => {
    UIminimized = (UIminimized) ? inExtendedBounds(box, ev.x, ev.y) : inBoxBounds(box, ev.x, ev.y);
})

// main entry
setInterval(main, TIMEOUT)
