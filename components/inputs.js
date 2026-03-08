const overlay = document.querySelector('#overlay')

export const configLabels = [
    'starCount',
    'starSpeed',
    'starSize',
    'starColor',
    'backgroundColor',
    'uiForegroundColor',
    'uiBackgroundColor',
    'lineColor',
    'lineDistance',
]

export function initInputs(config) {
    overlay.innerHTML = '';

    const inputs = [];

    for (let i = 0; i < 9; i++) {
        const input = document.createElement('input');
        input.id = configLabels[i]
        input.style.position = 'absolute';
        input.style.font = '22px Arial';
        input.style.background = 'transparent';
        input.style.border = '1px solid' + config.uiBackgroundColor;
        input.style.width = '150px';

        inputs.push(input);
        overlay.appendChild(input);
    }

    return inputs
}
