import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence, splicedLinear, splicedPow } from "../../utils/math";

export default {
    // Tier 0 buildings
    campfire: {cap: 1, persistent: true, icon: 'mdi-campfire', note: 'village_1', price() {
        return {village_wood: 5, village_stone: 5};
    }, timeNeeded() {
        return 5;
    }, effect: [
        {name: 'villageBuildings1', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 1 buildings
    hut: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-tent', note: 'village_2', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.32, lvl) * 10, village_plantFiber: Math.pow(1.35, lvl) * 15};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 10);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    farm: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-tractor', note: 'village_3', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * 200, village_stone: Math.pow(1.65, lvl) * 400};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 40);
    }, effect: [
        {name: 'farmer', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillagePlantFiberCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    plantation: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-forest', note: 'village_4', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.65, lvl) * 750, village_stone: Math.pow(1.65, lvl) * 430};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 50);
    }, effect: [
        {name: 'harvester', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageWoodCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    mine: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-tunnel', note: 'village_5', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * 1150};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 60);
    }, effect: [
        {name: 'miner', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageStoneCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    communityCenter: {cap: 1, persistent: true, icon: 'mdi-home-account', note: 'village_6', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, timeNeeded() {
        return 750;
    }, price() {
        return {village_wood: 1800, village_stone: 1650, village_metal: 100};
    }, effect: [
        {name: 'villageBuildings2', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 2 buildings
    smallHouse: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-variant', note: 'village_7', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.35, lvl) * 2750, village_metal: Math.pow(1.35, lvl) * 250, village_water: Math.pow(1.5, lvl) * 400};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 210);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    crane: {cap: 20, icon: 'mdi-crane', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.2, lvl) * 45);
    }, price(lvl) {
        return {village_wood: Math.pow(1.5, lvl) * 580, village_metal: Math.pow(1.35, lvl) * 275};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'base', value: lvl => lvl}
    ]},
    treasury: {cap: 10, capMult: true, icon: 'mdi-treasure-chest', note: 'village_9', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        let obj = {village_plantFiber: Math.pow(1.25, Math.max(0, lvl - 9)) * Math.pow(1.5, lvl) * 2600};
        if (lvl <= 0) {
            obj.village_fruit = 325;
            obj.village_grain = 550;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.4, lvl) * 240);
    }, effect: [
        {name: 'villageCoinUpgrades', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageTaxRate', type: 'base', value: lvl => splicedLinear(0.025, 0.01, 10, lvl)}
    ]},
    storage: {cap: 20, capMult: true, icon: 'mdi-database', note: 'village_8', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        let obj = {village_wood: Math.pow(lvl * 0.02 + 1.15, lvl) * 900, village_plantFiber: Math.pow(lvl * 0.02 + 1.15, lvl) * 900, village_stone: Math.pow(lvl * 0.02 + 1.18, lvl) * 1400};
        if (lvl <= 0) {
            obj.village_coin = 50;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * 225);
    }, effect: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 20, lvl)},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 20, lvl)},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 20, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl > 5 ? splicedPow(1.2, 1.05, 15, lvl - 5) : null}
    ]},
    forge: {cap: 20, icon: 'mdi-anvil', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_stone: Math.pow(lvl * 0.02 + 1.25, lvl) * 2750, village_metal: Math.pow(lvl * 0.02 + 1.18, lvl) * 250};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 180);
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageMetalCap', type: 'base', value: lvl => lvl * 200}
    ]},
    safe: {cap: 20, icon: 'mdi-safe', note: 'village_10', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_metal: Math.pow(lvl * 0.02 + 1.2, lvl) * 900, village_coin: Math.pow(lvl * 0.02 + 1.18, lvl) * 150};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 270);
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 100},
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    well: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-water-well', note: 'village_11', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * 4500, village_plantFiber: Math.pow(1.65, lvl) * 6800, village_stone: Math.pow(1.65, lvl) * 5000};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 300);
    }, effect: [
        {name: 'wellWorker', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageWaterCap', type: 'base', value: lvl => lvl > 1 ? (1000 * Math.min(lvl - 1, 9)) : null},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl > 1 ? Math.pow(1.5, Math.min(lvl - 1, 9)) : null}
    ]},
    garden: {cap: 20, icon: 'mdi-flower', note: 'village_12', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.25, lvl) * 8750, village_water: Math.pow(1.33, lvl) * 500};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 480);
    }, effect: [
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 50}
    ]},
    townHall: {cap: 1, persistent: true, icon: 'mdi-town-hall', note: 'village_13', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, timeNeeded() {
        return buildNum(14.4, 'K');
    }, price() {
        return {village_wood: buildNum(12.8, 'K'), village_stone: buildNum(10.5, 'K'), village_metal: 3150, village_water: 2900};
    }, effect: [
        {name: 'villageBuildings3', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 3 buildings
    house: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home', note: 'village_14', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.35, lvl) * buildNum(16, 'K'),
            village_plantFiber: Math.pow(1.35, lvl) * buildNum(17.8, 'K'),
            village_metal: Math.pow(1.35, lvl) * 2600,
            village_knowledge: lvl * 5 + 75
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 900);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    shed: {icon: 'mdi-home-analytics', cap: 5, capMult: true, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * 1600);
    }, price(lvl) {
        return {village_wood: Math.pow(1.8, lvl) * buildNum(14.5, 'K'), village_stone: Math.pow(2.05, lvl) * 9000, village_metal: Math.pow(1.7, lvl) * 5200};
    }, effect: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'villageUpgradeScythe', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeHatchet', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradePickaxe', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeWateringCan', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeInvestment', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    tunnel: {icon: 'mdi-tunnel', cap: 15, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 1350);
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.35, lvl) * buildNum(12, 'K'), village_water: Math.pow(1.5, lvl) * 850};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    sawmill: {icon: 'mdi-saw-blade', cap: 15, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 1500);
    }, price(lvl) {
        return {village_metal: Math.pow(1.3, lvl) * 3200, village_water: Math.pow(1.5, lvl) * 1150};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    library: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-book', note: 'village_15', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * buildNum(15, 'K'), village_water: Math.pow(1.85, lvl) * 6100};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 2100);
    }, effect: [
        {name: 'librarian', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl > 1 ? (5 * (lvl - 1)) : null}
    ]},
    aquarium: {icon: 'mdi-fishbowl', cap: 20, note: 'village_16', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 2400);
    }, price(lvl) {
        return {village_water: Math.pow(1.5, lvl) * 4400, village_knowledge: lvl * 10 + 35};
    }, effect: [
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    glassBlowery: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-glass-wine', note: 'village_17', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {village_metal: Math.pow(1.65, lvl) * buildNum(12, 'K'), village_water: Math.pow(1.85, lvl) * buildNum(24, 'K')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 3000);
    }, effect: [
        {name: 'glassblower', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageGlassCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    knowledgeTower: {cap: 50, icon: 'mdi-wizard-hat', note: 'village_19', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(1.5, lvl) * buildNum(35, 'K'),
            village_plantFiber: Math.pow(1.5, lvl) * buildNum(44, 'K'),
            village_glass: Math.pow(1.5, lvl) * 450,
            village_knowledge: Math.ceil(lvl * 8 * Math.pow(1.05, lvl) + 50)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.24, lvl) * 3300);
    }, effect: [
        {name: 'currencyVillageGlassCap', type: 'base', value: lvl => lvl * 250},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 3}
    ]},
    miniatureSmith: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-fireplace', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(60, 'K'),
            village_stone: Math.pow(1.65, lvl) * buildNum(35, 'K'),
            village_glass: Math.pow(1.4, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 2500);
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'villageWorker', type: 'base', value: lvl => lvl > 4 ? Math.floor(lvl / 5) : null}
    ]},
    church: {cap: 25, icon: 'mdi-church', note: 'village_18', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(65, 'K'),
            village_stone: Math.pow(1.65, lvl) * buildNum(85, 'K'),
            village_glass: Math.pow(1.5, lvl) * 1700
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 4800);
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.04}
    ]},
    school: {icon: 'mdi-school', cap: 5, capMult: true, note: 'village_20', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.25, lvl) * buildNum(400, 'K'),
            village_metal: Math.pow(2.25, lvl) * buildNum(45, 'K'),
            village_glass: Math.pow(2.1, lvl) * 4800,
            village_coin: Math.pow(1.85, lvl) * buildNum(70, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.6, lvl) * 3600);
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 5},
        {name: 'villageUpgradeBasics', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeProcessing', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradePump', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeSand', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeBook', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    localGovernment: {cap: 1, note: 'village_21', persistent: true, icon: 'mdi-city-variant', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded() {
        return buildNum(240, 'K');
    }, price() {
        return {village_wood: buildNum(975, 'K'), village_plantFiber: buildNum(1.02, 'M'), village_glass: buildNum(16, 'K'), village_coin: buildNum(280, 'K')};
    }, effect: [
        {name: 'villageBuildings4', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 4 buildings
    apartment: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-city', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(20, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(29.5, 'K'),
            village_hardwood: Math.pow(1.3, lvl) * 1500,
            village_gem: Math.pow(1.35, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 7200);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 2}
    ]},
    temple: {cap: 30, icon: 'mdi-temple-hindu', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_glass: Math.pow(1.25, lvl) * 8000,
            village_water: Math.pow(1.5, lvl) * buildNum(2, 'M'),
            village_coin: Math.pow(1.45, lvl) * buildNum(100, 'K'),
            village_knowledge: 15 * lvl + 125,
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(62.5, 'K'));
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    obelisk: {cap: 0, capMult: true, icon: 'mdi-tower-fire', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_coin: Math.pow(4.5, lvl) * buildNum(50, 'K')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.45, lvl) * buildNum(50, 'K'));
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    offeringPedestal: {cap: 4, note: 'village_23', icon: 'mdi-table-furniture', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(3, lvl) * buildNum(32.5, 'K'));
    }, price(lvl) {
        return [
            {village_wood: buildNum(2, 'M'), village_plantFiber: buildNum(2, 'M'), village_stone: buildNum(2, 'M')},
            {village_coin: buildNum(10, 'M'), village_metal: buildNum(3, 'M'), village_water: buildNum(5, 'M')},
            {village_glass: buildNum(120, 'K'), village_hardwood: buildNum(40, 'K'), village_gem: buildNum(40, 'K')},
            {village_knowledge: 250, village_science: 100, village_joy: 750}
        ][lvl];
    }, effect: [
        {name: 'villageOffering1', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageOffering2', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageOffering3', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageOffering4', type: 'unlock', value: lvl => lvl >= 4}
    ]},
    theater: {cap: 5, capMult: true, note: 'village_24', subtype: 'workstation', icon: 'mdi-drama-masks', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        let obj = {village_stone: Math.pow(2.15, lvl) * buildNum(3, 'M'), village_glass: Math.pow(1.8, lvl) * buildNum(14.8, 'K')};
        if (lvl >= 1) {
            obj.village_hardwood = Math.pow(1.75, lvl - 1) * 2000;
        }
        if (lvl >= 2) {
            obj.village_gem = Math.pow(1.75, lvl - 2) * 2750;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(60, 'K'));
    }, effect: [
        {name: 'entertainer', type: 'villageJob', value: lvl => lvl}
    ]},
    lumberjackHut: {cap: 10, capMult: true, note: 'village_25', subtype: 'workstation', icon: 'mdi-axe', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.85, lvl) * buildNum(7.7, 'M'), village_metal: Math.pow(1.85, lvl) * buildNum(1.35, 'M')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(10, 'K'));
    }, effect: [
        {name: 'lumberjack', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageHardwoodCap', type: 'base', value: lvl => lvl > 1 ? (200 * (lvl - 1)) : null}
    ]},
    deepMine: {cap: 10, capMult: true, note: 'village_26', subtype: 'workstation', icon: 'mdi-tunnel', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(13, 'M'),
            village_knowledge: lvl * 10 + 165,
            village_hardwood: Math.pow(1.65, lvl) * 500
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(12, 'K'));
    }, effect: [
        {name: 'blastMiner', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageGemCap', type: 'base', value: lvl => lvl > 1 ? (200 * (lvl - 1)) : null}
    ]},
    bigStorage: {cap: 20, capMult: true, icon: 'mdi-database-settings', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_hardwood: Math.pow(lvl * 0.03 + 1.25, lvl) * 900, village_gem: Math.pow(lvl * 0.03 + 1.25, lvl) * 900};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(15, 'K'));
    }, effect: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 20, lvl)},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 20, lvl)},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 20, lvl)}
    ]},
    luxuryHouse: {cap: 25, capMult: true, note: 'village_27', subtype: 'housing', icon: 'mdi-bank', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.65, lvl) * buildNum(7, 'M'),
            village_hardwood: Math.pow(1.35, lvl) * 4000,
            village_gem: Math.pow(1.3, lvl) * 9200,
            village_coin: Math.pow(2.15, lvl) * buildNum(25, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(18, 'K'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.002}
    ]},
    lake: {cap: 10, capMult: true, note: 'village_28', subtype: 'workstation', icon: 'mdi-waves', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_water: Math.pow(2.25, lvl) * buildNum(50, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(60, 'K'),
            village_gem: Math.pow(1.65, lvl) * buildNum(11, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(20, 'K'));
    }, effect: [
        {name: 'fisherman', type: 'villageJob', value: lvl => lvl}
    ]},
    gemSawBlade: {icon: 'mdi-saw-blade', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(30, 'K'));
    }, price(lvl) {
        return {village_stone: Math.pow(1.85, lvl) * buildNum(75, 'M'), village_gem: Math.ceil(Math.pow(1.5, lvl) * buildNum(15, 'K'))};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    miniatureGlassblowery: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-glass-tulip', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.5, lvl) * buildNum(125, 'M'),
            village_water: Math.pow(1.85, lvl) * buildNum(120, 'M'),
            village_hardwood: Math.pow(1.3, lvl) * buildNum(12.5, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(14, 'K'));
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'villageWorker', type: 'base', value: lvl => lvl > 4 ? Math.floor(lvl / 5) : null}
    ]},
    lostPages: {icon: 'mdi-script-text', cap: 10, note: 'village_29', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.5, lvl) * buildNum(80, 'K'));
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(140, 'M'),
            village_plantFiber: Math.pow(1.85, lvl) * buildNum(185, 'M'),
            village_knowledge: lvl * 15 + 220,
            village_hardwood: Math.pow(1.65, lvl) * buildNum(22, 'K')
        };
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 8},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 5},
        {name: 'villageUpgradeAxe', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradeBomb', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeToll', type: 'unlock', value: lvl => lvl >= 6},
        {name: 'villageUpgradeFishingRod', type: 'unlock', value: lvl => lvl >= 8},
        {name: 'villageUpgradeHolyBook', type: 'unlock', value: lvl => lvl >= 10}
    ]},
    playground: {cap: 5, note: 'village_30', icon: 'mdi-slide', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(140, 'K'));
    }, price(lvl) {
        return {village_water: Math.pow(4, lvl) * buildNum(250, 'M'), village_coin: Math.pow(3, lvl) * buildNum(50, 'M')};
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.01}
    ]},
    government: {cap: 1, persistent: true, icon: 'mdi-city', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded() {
        return buildNum(1.5, 'M');
    }, price() {
        return {village_hardwood: buildNum(50, 'K'), village_gem: buildNum(50, 'K'), village_coin: buildNum(150, 'M'), village_knowledge: 260};
    }, effect: [
        {name: 'villageBuildings5', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 5 buildings
    modernHouse: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-modern', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(220, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(160, 'K'),
            village_hardwood: Math.pow(1.3, lvl) * buildNum(55, 'K'),
            village_gem: Math.pow(1.35, lvl) * buildNum(12, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(200, 'K'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 3}
    ]},
    fountain: {cap: 10, icon: 'mdi-fountain', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(275, 'K'));
    }, price(lvl) {
        return {
            village_stone: Math.pow(1.65, lvl) * buildNum(875, 'M'),
            village_plantFiber: Math.pow(1.65, lvl) * buildNum(1.1, 'B'),
            village_metal: Math.pow(1.65, lvl) * buildNum(180, 'M'),
            village_coin: Math.pow(1.85, lvl) * buildNum(400, 'M')
        };
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    laboratory: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-flask', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.85, lvl) * buildNum(40, 'M'),
            village_glass: Math.pow(1.85, lvl) * buildNum(275, 'K'),
            village_gem: Math.pow(1.85, lvl) * buildNum(77.5, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(300, 'K'));
    }, effect: [
        {name: 'scientist', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl > 2 ? ((lvl - 2) * 5) : null},
        {name: 'villageUpgradeBreakthrough', type: 'unlock', value: lvl => lvl >= 2}
    ]},
    court: {cap: 2, icon: 'mdi-gavel', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.85, lvl) * buildNum(140, 'K'),
            village_knowledge: Math.round(Math.pow(1.15, lvl) * 275),
            village_science: lvl * 20 + 30
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.5, lvl) * buildNum(480, 'K'));
    }, effect: [
        {name: 'villagePolicyTaxes', type: 'base', value: lvl => lvl >= 1 ? 1 : null},
        {name: 'villagePolicyImmigration', type: 'base', value: lvl => lvl >= 2 ? 1 : null}
    ]},
    greenhouse: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-greenhouse', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.85, lvl) * buildNum(500, 'M'), village_glass: Math.pow(1.85, lvl) * buildNum(400, 'K')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(550, 'K'));
    }, effect: [
        {name: 'gardener', type: 'villageJob', value: lvl => lvl}
    ]},
    fullBasket: {cap: 8, icon: 'mdi-basket', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.4, lvl) * buildNum(1, 'B'),
            village_joy: Math.ceil(Math.pow(1.35, lvl) * 70)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(1.5, 'M'));
    }, effect: [
        {name: 'villageFoodGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.25 + 1)},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 8}
    ]},
    storageHall: {cap: 20, icon: 'mdi-warehouse', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(1.75, 'B'),
            village_metal: Math.pow(1.65, lvl) * buildNum(140, 'M'),
            village_hardwood: Math.pow(1.5, lvl) * buildNum(230, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(700, 'K'));
    }, effect: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl * 8}
    ]},
    bioLab: {cap: 5, icon: 'mdi-dna', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(2.3, lvl) * buildNum(200, 'M'),
            village_gem: Math.pow(1.85, lvl) * buildNum(260, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(1, 'M'));
    }, effect: [
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'villageUpgradeModifiedPlants', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeDopamine', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeAdrenaline', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    taxOffice: {cap: 3, icon: 'mdi-office-building', requirement() {
        return store.state.unlock.villageBuildings5.use && store.state.upgrade.item.village_court.level >= 1;
    }, price(lvl) {
        return {
            village_stone: Math.pow(6, lvl) * buildNum(3.5, 'B'),
            village_water: Math.pow(15, lvl) * buildNum(25, 'B'),
            village_knowledge: lvl * 75 + 300,
            village_coin: Math.pow(3.5, lvl) * buildNum(2, 'B')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(2.5, lvl) * buildNum(1.2, 'M'));
    }, effect: [
        {name: 'villagePolicyTaxes', type: 'base', value: lvl => lvl}
    ]},
    festival: {icon: 'mdi-party-popper', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_joy: Math.ceil(Math.pow(1.15, lvl) * 100)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.35, lvl) * buildNum(750, 'K'));
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.003},
        {name: 'villageTaxRate', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    cemetery: {cap: 10, icon: 'mdi-grave-stone', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.85, lvl) * buildNum(6, 'B'), village_stone: Math.pow(1.85, lvl) * buildNum(8.5, 'B')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(1.5, 'M'));
    }, effect: [
        {name: 'villageOfferingPower', type: 'mult', value: lvl => lvl * 0.5 + 1},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 8}
    ]},
    mosque: {cap: 25, icon: 'mdi-mosque', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(2.12, lvl) * buildNum(42, 'B'),
            village_glass: Math.pow(1.9, lvl) * buildNum(11, 'M'),
            village_gem: Math.pow(1.55, lvl) * buildNum(4.5, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(3.2, 'M'));
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'base', value: lvl => getSequence(2, lvl) * 2}
    ]},
    waterTower: {cap: 12, icon: 'mdi-tower-beach', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.45, lvl) * buildNum(65, 'B'),
            village_knowledge: lvl * 125 + 625
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(8, 'M'));
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.5 + 1)}
    ]},
    outdoorPump: {cap: 5, icon: 'mdi-water-pump', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_water: Math.pow(3.3, lvl) * buildNum(360, 'B'),
            village_joy: lvl * 180 + 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(18.5, 'M'));
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.4 + 1}
    ]},
    bankVault: {cap: 12, icon: 'mdi-safe-square', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.85, lvl) * buildNum(1.6, 'B'),
            village_science: lvl * 45 + 225
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(40, 'M'));
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.6, lvl)}
    ]},
    steamEngine: {cap: 1, persistent: true, icon: 'mdi-turbine', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, timeNeeded() {
        return buildNum(600, 'M');
    }, price() {
        return {village_metal: buildNum(5.76, 'B'), village_water: buildNum(9, 'T'), village_hardwood: buildNum(35, 'M'), village_coin: buildNum(700, 'B'), village_science: 360, village_joy: 1200};
    }, effect: [
        {name: 'villageBuildings6', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 6 buildings
    mansion: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-balcony', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.65, lvl) * buildNum(10.5, 'T'),
            village_marble: Math.pow(1.35, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(140, 'M'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 4}
    ]},
    oilRig: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-tower-fire', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(2.35, lvl) * buildNum(220, 'B'),
            village_water: Math.pow(4.1, lvl) * buildNum(15, 'T'),
            village_knowledge: lvl * 500 + 1250
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(320, 'M'));
    }, effect: [
        {name: 'oilWorker', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageOilCap', type: 'base', value: lvl => lvl > 1 ? ((lvl - 1) * 400) : null}
    ]},
    generator: {icon: 'mdi-engine', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.45, lvl) * buildNum(275, 'B'),
            village_metal: Math.pow(1.35, lvl) * buildNum(12, 'B'),
            village_oil: Math.pow(1.25, lvl) * 1400
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.2, lvl) * buildNum(550, 'M'));
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl * 3},
        {name: 'villagePollution', type: 'base', value: lvl => lvl * 2}
    ]},
    lobby: {icon: 'mdi-account-group', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_coin: Math.pow(lvl * 0.05 + 1.35, lvl) * buildNum(1.5, 'T')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(750, 'M'));
    }, effect: [
        {name: 'villagePollutionTolerance', type: 'base', value: lvl => lvl}
    ]},
    oilStorage: {cap: 20, icon: 'mdi-barrel', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.55, lvl) * buildNum(105, 'M'),
            village_glass: Math.pow(1.75, lvl) * buildNum(225, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(1.1, 'B'));
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)}
    ]},
    artGallery: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-palette-advanced', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.9, lvl) * buildNum(18, 'T'),
            village_oil: Math.pow(2.2, lvl) * buildNum(24, 'K'),
            village_joy: lvl * 400 + 1800
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(1.6, 'B'));
    }, effect: [
        {name: 'sculptor', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageMarbleCap', type: 'base', value: lvl => lvl > 1 ? ((lvl - 1) * 100) : null}
    ]},
    excavator: {icon: 'mdi-excavator', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.35, lvl) * buildNum(440, 'M'),
            village_oil: Math.pow(1.6, lvl) * buildNum(30, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(2.2, 'B'));
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (0.25 * lvl + 1)},
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (0.25 * lvl + 1)},
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (0.25 * lvl + 1)},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},
    oilTruck: {icon: 'mdi-tanker-truck', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_gem: Math.pow(1.45, lvl) * buildNum(600, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(3, 'B'));
    }, effect: [
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},
    immigrationOffice: {cap: 3, icon: 'mdi-office-building', requirement() {
        return store.state.unlock.villageBuildings6.use && store.state.upgrade.item.village_court.level >= 2;
    }, price(lvl) {
        return {
            village_knowledge: lvl * 2000 + 3000,
            village_science: lvl * 750 + 1000,
            village_coin: Math.pow(10, lvl) * buildNum(100, 'T')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(8, lvl) * buildNum(5, 'B'));
    }, effect: [
        {name: 'villagePolicyImmigration', type: 'base', value: lvl => lvl}
    ]},
    marbleStatue: {cap: 10, icon: 'mdi-human-female-dance', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_marble: Math.pow(1.65, lvl) * 2250
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(7.5, 'B'));
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.004},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageKnowledgeCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
}
