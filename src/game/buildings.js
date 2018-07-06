
export const buildings = {
    'h2_generator': {name: 'H2 generator',   build_on: 'any', locked:  (state) => false,   cost: {'point': 10}, text: 'H2 generator', onClick: (state) => { return buy(state, 'h2_generator'); }, onTick: (state) => { state.energy += 1; return state; }},
    'c_generator': {name: 'C generator',   build_on: 'any', locked:  (state) => false,     cost: {'point': 10}, text: 'C generator', onClick: (state) => { return buy(state, 'c_generator'); }, onTick: (state) => { state.energy += 1; return state; }},
    'ch4_generator': {name: 'CH4 generator',   build_on: 'any', locked:  (state) => !state.epoch_3, cost: {'point': 50}, text: 'CH4 generator', onClick: (state) => { return buy(state, 'ch4_generator'); }, onTick: (state) => { state.energy += 1; return state; }},
    'solar_generator': {name: 'Solar generator', build_on: 'any', locked:  (state) => !state.epoch_3, cost: {'point': 25}, text: 'Solar generator', onClick: (state) => { return buy(state, 'solar_generator'); }, onTick: (state) => { state.energy += 1; return state; }},

    'mine': {name: 'Mine',    build_on: 'any',    locked:  (state) => false,                cost: {'point': 15}, text: 'Mine', onClick: (state) => { return buy(state, 'mine'); }, onTick: (state) => { state.energy += 1; return state; }},
    'pump': {name: 'Pump',    build_on: 'any',    locked:  (state) => false,                cost: {'point': 15}, text: 'Pump', onClick: (state) => { return buy(state, 'pump'); }, onTick: (state) => { state.energy += 1; return state; }},

    // force mine
    // force pump

    'h2_smelt': {name: 'H2 smelting',   build_on: 'any',    locked:  (state) => false,      cost: {'point': 20}, text: 'H2 smelting', onClick: (state) => { return buy(state, 'h2_smelt'); }, onTick: (state) => { state.energy += 1; return state; }},
    'c_smelt': {name: 'C smelting',    build_on: 'any',    locked:  (state) => false,       cost: {'point': 20}, text: 'C smelting', onClick: (state) => { return buy(state, 'c_smelt'); }, onTick: (state) => { state.energy += 1; return state; }},
    'ch4_smelt': {name: 'CH4 smelting',  build_on: 'any',    locked:  (state) => !state.epoch_3,     cost: {'point': 45}, text: 'CH4 smelting', onClick: (state) => { return buy(state, 'ch4_smelt'); }, onTick: (state) => { state.energy += 1; return state; }},
    'e_smelt': {name: 'Electricity smelting', build_on: 'any', locked:  (state) => !state.epoch_3,   cost: {'point': 45}, text: 'Electricity smelting', onClick: (state) => { return buy(state, 'e_smelt'); }, onTick: (state) => { state.energy += 1; return state; }},

    'chemical': {name: 'chemical',        build_on: 'any',    locked:  (state) => !state.epoch_3,   cost: {'point': 20}, text: 'chemical', onClick: (state) => { return buy(state, 'chemical'); }, onTick: (state) => { state.energy += 1; return state; }},
    'bioreactor': {name: 'bioreactor',    build_on: 'any',    locked:  (state) => !state.epoch_3,   cost: {'point': 30}, text: 'bioreactor', onClick: (state) => { return buy(state, 'bioreactor'); }, onTick: (state) => { state.energy += 1; return state; }},

    'micro_facility': {name: 'micro facility',    build_on: 'any',    locked:  (state) => !state.epoch_2,   cost: {'point': 25}, text: 'micro facility', onClick: (state) => { return buy(state, 'micro_facility'); }, onTick: (state) => { state.energy += 1; return state; }},
    'nano_facility': {name: 'nano facility',    build_on: 'any',    locked:  (state) => !state.epoch_2,   cost: {'point': 25}, text: 'nano facility', onClick: (state) => { return buy(state, 'nano_facility'); }, onTick: (state) => { state.energy += 1; return state; }},
    'block_facility': {name: 'block facility',    build_on: 'any',    locked:  (state) => !state.epoch_2,   cost: {'point': 25}, text: 'block facility', onClick: (state) => { return buy(state, 'block_facility'); }, onTick: (state) => { state.energy += 1; return state; }},
    'organic_facility': {name: 'organic facility',    build_on: 'any',    locked:  (state) => !state.epoch_2,   cost: {'point': 25}, text: 'organic facility', onClick: (state) => { return buy(state, 'organic_facility'); }, onTick: (state) => { state.energy += 1; return state; }},

    'comp_factory': {name: 'comp factory',    build_on: 'any',    locked:  (state) => !state.epoch_3,      cost: {'point': 45}, text: 'comp factory', onClick: (state) => { return buy(state, 'comp_factory'); }, onTick: (state) => { state.energy += 1; return state; }},
    'robot_factory': {name: 'robot factory',    build_on: 'any',    locked:  (state) => !state.epoch_3,      cost: {'point': 45}, text: 'robot factory', onClick: (state) => { return buy(state, 'robot_factory'); }, onTick: (state) => { state.energy += 1; return state; }},
    'module_factory': {name: 'module factory',    build_on: 'any',    locked:  (state) => !state.epoch_3,      cost: {'point': 45}, text: 'module factory', onClick: (state) => { return buy(state, 'module_factory'); }, onTick: (state) => { state.energy += 1; return state; }},
    'bionic_factory': {name: 'bionic factory',    build_on: 'any',    locked:  (state) => !state.epoch_3,      cost: {'point': 45}, text: 'bionic factory', onClick: (state) => { return buy(state, 'bionic_factory'); }, onTick: (state) => { state.energy += 1; return state; }},

    'satellite_shipyard': {name: 'satellite shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_1,   cost: {'point': 25}, text: 'satellite shipyard', onClick: (state) => { return buy(state, 'satellite_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'frigate_shipyard': {name: 'frigate shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_1,   cost: {'point': 25}, text: 'frigate shipyard', onClick: (state) => { return buy(state, 'frigate_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'destroyer_shipyard': {name: 'destroyer shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_2,   cost: {'point': 50}, text: 'destroyer shipyard', onClick: (state) => { return buy(state, 'destroyer_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'cruiser_shipyard': {name: 'cruiser shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_3,   cost: {'point': 100}, text: 'cruiser shipyard', onClick: (state) => { return buy(state, 'cruiser_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'dreadnought_shipyard': {name: 'dreadnought shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_3,   cost: {'point': 100}, text: 'dreadnought shipyard', onClick: (state) => { return buy(state, 'dreadnought_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'battlecruiser_shipyard': {name: 'battlecruiser shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_4,   cost: {'point': 200}, text: 'battlecruiser shipyard', onClick: (state) => { return buy(state, 'battlecruiser_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'battleship_shipyard': {name: 'battleship shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_4,   cost: {'point': 200}, text: 'battleship shipyard', onClick: (state) => { return buy(state, 'battleship_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'carrier_shipyard': {name: 'carrier shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_4,   cost: {'point': 200}, text: 'carrier shipyard', onClick: (state) => { return buy(state, 'carrier_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},
    'titan_shipyard': {name: 'titan shipyard',    build_on: 'any',    locked:  (state) => !state.epoch_5,   cost: {'point': 400}, text: 'titan shipyard', onClick: (state) => { return buy(state, 'titan_shipyard'); }, onTick: (state) => { state.energy += 1; return state; }},

};

function buy(state, building) {
    state[building]++;
    return state;
}