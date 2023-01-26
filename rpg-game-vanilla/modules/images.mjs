export const images = ['fighter1.png', 'archer1.png', 'fighter2.png', 'wizard1.png'];
export function getImagePlayer(index) {
    return `/assets/player/${images[index]}`;
}