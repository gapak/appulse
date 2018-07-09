

import {isEnough, chargeCost, buy, add, convert} from '../core/bdcgin';

export const buildings = {
    'burn_generator': {name: 'Burn generator',      build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 10}, text: 'H2 generator', onClick: (state) => { return buy(state, 'h2_generator'); },
        modes: {
            H2: {name: 'H2',  onTick: (state) => convert(state, 'h2_generator', {H2: 1}, {energy: 4})},
            C: {name: 'C',  onTick: (state) => convert(state, 'c_generator', {C: 1}, {energy: 4})},
        }},
 //   'h2_generator': {name: 'H2 generator',          build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 10}, text: 'H2 generator', onClick: (state) => { return buy(state, 'h2_generator'); }, onTick: (state) => convert(state, 'h2_generator', {H2: 1}, {energy: 4})},
 //   'c_generator': {name: 'C generator',            build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 10}, text: 'C generator', onClick: (state) => { return buy(state, 'c_generator'); }, onTick: (state) => convert(state, 'c_generator', {C: 1}, {energy: 4})},
    'solar_generator': {name: 'Solar generator',    build_on: 'any',    is_activable: false, locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'Solar generator', onClick: (state) => { return buy(state, 'solar_generator'); }, onTick: (state) => { state.energy += 2; return state; }},
    'ch4_generator': {name: 'CH4 generator',        build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 50}, text: 'CH4 generator', onClick: (state) => { return buy(state, 'ch4_generator'); }, onTick: (state) => convert(state, 'ch4_generator', {CH4: 2}, {energy: 6, H20: 1, O2: 1})},

    'mine': {name: 'Mine',                          build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 15}, text: 'Mine', onClick: (state) => { return buy(state, 'mine'); },
        modes: {
            C: {name: 'C',          onTick: (state) => convert(state, 'mine', {energy: 1}, {C: 1})},
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'mine', {energy: 1}, {SiO2: 1})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'mine', {energy: 1}, {FeO2: 1})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'mine', {energy: 1}, {Al2O3: 1})},
        }},
    'pump': {name: 'Pump',                          build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 15}, text: 'Pump', onClick: (state) => { return buy(state, 'pump'); },
        modes: {
            H2: {name: 'H2',        onTick: (state) => convert(state, 'pump', {energy: 1}, {H2: 1})},
            O2: {name: 'O2',        onTick: (state) => convert(state, 'pump', {energy: 1}, {O2: 1})},
            CO2: {name: 'CO2',      onTick: (state) => convert(state, 'pump', {energy: 1}, {CO2: 1})},
            H2O: {name: 'H2O',      onTick: (state) => convert(state, 'pump', {energy: 1}, {H2O: 1})},
            CH4: {name: 'CH4',      onTick: (state) => convert(state, 'pump', {energy: 1}, {CH4: 1})},
        }},
    'force_mine': {name: 'Force Mine',              build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_4, cost: {'point': 45}, text: 'Mine', onClick: (state) => { return buy(state, 'force_mine'); },
        modes: {
            C: {name: 'C',          onTick: (state) => convert(state, 'mine', {energy: 3}, {C: 2})},
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'mine', {energy: 3}, {SiO2: 2})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'mine', {energy: 3}, {FeO2: 2})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'mine', {energy: 3}, {Al2O3: 2})},
        }},
    'force_pump': {name: 'Force Pump',              build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_4, cost: {'point': 45}, text: 'Pump', onClick: (state) => { return buy(state, 'force_pump'); },
        modes: {
            H2: {name: 'H2',        onTick: (state) => convert(state, 'pump', {energy: 3}, {H2: 2})},
            O2: {name: 'O2',        onTick: (state) => convert(state, 'pump', {energy: 3}, {O2: 2})},
            CO2: {name: 'CO2',      onTick: (state) => convert(state, 'pump', {energy: 3}, {CO2: 2})},
            H2O: {name: 'H2O',      onTick: (state) => convert(state, 'pump', {energy: 3}, {H2O: 2})},
            CH4: {name: 'CH4',      onTick: (state) => convert(state, 'pump', {energy: 3}, {CH4: 2})},
        }},

    'burn_smelt': {name: 'Burn smelting',               build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2,          cost: {'point': 20}, text: 'Burn smelting', onClick: (state) => { return buy(state, 'burn_smelt'); },
        modes: {
            H2_SiO2: {name: 'H2 SiO2',    onTick: (state) => convert(state, 'burn_smelt', {H2: 1, SiO2: 3}, {H2O: 1, Si: 3})},
            H2_FeO2: {name: 'H2 FeO2',    onTick: (state) => convert(state, 'burn_smelt', {H2: 1, FeO2: 3}, {H2O: 1, Fe: 3})},
            H2_Al2O3: {name: 'H2 Al2O3',  onTick: (state) => convert(state, 'burn_smelt', {H2: 1, Al2O3: 3}, {H2O: 1, Al: 3})},
            C_SiO2: {name: 'C SiO2',    onTick: (state) => convert(state, 'burn_smelt', {C: 1, SiO2: 3}, {CO2: 1, Si: 3})},
            C_FeO2: {name: 'C FeO2',    onTick: (state) => convert(state, 'burn_smelt', {C: 1, FeO2: 3}, {CO2: 1, Fe: 3})},
            C_Al2O3: {name: 'C Al2O3',  onTick: (state) => convert(state, 'burn_smelt', {C: 1, Al2O3: 3}, {CO2: 1, Al: 3})},
        }},

    /*
    'h2_smelt': {name: 'H2 smelting',               build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 20}, text: 'H2 smelting', onClick: (state) => { return buy(state, 'h2_smelt'); },
        modes: {
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'h2_smelt', {H2: 1, SiO2: 3}, {H2O: 1, Si: 3})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'h2_smelt', {H2: 1, FeO2: 3}, {H2O: 1, Fe: 3})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'h2_smelt', {H2: 1, Al2O3: 3}, {H2O: 1, Al: 3})},
        }},
    'c_smelt': {name: 'C smelting',                 build_on: 'any',    is_activable: true,  locked:  (state) => false,          cost: {'point': 20}, text: 'C smelting', onClick: (state) => { return buy(state, 'c_smelt'); },
        modes: {
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'c_smelt', {C: 1, SiO2: 3}, {CO2: 1, Si: 3})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'c_smelt', {C: 1, FeO2: 3}, {CO2: 1, Fe: 3})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'c_smelt', {C: 1, Al2O3: 3}, {CO2: 1, Al: 3})},
        }},
        */
    'ch4_smelt': {name: 'CH4 smelting',             build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 45}, text: 'CH4 smelting', onClick: (state) => { return buy(state, 'ch4_smelt'); },
        modes: {
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'ch4_smelt', {CH4: 2, SiO2: 5}, {CO2: 1, H2O: 1, Si: 5})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'ch4_smelt', {CH4: 2, FeO2: 5}, {CO2: 1, H2O: 1, Fe: 5})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'ch4_smelt', {CH4: 2, Al2O3: 5}, {CO2: 1, H2O: 1, Al: 5})},
        }},
    'e_smelt': {name: 'Electricity smelting',       build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_4, cost: {'point': 45}, text: 'Electricity smelting', onClick: (state) => { return buy(state, 'e_smelt'); },
        modes: {
            SiO2: {name: 'SiO2',    onTick: (state) => convert(state, 'e_smelt', {energy: 4, SiO2: 2}, {Si: 2, O2: 1})},
            FeO2: {name: 'FeO2',    onTick: (state) => convert(state, 'e_smelt', {energy: 4, FeO2: 2}, {Fe: 2, O2: 1})},
            Al2O3: {name: 'Al2O3',  onTick: (state) => convert(state, 'e_smelt', {energy: 4, Al2O3: 2}, {Al: 2, O2: 1})},
        }},

    'chemical': {name: 'chemical',                  build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 20}, text: 'chemical', onClick: (state) => { return buy(state, 'chemical'); },
        modes: {
            chem1: {name: 'chem1',  onTick: (state) => convert(state, 'chemical', {energy: 2, CO2: 1, H2O: 1}, {CH4: 2, O2: 2})},
            chem2: {name: 'chem2',  onTick: (state) => convert(state, 'chemical', {H2O: 1, C: 1}, {CO2: 1, H2: 1, energy: 2})},
            chem3: {name: 'chem3',  onTick: (state) => convert(state, 'chemical', {CO2: 1, H2: 2, energy: 2}, {CH4: 2, H2O: 1})},
        }},
    'bioreactor': {name: 'bioreactor',              build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 30}, text: 'bioreactor', onClick: (state) => { return buy(state, 'bioreactor'); },
        modes: {
            bio1: {name: 'bio1',  onTick: (state) => convert(state, 'organic_facility', {energy: 2, H2O: 1, CO2: 1}, {organic: 1})},
            bio2: {name: 'bio2',  onTick: (state) => convert(state, 'bionic_factory', {energy: 4, organic: 2, CH4: 1}, {bionic: 1})},
        }},

    'facility': {name: 'facility',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'facility', onClick: (state) => { return buy(state, 'facility'); },
        modes: {
            micro: {name: 'micro',  onTick: (state) => convert(state, 'facility', {energy: 2, C: 1, Si: 1}, {micro: 1})},
            nano: {name: 'nano',    onTick: (state) => convert(state, 'facility', {energy: 2, C: 1, Fe: 1}, {nano: 1})},
            block: {name: 'block',  onTick: (state) => convert(state, 'facility', {energy: 2, C: 1, Al: 1}, {block: 1})},
        }},

    'factory': {name: 'factory',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'factory', onClick: (state) => { return buy(state, 'factory'); },
        modes: {
            comp: {name: 'comp',  onTick: (state) => convert(state, 'comp_factory', {energy: 4, micro: 1, block: 1}, {comp: 1})},
            robot: {name: 'robot',    onTick: (state) => convert(state, 'robot_factory', {energy: 4, micro: 1, nano: 1}, {robot: 1})},
            module: {name: 'module',  onTick: (state) => convert(state, 'module_factory', {energy: 4, block: 1, nano: 1}, {module: 1})},
        }},

   // 'micro_facility': {name: 'micro facility',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'micro facility', onClick: (state) => { return buy(state, 'micro_facility'); }, onTick: (state) => convert(state, 'micro_facility', {energy: 2, C: 1, Si: 1}, {micro: 1})},
   // 'nano_facility': {name: 'nano facility',        build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'nano facility', onClick: (state) => { return buy(state, 'nano_facility'); }, onTick: (state) => convert(state, 'nano_facility', {energy: 2, C: 1, Fe: 1}, {nano: 1})}, //
   // 'block_facility': {name: 'block facility',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'block facility', onClick: (state) => { return buy(state, 'block_facility'); }, onTick: (state) => convert(state, 'block_facility', {energy: 2, C: 1, Al: 1}, {block: 1})},
   // 'organic_facility': {name: 'organic facility',  build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_2, cost: {'point': 25}, text: 'organic facility', onClick: (state) => { return buy(state, 'organic_facility'); }, onTick: (state) => convert(state, 'organic_facility', {energy: 2, H2O: 1, CO2: 1}, {organic: 1})},

   // 'comp_factory': {name: 'comp factory',          build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 45}, text: 'comp factory', onClick: (state) => { return buy(state, 'comp_factory'); }, onTick: (state) => convert(state, 'comp_factory', {energy: 4, micro: 1, block: 1}, {comp: 1})},
   // 'robot_factory': {name: 'robot factory',        build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 45}, text: 'robot factory', onClick: (state) => { return buy(state, 'robot_factory'); }, onTick: (state) => convert(state, 'robot_factory', {energy: 4, micro: 1, nano: 1}, {robot: 1})},
   // 'module_factory': {name: 'module factory',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 45}, text: 'module factory', onClick: (state) => { return buy(state, 'module_factory'); }, onTick: (state) => convert(state, 'module_factory', {energy: 4, block: 1, nano: 1}, {module: 1})},
   // 'bionic_factory': {name: 'bionic factory',      build_on: 'any',    is_activable: true,  locked:  (state) => !state.epoch_3, cost: {'point': 45}, text: 'bionic factory', onClick: (state) => { return buy(state, 'bionic_factory'); }, onTick: (state) => convert(state, 'bionic_factory', {energy: 4, organic: 2, CH4: 1}, {bionic: 1})},

    'xs_shipyard': {name: 'xs shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 25}, text: 'xs shipyard', onClick: (state) => { return buy(state, 'xs_shipyard'); }},
    's_shipyard':  {name: 's shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 50}, text: 's shipyard', onClick: (state) => { return buy(state, 's_shipyard'); }},
    'm_shipyard':  {name: 'm shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 100}, text: 'm shipyard', onClick: (state) => { return buy(state, 'm_shipyard'); }},
    'l_shipyard':  {name: 'l shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 200}, text: 'l shipyard', onClick: (state) => { return buy(state, 'l_shipyard'); }},
    'xl_shipyard': {name: 'xl shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 400}, text: 'xl shipyard', onClick: (state) => { return buy(state, 'xl_shipyard'); }},


/*
    'satellite_shipyard': {name: 'satellite shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 25}, text: 'satellite shipyard', onClick: (state) => { return buy(state, 'satellite_shipyard'); }},
    'frigate_shipyard': {name: 'frigate shipyard',  build_on: 'any',    is_activable: false,  locked:  (state) => !state.epoch_1, cost: {'point': 25}, text: 'frigate shipyard', onClick: (state) => { return buy(state, 'frigate_shipyard'); }},
    'destroyer_shipyard': {name: 'destroyer shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_2, cost: {'point': 50}, text: 'destroyer shipyard', onClick: (state) => { return buy(state, 'destroyer_shipyard'); }},
    'cruiser_shipyard': {name: 'cruiser shipyard',  build_on: 'any',    is_activable: false,  locked:  (state) => !state.epoch_3, cost: {'point': 100}, text: 'cruiser shipyard', onClick: (state) => { return buy(state, 'cruiser_shipyard'); }},
'dreadnought_shipyard': {name: 'dreadnought shipyard', build_on: 'any', is_activable: false,  locked:  (state) => !state.epoch_3, cost: {'point': 100}, text: 'dreadnought shipyard', onClick: (state) => { return buy(state, 'dreadnought_shipyard'); }},
'battlecruiser_shipyard': {name: 'battlecruiser shipyard',build_on: 'any',is_activable: false,locked:  (state) => !state.epoch_4, cost: {'point': 200}, text: 'battlecruiser shipyard', onClick: (state) => { return buy(state, 'battlecruiser_shipyard'); }},
   'battleship_shipyard': {name: 'battleship shipyard', build_on: 'any', is_activable: false, locked:  (state) => !state.epoch_4, cost: {'point': 200}, text: 'battleship shipyard', onClick: (state) => { return buy(state, 'battleship_shipyard'); }},
    'carrier_shipyard': {name: 'carrier shipyard',  build_on: 'any',    is_activable: false,  locked:  (state) => !state.epoch_4, cost: {'point': 200}, text: 'carrier shipyard', onClick: (state) => { return buy(state, 'carrier_shipyard'); }},
    'titan_shipyard': {name: 'titan shipyard',      build_on: 'any',    is_activable: false,  locked:  (state) => !state.epoch_5, cost: {'point': 400}, text: 'titan shipyard', onClick: (state) => { return buy(state, 'titan_shipyard'); }},
*/

};


