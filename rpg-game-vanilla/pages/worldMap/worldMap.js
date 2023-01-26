import { loadLocations } from "../../modules/locations.mjs";
const locations = loadLocations();
const locationBtnContainer = document.getElementById('buttons');

function genButtons() {
    locations.forEach(location => {
        const btn = document.createElement('button');
        btn.innerText = location;
        btn.style.fontSize = '4rem';
        locationBtnContainer.appendChild(btn);
    });

}

locationBtnContainer.addEventListener('click', (e) => {
    window.location = `/pages/locationContrats.html?location=${e.target.innerText}`;
});

genButtons();