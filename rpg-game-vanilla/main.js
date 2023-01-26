import { createLocations, saveLocations } from "./modules/locations.mjs";
import { genContracts, saveContracts } from "./modules/contracts.mjs";

const btn = document.getElementById('btn');
const status = document.getElementById('status');

btn.addEventListener('click', startGame);


function startGame() {
    updateStatus('starting game...');
    updateStatus('creating locations...');
    const locations = createLocations();
    saveLocations(locations);
    updateStatus('generating monsters...');
    const contracts = genContracts(locations);
    updateStatus('generating contracts...');
    saveContracts(contracts);
    setTimeout(() => {
        // window.location = '/pages/playerCreation.html';
    }, 2500);
}

function updateStatus(msg) {
    status.innerText += `\n${msg}`;
}


