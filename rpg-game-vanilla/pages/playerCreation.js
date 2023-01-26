import { savePlayerStats } from '../modules/player.mjs'

const createBtn = document.getElementsByTagName('button')[0];
const form = document.getElementsByTagName('form')[0];
const footer = document.getElementsByTagName('footer')[0];

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