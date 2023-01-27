import { createLocations, saveLocations } from "./modules/locations.mjs";
import { genContracts, saveContracts } from "./modules/contracts.mjs";
import { genHeader } from "./components/header.mjs";

const btn = document.getElementById('btn');
const status = document.getElementById('status');
const headerContainer = document.getElementById('header');
headerContainer.append(genHeader());

btn.addEventListener('click', startGame);


function startGame() {
    const locations = createLocations();
    saveLocations(locations);
    const contracts = genContracts(locations);
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


