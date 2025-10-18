import { updateWallpaperConfig } from './config.js'
import { Star } from './star.js'
import { randVel, inXBounds, inYBounds } from './utils.js'

const canvas = document.querySelector('#space')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function refreshCanvas(backgroundColor) {
    ctx.fillStyle = backgroundColor
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawStar(x, y, color, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 180)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

function drawLine(stars, origX, origY, color, dist) {
    stars.forEach(star => {
        if (
            Math.abs(origX - star.x) < dist &&
            Math.abs(origY - star.y) < dist
        ) {
            ctx.beginPath()
            ctx.moveTo(origX, origY)
            ctx.lineTo(star.x, star.y)
            ctx.strokeStyle = color
            ctx.stroke()
            ctx.closePath()
        }
    })
}

function drawCanvas(stars, starColor, starSize, lineColor, lineDistance) {
    stars.forEach(star => {
        star.x += star.vx
        star.y += star.vy
        if (!inXBounds(star.x)) {
            star.vx *= (-1)
        }
        if (!inYBounds(star.y)) {
            star.vy *= (-1)
        }

        drawStar(star.x, star.y, starColor, starSize)
        drawLine(stars, star.x, star.y, lineColor, lineDistance) // minimum distance

    })

}

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
    drawCanvas(stars, config.starColor, config.starSize, config.lineColor, config.lineDistance)

    // update star speed if user changes value
    prevSpeed = config.starSpeed
}

main()
setInterval(main, 16)
