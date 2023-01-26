import { createLocations, saveLocations } from "./modules/locations.mjs";


const btn = document.getElementById('btn');
const status = document.getElementById('status');

btn.addEventListener('click', startGame);


function startGame() {
    updateStatus('');
    updateStatus('starting game...');
    updateStatus('creating locations...');
    const locations = createLocations();
    console.log('locations', locations);
    saveLocations(locations);
    updateStatus('generating monsters...');
    // window.location = '/pages/playerCreation.html';
}

function updateStatus(msg) {
    status.innerText = msg;
}


