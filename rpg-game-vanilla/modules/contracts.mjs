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
            contracts[location].contracts.push(contract);
        }
    });
    return contracts;
}

export function saveContracts(contracts) {
    console.log('contracts', contracts);
    localStorage.setItem('contracts', JSON.stringify(contracts));
}
