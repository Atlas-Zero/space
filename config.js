const customStarCount = 100
const customStarSpeed = 1.5
const customStarSize = 3
const customStarColor = 'ghostwhite'
const customBackgroundColor = '#040720'
const customLineColor = 'blue'
const customLineDistance = 100

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.starcount) {
            customStarCount = parseInt(properties.starcolor.value)
        }
        if (properties.starspeed) {
            customStarSpeed = parseFloat(properties.starspeed.value)
        }
        if (properties.starsize) {
            customStarSpeed = parseInt(properties.starsize.value)
        }
        if (properties.starcolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            starColor = properties.starcolor.value.split(' ');
            starColor = starColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            customStarColor = 'rgb(' + starColor + ')';
        }
        if (properties.backgroundcolor) {
            backgroundColor = properties.backgroundcolor.value.split(' ');
            backgroundColor = backgroundColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            customBackgroundColor = 'rgb(' + backgroundColor + ')';
        }
        if (properties.linecolor) {
            lineColor = properties.linecolor.value.split(' ');
            lineColor = lineColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            customBackgroundColor = 'rgb(' + lineColor + ')';
        }
        if (properties.linedistance) {
            customLineColor = parseInt(properties.linedistance.value)
        }
    },
};

export const config = {
    starCount: customStarCount,
    starSpeed: customStarSpeed,
    starSize: customStarSize,
    starColor: customStarColor,
    backgroundColor: customBackgroundColor,
    lineColor: customLineColor,
    lineDistance: customLineDistance
}