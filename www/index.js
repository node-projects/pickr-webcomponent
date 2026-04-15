import '../lib/index.js';

const pickrContainer = document.querySelector('.pickr-container');
const themeContainer = document.querySelector('.theme-container');

const swatches = [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
];

const themes = [
    ['classic', 'pickr-classic', {
        swatches,
        components: {
            preview: true, opacity: true, hue: true,
            interaction: { hex: true, rgba: true, hsva: true, input: true, clear: true, save: true }
        }
    }],
    ['monolith', 'pickr-monolith', {
        swatches: swatches.slice(0, 7),
        defaultRepresentation: 'HEXA',
        components: {
            preview: true, opacity: true, hue: true,
            interaction: { input: true, clear: true, save: true }
        }
    }],
    ['nano', 'pickr-nano', {
        swatches: swatches.slice(0, 7),
        defaultRepresentation: 'HEXA',
        components: {
            preview: true, opacity: true, hue: true,
            interaction: { input: true, clear: true, save: true }
        }
    }]
];

const buttons = [];
/**
 * @type {Pickr}
 */
let current = null;

for (const [label, tag, config] of themes) {
    const button = document.createElement('button');
    button.textContent = label;
    buttons.push(button);

    button.addEventListener('click', () => {
        if (current) current.remove();

        for (const btn of buttons) {
            btn.classList.toggle('active', btn === button);
        }

        current = document.createElement(tag);
        current.config = { ...config, default: '' };
        pickrContainer.appendChild(current);

        for (const name of ['init', 'change', 'changestop', 'save', 'clear', 'cancel', 'swatchselect']) {
            current.addEventListener(name, e => {
                console.log(`Event: "${name}"`, e.detail);
            });
        }
    });

    themeContainer.appendChild(button);
}

buttons[0].click();
