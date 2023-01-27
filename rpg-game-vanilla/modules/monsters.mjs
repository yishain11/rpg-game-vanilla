const colors = ['black', 'green', 'yellow', 'red', 'blue', 'gold', 'silver', 'purple', 'pink'];
const elements = ['fire', 'water', 'electric', 'magma', 'acid', 'mountain'];
const monsters = ['dragon', 'vampire', 'goblin', 'hobgoblin', 'giant', 'syren', 'kraken', 'shark', 'blob', 'slime', 'tiger', 'bear'];
const images = ['/assets/monsters/monster1.jpg'];
export function createMonster() {
    const monster = {
        name: genName(),
        defense: randNum(1, 10),
        strength: randNum(1, 10),
        defense: randNum(1, 10),
        life: randNum(50, 100),
        dexterity: randNum(1, 10),
        xpReward: randNum(100, 800),
        goldReward: randNum(10, 50),
        level: randNum(1, 4),
        image: genImage(),
        isAlive: true
    };
    return monster;
}

function randNum(min, max) {
    return Math.floor(Math.random() * max + min);
}

function genImage() {
    return images[randNum(0, images.length - 1)];
}

function genName() {
    let desc = '';
    if (Math.random() < .5) {
        desc = getRandValue(colors);
    } else {
        desc = getRandValue(elements);
    }
    const monster = getRandValue(monsters);
    return `the ${desc} ${monster}`;
}

function getRandValue(arr) {
    const index = Math.floor(Math.random() * (arr.length - 1));
    const res = arr[index];
    return res;
}

export function saveMonsterStats(monster) {
    localStorage.setItem('currentMonster', JSON.stringify(monster));
}