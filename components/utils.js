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

export function inBoxBounds(box, x, y) {
    let withinX = x > box.x && x < box.x + box.width
    let withinY = y > box.y && y < box.y + box.width

    return withinX && withinY
}

export function inExtendedBounds(box, x, y) {
    let withinX = x > box.x - box.width * 8 && x < box.x + box.width
    let withinY = y > box.y && y < box.y + box.width * 8

    return withinX && withinY
}