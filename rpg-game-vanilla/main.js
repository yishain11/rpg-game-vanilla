import { createLocations } from "./modules/locations.mjs";


const btn = document.getElementById('btn');
const status = document.getElementById('status');

btn.addEventListener('click', startGame);


function startGame() {
    const locations = createLocations();
    console.log('locations', locations);
}


