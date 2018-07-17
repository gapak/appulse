
import _ from 'lodash';

import {rules} from './rules';
import {buildings} from './buildings';

export const tick = (state) => {
    //console.log(state);

    _.each(rules, (item) => {
        if (item.onTick) state = item.onTick(state);
    });

    _.each(state.buildings, (item, id) => {
        if (buildings[item.name].onTick) state = buildings[item.name].onTick(state, id);
    });

    return state;
};