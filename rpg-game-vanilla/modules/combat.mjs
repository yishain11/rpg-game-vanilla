export function singleCombatRound(attackerStats, defenderStats) {
    const damage = attack(attackerStats, defenderStats);
    defenderStats.life -= damage;
    return [attackerStats, defenderStats];
}

export function selectStarter(playerDex, MonsterDex) {
    const monsterRoll = rollD20();
    const playerRoll = rollD20();
    return monsterRoll + parseInt(MonsterDex) > parseInt(playerDex) + playerRoll ? 'monster' : 'player';
}

function attack(attackerStats, defenderStats) {
    const roll = rollD20();
    const damage = ((attackerStats.strength + roll) * attackerStats.level) - (defenderStats.defense);
    if (damage > 0) {
        return damage;
    }
    return;
}

function rollD20() {
    return Math.floor(Math.random() * 20 + 1);
}