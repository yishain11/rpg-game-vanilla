import { genHeader } from '../../components/header.mjs';
import { loadLocations } from "../../modules/locations.mjs";
const locations = loadLocations();
const locationBtnContainer = document.getElementById('buttons');
const headerContainer = document.getElementById('container');
headerContainer.append(genHeader())

function genButtons() {
    locations.forEach(location => {
        const btn = document.createElement('button');
        btn.innerText = location;
        btn.style.fontSize = '4rem';
        locationBtnContainer.appendChild(btn);
    });

}

locationBtnContainer.addEventListener('click', (e) => {
    window.location = `/pages/location/location.html?location=${e.target.innerText}`;
});

genButtons();