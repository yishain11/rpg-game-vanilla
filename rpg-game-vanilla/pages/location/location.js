import { loadContracts } from '../../modules/contracts.mjs';
import { genHeader } from "../../components/header.mjs";

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const locationName = searchParams.get('location');
const title = document.getElementsByTagName('title')[0];
title.innerText = locationName;
const main = document.getElementsByTagName('main')[0];
const header = document.getElementsByTagName('header')[0
];
const contracts = loadContracts(locationName);

header.append(genHeader());

contracts.contracts.forEach(contract => {
    createContractCard(contract);
});

function createContractCard(contract) {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h1');
    title.innerText = 'wanted! preferably dead';
    const subTitle = document.createElement('h3');
    subTitle.innerText = contract.monster.name;
    const img = document.createElement('img');
    img.src = '/assets/monsters/monster1.jpg';
    img.setAttribute('width', '90%');
    img.setAttribute('height', '90%');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p1.innerText = `Gold Reward: ${contract.gold}`;
    p2.innerText = `XP Reward: ${contract.xp}`;
    card.append(title, subTitle, img, p1, p2);
    main.append(card);
}