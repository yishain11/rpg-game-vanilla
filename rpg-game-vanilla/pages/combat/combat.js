import { singleCombatRound, selectStarter } from '../../modules/combat.mjs';
import { savePlayerStats } from "../../modules/player.mjs";
import { saveMonsterStats } from "../../modules/monsters.mjs";
import { getContracts, removeMonsterFromContract, saveContracts } from "../../modules/contracts.mjs";
import { config } from "../../modules/config.mjs";

let player = JSON.parse(localStorage.getItem('player'));
let monster = JSON.parse(localStorage.getItem('currentMonster'));
const statusContainer = document.getElementById('status');
const statsContainer = document.getElementById('stats');
const playerImage = document.getElementById('playerImage');
const monsterImage = document.getElementById('monsterImage');

const attackBtn = document.getElementById('attack');
const runBtn = document.getElementById('run');
const potionBtn = document.getElementById('potion');

let contracts = getContracts();
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

function startCombat() {
    currentAttacker = selectStarter(player.dexterity, monster.dexterity);
    statusContainer.innerText = `Current attacker: ${currentAttacker}`;
    if (currentAttacker === "monster") {
        monsterAttack();
    }
}

function attack() {
    if (isCombat) {
        playerAttack();
        monsterAttack();
    }
}

function playerAttack() {
    console.log('player is attacking');
    [player, monster] = singleCombatRound(player, monster);
    if (monster.life <= 0) {
        isCombat = false;
        statusContainer.innerText = 'Player Won!';
        statusContainer.style.color = 'darkblue';
        statusContainer.style.textDecoration = 'underline';
        player.xp += monster.xpReward;
        player.gold += monster.goldReward;
        monster.isAlive = false;
        // remove monster from contracts
        const currentLocation = localStorage.getItem('currentLocation');
        contracts = removeMonsterFromContract(contracts, currentLocation, monster.name);
        saveContracts(contracts);
        console.log('back to location');
        isCombat = false;
        setTimeout(() => {
            window.location = `/pages/location/location.html?location=${currentLocation}`;
        }, 4000);
    } else {
        // change monster life in UI
        const monsterLife = document.getElementById('monsterLife');
        monsterLife.innerText = `Life: ${monster.life}`;
    }
}

function monsterAttack() {
    console.log('monster is attacking');
    currentAttacker = 'monster';
    statusContainer.innerText = `Current attacker: ${currentAttacker}`;
    [monster, player] = singleCombatRound(monster, player);
    if (player.life <= 0) {
        console.log('player is dead');
        isCombat = false;
        statusContainer.innerText = 'Player is dead';
        statusContainer.style.color = 'darkblue';
        statusContainer.style.textDecoration = 'underline';
        setTimeout(() => {
            window.location = '/';
        }, 4000);
    } else {
        // change players life in UI
        const playerLife = document.getElementById('playerLife');
        playerLife.innerText = `Life: ${player.life}`;
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
        p1.innerText = `Name: ${el.name}`;
        p2.innerText = `Life: ${el.life} `;
        if ('xpReward' in el) {
            p2.setAttribute('id', 'monsterLife');
        } else {
            p2.setAttribute('id', 'playerLife');
        }
        p3.innerText = `${el.potions ? `Potions: ${el.potions}` : ''}`;
        container.append(p1, p2, p3);
        statsContainer.append(container);
    });
}