const canvas = document.querySelector('#space')
const ctx = canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

class Star {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
}

function randVel() {
    if (Math.random() >= 0.5) {
        return Math.random()
    } else {
        return Math.random() * (-1)
    }
}

function inXBounds(x) {
    if (x < window.innerWidth && x > 0) return true 
}

function inYBounds(y) {
    if (y < window.innerHeight && y > 0) return true 
}

function refreshCanvas() {
    ctx.fillStyle = "#040720"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawStar(x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 180)
    ctx.fillStyle = "ghostwhite"
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
            ctx.strokeStyle = "blue"
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
    while (stars.length < 50) {
        const randX = Math.random() * window.innerWidth
        const randY = Math.random() * window.innerHeight
        const randVelX = randVel() * 1.5 // speed
        const randVelY = randVel() * 1.5
        const star = new Star(randX, randY, randVelX, randVelY)
        stars.push(star)
    }   
            // array, size, distance 
    drawCanvas(stars, 3, 200)
}

main()
setInterval(main, 16)
