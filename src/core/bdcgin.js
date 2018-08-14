
import _ from 'lodash';
import {buildings} from '../game/buildings';

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

export function gainCost(state, cost) {
    _.each(cost, (value, resource_key) => {
        state[resource_key] += value;
    });
    return state;
}

export function drawCost(cost) {
    let text = '';
    _.each(cost, (value, resource) => {
        if (value > 0) {
            text += resource + ': ' + value + ' ';
        }
    });
    return text;
}


export function obtain(state, key) {
    console.log(state, key, state.tech[key]);
    state.tech[key] = true;
    console.log(state, key, state.tech[key]);
    return state;
}

export function buy(state, key) {
    //console.log(state, key, state.buildings);

    let build = {name: key};

    if (buildings[key].is_activable) build.deactivated = !buildings[key].is_activable;
    if (buildings[key].modes) build.mode = buildings[key].modes[_.keys(buildings[key].modes)[0]].name;

    state.buildings.push(build);

    //console.log(state, key, state.buildings);
    return state;
}

export function add(state, building, cost) {

    return state;
}

export function isBuilt(state, building_name) {
    console.log(state, building_name);

    console.log(_.find(state.buildings, function(building) { return building.name === building_name; }));
    console.log((_.find(state.buildings, function(building) { return building.name === building_name; })));

    return (_.find(state.buildings, function(building) { return building.name === building_name }));
}

export function convert(state, building_id, cost1, cost2) {
    if (isEnough(state, cost1)) {
        chargeCost(state, cost1);
        gainCost(state, cost2);
    }
    else {
        state.buildings[building_id].deactivated = true;
    }
    return state;
}