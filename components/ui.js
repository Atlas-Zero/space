import { inXBounds, inYBounds } from './utils.js'

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

function drawBox(size, offsetPercent, foregroundColor, backgroundColor) {

    const box = {
        x: canvas.width - canvas.width * offsetPercent,
        y: canvas.height * offsetPercent
    }

    // background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(box.x, box.y, size, size)

    // border
    ctx.beginPath()
    ctx.moveTo(box.x, box.y)

    ctx.lineTo(box.x + size, box.y)
    ctx.lineTo(box.x + size, box.y + size)
    ctx.lineTo(box.x, box.y + size)
    ctx.lineTo(box.x, box.y)

    ctx.strokeStyle = foregroundColor
    ctx.stroke()
    ctx.closePath()
}

export function drawCanvas(stars, config) {
    refreshCanvas(config.backgroundColor)

    stars.forEach(star => {
        // collision
        star.x += star.vx
        star.y += star.vy
        if (!inXBounds(star.x)) {
            star.vx *= (-1)
        }
        if (!inYBounds(star.y)) {
            star.vy *= (-1)
        }

        // draw
        drawStar(star.x, star.y, config.starColor, config.starSize)
        drawLine(stars, star.x, star.y, config.lineColor, config.lineDistance) // minimum distance#
    })

    // ui
    drawBox(50, 0.1, config.uiForegroundColor, config.uiBackgroundColor)
}