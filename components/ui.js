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

function drawUI(size, offsetPercent, clickedUI, config) {

    const box = {
        x: canvas.width - canvas.width * offsetPercent,
        y: canvas.height * offsetPercent,
        width: size,
    }

    if (clickedUI) {

        const menuWidth = box.x - box.width * 8
        const menuHeight = box.y + box.width * 8

        // background
        ctx.fillStyle = config.uiBackgroundColor
        ctx.fillRect(menuWidth, box.y, box.width * 9, menuHeight - box.y)

        // foreground
        ctx.beginPath()
        ctx.moveTo(menuWidth, box.y)

        // menu 
        ctx.lineTo(box.x + box.width, box.y)
        ctx.lineTo(box.x + box.width, menuHeight)
        ctx.lineTo(menuWidth, menuHeight)
        ctx.lineTo(menuWidth, box.y)

        ctx.fillStyle = config.uiForegroundColor

        const configLables = [
            "starCount",
            "starSpeed",
            "starSize",
            "starColor",
            "backgroundColor",
            "uiForegroundColor",
            "uiBackgroundColor",
            "lineColor",
            "lineDistance",
        ]

        let starCount = document.createElement('input')
        let starSpeed = document.createElement('input')
        let starSize = document.createElement('input')
        let starColor = document.createElement('input')
        let backgroundColor = document.createElement('input')
        let uiForegroundColor = document.createElement('input')
        let uiBackgroundColor = document.createElement('input')
        let lineColor = document.createElement('input')
        let lineDistance = document.createElement('input')


        for (let i = 0; i < 9; i++) {
            const lable = configLables[i]
            ctx.font = "22px Arial"
            ctx.fillText(`${lable}: ${config[lable]}`, menuWidth + size, box.y + box.width * i * 5 / 8 + size)

        }

        ctx.strokeStyle = 'green'
        ctx.stroke()
        ctx.closePath()

    } else {

        // background
        ctx.fillStyle = config.backgroundColor
        ctx.fillRect(box.x, box.y, box.width, box.width)

        // foreground
        ctx.beginPath()
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

        ctx.strokeStyle = config.foregroundColor
        ctx.stroke()
        ctx.closePath()

    }
    return box
}

export function drawCanvas(stars, clickedUI, config) {
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

    return drawUI(50, 0.1, clickedUI, config)
}