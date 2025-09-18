import { config } from './config.js'
import { Star } from './star.js'
import { randVel, inXBounds, inYBounds } from './utils.js'

const canvas = document.querySelector('#space')
const ctx = canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

function refreshCanvas() {
    ctx.fillStyle = config.backgroundColor
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawStar(x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 180)
    ctx.fillStyle = config.starColor
    ctx.fill()
    ctx.closePath()
}

function drawLine(stars, origX, origY, dist) {
    stars.forEach(star => {
        if (
            Math.abs(origX - star.x) < dist &&
            Math.abs(origY - star.y) < dist
        ) {
            ctx.beginPath()
            ctx.moveTo(origX, origY)
            ctx.lineTo(star.x, star.y)
            ctx.strokeStyle = config.lineColor
            ctx.stroke()
            ctx.closePath()
        }
    })
}

function drawCanvas(stars, starSize, distance) {
    stars.forEach(star => {
        star.x += star.vx
        star.y += star.vy
        if (!inXBounds(star.x)) {
            star.vx *= (-1)
        }
        if (!inYBounds(star.y)) {
            star.vy *= (-1)
        }
        
        drawStar(star.x, star.y, starSize) // 3rd param: star size
        drawLine(stars, star.x, star.y, distance) // 3rd param: minimum distance

    })

}

const stars = []
function main() {
    refreshCanvas()
                        // amount
    while (stars.length < config.starCount) {
        const randX = Math.random() * window.innerWidth
        const randY = Math.random() * window.innerHeight
        const randVelX = randVel() * config.starSpeed // speed
        const randVelY = randVel() * config.starSpeed
        const star = new Star(randX, randY, randVelX, randVelY)
        stars.push(star)
    }   
            // array, size, distance 
    drawCanvas(stars, config.starSize, config.lineDistance)
}

main()
setInterval(main, 16)
