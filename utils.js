export function randVel() {
    if (Math.random() >= 0.5) {
        return Math.random()
    } else {
        return Math.random() * (-1)
    }
}

export function inXBounds(x) {
    if (x < window.innerWidth && x > 0) return true 
}

export function inYBounds(y) {
    if (y < window.innerHeight && y > 0) return true 
}
