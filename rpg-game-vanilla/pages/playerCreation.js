import { savePlayerStats } from '../modules/player.mjs'
import setImage from '../modules/playerImages.mjs'

const images = ['fighter1.png', 'archer1.png', 'fighter2.png', 'wizard1.png'];
let currentImageIndex = 0;
const img = document.getElementsByTagName('img')[0];
const createBtn = document.getElementsByTagName('button')[0];
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const form = document.getElementsByTagName('form')[0];
const footer = document.getElementsByTagName('footer')[0];
const btns = document.getElementById('btns');

updateBtnsState();
updateImage(currentImageIndex);

function updateImage(index) {
    img.src = `/assets/${images[index]}`;
}

function getPlayerValues() {
    const playerStats = {};
    const inputs = document.getElementsByTagName('input');
    for (const input in inputs) {
        if (Object.hasOwnProperty.call(inputs, input)) {
            const inp = inputs[input];
            if (inp.type === "number" && inp.value > 10) {
                inp.value = 10;
            }
            playerStats[inp.name] = inp.value
        }
    }
    playerStats.life = 100;
    playerStats.gold = 0;
    playerStats.potions = 1;
    playerStats.level = 1;
    playerStats.xp = 0;
    savePlayerStats(playerStats);
    footer.innerText = 'Player created';
}


createBtn.addEventListener('click', () => {
    getPlayerValues(form);
});

function updateBtnsState() {
    switch (currentImageIndex) {
        case 0:
            leftBtn.disabled = true;
            break;
        case images.length - 1:
            rightBtn.disabled = true;
            break;

        default:
            leftBtn.disabled = false;
            rightBtn.disabled = false;

            break;
    }
}

btns.addEventListener('click', (e) => {
    if (e.target.innerText === "right") {
        currentImageIndex += 1;
    } else {
        currentImageIndex -= 1;
    }
    updateImage(currentImageIndex);
    updateBtnsState();
});