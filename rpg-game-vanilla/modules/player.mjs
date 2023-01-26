export function updatePlayerStats(newStats) {
    let currentPlayer = JSON.parse(localStorage.getItem('player'));
    currentPlayer = { ...currentPlayer, ...newStats };
    localStorage.setItem(currentPlayer);
}

export function savePlayerStats(player) {
    localStorage.setItem('player', JSON.stringify(player));
}