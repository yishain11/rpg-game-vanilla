export function updatePlayerStats(newStats) {
    const currentPlayer = localStorage.getItem('player');
    for (const stat in newStats) {
        if (Object.hasOwnProperty.call(newStats, stat)) {
            const statsValue = newStats[stat];
            currentPlayer[stat] = statsValue;
        }
    }
    localStorage.setItem(currentPlayer);
}

export function savePlayerStats(player) {
    localStorage.setItem(player);
}