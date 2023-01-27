import { config } from "./config.mjs";
import { createMonster } from "./monsters.mjs";

export function genContracts(locations) {
    const contracts = {};
    locations.forEach(location => {
        contracts[location] = {};
        contracts[location].location = location;
        contracts[location].contracts = [];
        for (let i = 0; i < config.contractsPerLocation; i++) {
            const contract = {
                monster: createMonster()
            };
            contract.gold = contract.monster.goldReward;
            contract.xp = contract.monster.xpResults;
            contract.level = contract.monster.level;
            contracts[location].contracts.push(contract);
        }
    });
    return contracts;
}

export function saveContracts(contracts) {
    localStorage.setItem('contracts', JSON.stringify(contracts));
}

export function loadContracts(location) {
    const contracts = JSON.parse(localStorage.getItem('contracts'));
    if (location) {
        return contracts[location];
    }
    return contracts;
}
