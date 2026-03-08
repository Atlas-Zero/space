const overlay = document.querySelector('#overlay')

export const configLabels = [
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


export function initInputs(config) {
    overlay.innerHTML = "";

    const inputs = [];

    for (let i = 0; i < 9; i++) {
        const input = document.createElement("input");
        input.dataset.index = i; // store which label it belongs to
        input.id = configLabels[i]
        input.style.position = "absolute";
        input.style.font = "22px Arial";
        input.style.background = "transparent";
        input.style.border = "1px solid" + config.uiBackgroundColor;
        input.style.width = "150px";

        // add input listener once
        input.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                const idx = parseInt(e.target.dataset.index);
                config[configLabels[idx]] = e.target.value;
            }
        });

        inputs.push(input);
        overlay.appendChild(input);
    }

    return inputs
}
