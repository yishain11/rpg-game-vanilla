import { createLocations, saveLocations } from "./modules/locations.mjs";
import { genContracts, saveContracts } from "./modules/contracts.mjs";
import { genHeader } from "./components/header.mjs";

const btn = document.getElementById('btn');
const status = document.getElementById('status');
const headerContainer = document.getElementById('header');
headerContainer.append(genHeader());

btn.addEventListener('click', startGame);


function startGame() {
    updateStatus('starting game...');
    updateStatus('creating locations...');
    const locations = createLocations();
    console.log('locations', locations)
    saveLocations(locations);
    updateStatus('generating monsters...');
    const contracts = genContracts(locations);
    updateStatus('generating contracts...');
    saveContracts(contracts);
    updateStatus('loading create character...', true);
    setTimeout(() => {
        window.location = '/pages/playerCreation/playerCreation.html';
    }, 2500);
}

function updateStatus(msg, clear) {
    if (clear) {
        status.innerText = '';
        status.innerText = msg;
    } else {
        status.innerText += `\n${msg}`;
    }
}


