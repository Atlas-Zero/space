let defaultStarCount = 50;
let defaultStarSpeed = 1.5;
let defaultStarSize = 3;
let defaultStarColor = 'ghostwhite';
let defaultBackgroundColor = '#040720';
let defaultLineColor = 'blue';
let defaultLineDistance = 250;

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.starcount) {
            defaultStarCount = Math.abs(parseInt(properties.starcount.value));
        }

        if (properties.starspeed) {
            defaultStarSpeed = Math.abs(parseFloat(properties.starspeed.value));
        }

        if (properties.starsize) {
            defaultStarSize = Math.abs(parseInt(properties.starsize.value));
        }

        if (properties.starcolor) {
            const c = properties.starcolor.value.split(' ').map(v => Math.round(v * 255));
            defaultStarColor = `rgb(${c.join(',')})`;
        }

        if (properties.backgroundcolor) {
            const c = properties.backgroundcolor.value.split(' ').map(v => Math.round(v * 255));
            defaultBackgroundColor = `rgb(${c.join(',')})`;
        }

        if (properties.linecolor) {
            const c = properties.linecolor.value.split(' ').map(v => Math.round(v * 255));
            defaultLineColor = `rgb(${c.join(',')})`;
        }

        if (properties.linedistance) {
            defaultLineDistance = Math.abs(parseInt(properties.linedistance.value));
        }

        const config = updateWallpaperConfig();
    }
};

export function updateWallpaperConfig() {
    return {
        starCount: defaultStarCount,
        starSpeed: defaultStarSpeed,
        starSize: defaultStarSize,
        starColor: defaultStarColor,
        backgroundColor: defaultBackgroundColor,
        lineColor: defaultLineColor,
        lineDistance: defaultLineDistance
    };
}
