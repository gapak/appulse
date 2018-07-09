
import _ from 'lodash';

export function isEnough(state, cost) {
    let enough = true;
    _.each(cost, (value, resource_key) => {
        if (state[resource_key] < value) enough = false;
    });
    return enough;
}

export function chargeCost(state, cost) {
    if (!isEnough(state, cost)) return false;
    _.each(cost, (value, resource_key) => {
        state[resource_key] -= value;
    });
    return state;
}


export function buy(state, key) {
    state[key]++;
    return state;
}

export function add(state, building, cost) {
    state[building]++;
    return state;
}

export function convert(state, building, cost1, cost2) {
    state[building]++;
    return state;
}