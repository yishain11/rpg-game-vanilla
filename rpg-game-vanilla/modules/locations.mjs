const descriptions = ['the dark', 'the scary', 'the wild', 'the amazing'];
const locationNames = ['Mim', 'Valo', 'Farkwad', 'Shandir'];
export function createLocations() {
    const locations = [];
    descriptions.forEach(desc => {
        const randIndex = Math.floor(Math.random() * locationNames.length);
        const name = `${desc} ${locationNames[randIndex]}`;
        locations.push(name);
        locationNames.splice(randIndex, 1);
    });
    return locations;
}