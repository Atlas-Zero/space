import { inXBounds, inYBounds } from './utils.js'
import { configLabels } from './inputs.js'

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

function drawUI(size, offsetPercent, hidden, minimized, config) {
    // box{position}
    const box = {
        x: canvas.width - canvas.width * offsetPercent,
        y: canvas.height * offsetPercent,
        width: size,
    }

    ctx.beginPath()
    ctx.fillStyle = config.uiBackgroundColor

    if (!hidden) {
        if (minimized) {
            const menuWidth = box.x - box.width * 8
            const menuHeight = box.y + box.width * 8

            // background
            ctx.fillRect(menuWidth, box.y, box.width * 9, menuHeight - box.y)

            // foreground
            ctx.moveTo(menuWidth, box.y)

            // menu 
            ctx.lineTo(box.x + box.width, box.y)
            ctx.lineTo(box.x + box.width, menuHeight)
            ctx.lineTo(menuWidth, menuHeight)
            ctx.lineTo(menuWidth, box.y)

            for (let i = 0; i < 9; i++) {
                const label = configLabels[i]
                const input = document.getElementById(label)
                input.hidden = false
                input.style.left = menuWidth + size * 5 + "px";
                input.style.top = (box.y + box.width * i * 6 / 8 + size * 0.8 - 10) + "px";
                input.style.color = config.uiForegroundColor
                ctx.font = "22px Arial";
                ctx.fillStyle = config.uiForegroundColor
                ctx.fillText(`${label}: `, menuWidth + size, box.y + box.width * i * 6 / 8 + size);

                config[label] = input.value
            }
        } else {
            // refresh
            for (let i = 0; i < 9; i++) {
                const label = configLabels[i]
                const input = document.getElementById(label)
                input.hidden = true
            }

            // background
            ctx.fillRect(box.x, box.y, box.width, box.width)

            // foreground
            ctx.moveTo(box.x, box.y)

            // border
            ctx.lineTo(box.x + box.width, box.y)
            ctx.lineTo(box.x + box.width, box.y + box.width)
            ctx.lineTo(box.x, box.y + box.width)
            ctx.lineTo(box.x, box.y)

            // 3 inner lines
            for (let i = 0; i < 3; i++) {
                ctx.moveTo(box.x + box.width * 0.2, box.y + box.width * i / 5 + box.width * 0.3)
                ctx.lineTo(box.x + box.width * 0.8, box.y + box.width * i / 5 + box.width * 0.3)
            }
        }
    }

    ctx.strokeStyle = config.uiForegroundColor
    ctx.stroke()
    ctx.closePath()

    return box
}

export function drawCanvas(stars, UIhidden, UIminimized, config) {
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
        drawLine(stars, star.x, star.y, config.lineColor, config.lineDistance) // minimum distance
    })

    return drawUI(50, 0.1, UIhidden, UIminimized, config)
}