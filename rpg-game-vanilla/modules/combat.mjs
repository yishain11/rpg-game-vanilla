export function singleCombatRound(attackerStats, defenderStats) {
    const damage = attack(attackerStats, defenderStats);
    if (damage) {
        defenderStats.life -= damage;
    }
    return [attackerStats, defenderStats];
}

export function selectStarter(playerDex, MonsterDex) {
    const monsterRoll = rollD20();
    const playerRoll = rollD20();
    return monsterRoll + parseInt(MonsterDex) > parseInt(playerDex) + playerRoll ? 'monster' : 'player';
}

function attack(attackerStats, defenderStats) {
    const roll = rollD20();
    console.log('attacker rolled', roll);
    console.log('attackerStats.strength', attackerStats.strength);
    console.log('attackerStats.level', attackerStats.level);
    const damage = ((parseInt(attackerStats.strength) + roll) * attackerStats.level) - (defenderStats.defense);
    console.log('attacker did damage', damage)
    if (damage > 0) {
        return damage;
    }
    return;
}

function rollD20() {
    return Math.floor(Math.random() * 20 + 1);
}