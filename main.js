import { updateWallpaperConfig } from './components/config.js'
import { drawCanvas } from './components/ui.js'
import { handleStars } from './components/star.js'

let stars = []
let prevSpeed = 1

function main() {
    const config = updateWallpaperConfig()

    handleStars(stars, prevSpeed, config)
    drawCanvas(stars, config)

    // update star speed if user changes value
    prevSpeed = config.starSpeed
}

main()
setInterval(main, 16)
