const player = JSON.parse(localStorage.getItem('player'));
const monster = JSON.parse(localStorage.getItem('currentMonster'));

const statsContainer = document.getElementById('stats');
const playerImage = document.getElementById('playerImage');
const monsterImage = document.getElementById('monsterImage');

startCombat();

function startCombat() {
    initialStats();
    loadImages(player);
    loadImages(monster);
}



function loadImages(character) {
    console.log('character', character);
    const img = document.createElement('img');
    console.log('character.images', character.images);
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