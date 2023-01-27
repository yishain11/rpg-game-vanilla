import { singleCombatRound, selectStarter } from '../../modules/combat.mjs';
import { savePlayerStats } from "../../modules/player.mjs";
import { saveMonsterStats } from "../../modules/monsters.mjs";
import { config } from "../../modules/config.mjs";

const player = JSON.parse(localStorage.getItem('player'));
console.log('player', player);
const monster = JSON.parse(localStorage.getItem('currentMonster'));

const statsContainer = document.getElementById('stats');
const playerImage = document.getElementById('playerImage');
const monsterImage = document.getElementById('monsterImage');

const attackBtn = document.getElementById('attack');
const runBtn = document.getElementById('run');
const potionBtn = document.getElementById('potion');


let currentAttacker;
let isCombat = true;

loadCombatPage();

function loadCombatPage() {
    initialStats();
    loadImages(player);
    loadImages(monster);
    setActionButtons();
    startCombat();
}

function startCombat() { }

function attack() {
    if (isCombat) {
        if (!currentAttacker) {
            currentAttacker = selectStarter();
        }
        statsContainer.innerText = `Current attacker: ${currentAttacker}`;

    }
}

function run() {
    window.location = '/pages/worldMap/worldMap.html';
}

function drinkPotion() {
    if (parseInt(player.potions < 1)) {
        potionBtn.disable = true;
    } else {
        player.potions -= 1;
        player.lfe += config.lifeReturnByPotion;
    }
}

function setActionButtons() {
    attackBtn.addEventListener('click', attack);
    runBtn.addEventListener('click', run);
    potionBtn.addEventListener('click', drinkPotion);
}

function loadImages(character) {
    const img = document.createElement('img');
    img.src = character.image;
    img.setAttribute('width', '80%');
    img.setAttribute('height', '80%');
    if ('xpReward' in character) {
        monsterImage.append(img);
        return;
    }
    playerImage.append(img);
}

function initialStats() {
    const active = [player, monster];
    active.forEach(el => {
        const container = document.createElement('div');
        container.setAttribute('id', el.name);
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        container.append(p1, p2, p3);
        p1.innerText = `Name: ${el.name}`;
        p2.innerText = `Life: ${el.life} `;
        p3.innerText = `${el.potions ? `Potions: ${el.potions}` : ''}`;
        statsContainer.append(container);
    });
}