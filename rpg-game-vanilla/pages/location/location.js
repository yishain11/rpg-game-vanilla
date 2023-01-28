import { loadContracts } from '../../modules/contracts.mjs';
import { genHeader } from "../../components/header.mjs";

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const locationName = searchParams.get('location');
const h1 = document.getElementsByTagName("h1")[0];
const title = document.getElementsByTagName('title')[0];
const main = document.getElementsByTagName('main')[0];
const header = document.getElementsByTagName('header')[0];
const actions = document.getElementById('actions');

localStorage.setItem('currentLocation', locationName)

updateTitles();
header.append(genHeader());

let contracts = contractsHandler();
setActions();
function createContractCard(contract) {
    console.log('contract', contract)
    const card = genCard(contract);
    const [title, subTitle] = genTitles(contract);
    const img = styleImg();
    const [p1, p2, p3, p4] = styleP(contract);
    card.append(title, subTitle, img, p1, p2, p3, p4);
    main.append(card);
}

function styleImg() {
    const img = document.createElement('img');
    img.src = '/assets/monsters/monster1.jpg';
    img.setAttribute('width', '90%');
    img.setAttribute('height', '90%');
    return img;
}

function styleP(contract) {
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    p1.innerText = `Gold Reward: ${contract.gold}`;
    p2.innerText = `XP Reward: ${contract.monster.xpReward}`;
    p3.innerText = `Monster Level: ${contract.level}`;
    p4.innerText = `Monster Life: ${contract.monster.life}`;
    return [p1, p2, p3, p4];
}

function genTitles(contract) {
    const title = document.createElement('h1');
    title.innerText = 'wanted! preferably dead';
    const subTitle = document.createElement('h3');
    subTitle.innerText = contract.monster.name;
    return [title, subTitle];
}

function genCard(contract) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
        localStorage.setItem('currentMonster', JSON.stringify(contract.monster));
        window.location = '/pages/combat/combat.html';
    });
    return card;
}

function updateTitles() {
    h1.innerText = locationName;
    title.innerText = locationName;
}

function sortContractsHandler(type = "level", contracts) {
    switch (type) {
        case 'gold':
            contracts = sortContracts(contracts, 'gold');
            return contracts;
        case 'xp':
            contracts = sortContracts(contracts, 'xp');
            return contracts;
        default:
            contracts = sortContracts(contracts, 'level');
            return contracts;
    }
}

function genContractCards(contracts) {
    main.innerHTML = '';
    contracts.contracts.forEach(contract => {
        createContractCard(contract);
    });
}

function sortContracts(contracts, field) {
    contracts.contracts.sort((a, b) => {
        return parseInt(b[field]) - a[field];
    });
    return contracts;
}

function contractsHandler() {
    let contracts = loadContracts(locationName);
    contracts = sortContractsHandler("level", contracts);
    genContractCards(contracts);
    return contracts;
}

function setActions() {
    actions.addEventListener('click', function (e) {
        const txt = e.target.innerText.split(' ');
        const type = txt[txt.length - 1];
        contracts = sortContractsHandler(type, contracts);
        genContractCards(contracts);
    });
}