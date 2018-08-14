
import {ships, getShip} from '../game/ships';
import {isBuilt} from '../core/bdcgin';
//import _ from 'lodash';

export const shipyard = {
    //  cruiser2:      {cost: {point: ships.cruiser2.cost * 10}, name: "cruiser2",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('cruiser2', {player: state.player_name, color: state.player_color})); return state; },
    //      text: "Темная лошадка",
    //      text2: "Необычный конфиг."},
    /*
    merkulov:      {cost: {point: ships.merkulov.cost * 10}, name: "merkulov",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('merkulov', {player: state.player_name, color: state.player_color})); return state; },
        text: "Темная лошадка",
        text2: "Необычный конфиг."},
    roilegan:      {cost: {point: ships.roilegan.cost * 10}, name: "roilegan",    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('roilegan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Темная лошадка",
        text2: "Необычный конфиг."},
        */
    satellite:        {cost: {point: ships.satellite.cost * 10}, name: "satellite", isLocked:  (state) => !isBuilt(state, 'xs_shipyard'),
        onClick: (state) => {
            console.log(state.in_battle_fleets, getShip('satellite', {player: state.player_name, color: state.player_color}));

            state.in_battle_fleets[state.player_name].ships.push(getShip('satellite', {player: state.player_name, color: state.player_color}));
            return state;
        },
        text: "Солнечные спуткики вырабатываю 1 point каждый раунд, но не больше 10 в раунд все вместе.",
        text2: "Легкая цель для медленных кораблей с высоким уроном."},
    frigate:        {cost: {point: ships.frigate.cost * 10}, name: "frigate", isLocked:  (state) => !isBuilt(state, 'xs_shipyard'),        onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('frigate', {player: state.player_name, color: state.player_color})); return state; },
        text: "Скоростные фрегаты - отличные перехватчики и корабли поддержки.",
        text2: "Очень высокая скорость, очень высокие повреждения."},
    destroyer:        {cost: {point: ships.destroyer.cost * 10}, name: "destroyer", isLocked:  (state) => !isBuilt(state, 's_shipyard'),        onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('destroyer', {player: state.player_name, color: state.player_color})); return state; },
        text: "Хрупкие, разрушительные и маневренные, дестроеры ускоряют любой бой.",
        text2: "Высокая скорость, очень высокие повреждения, скорострельный огонь."},
    cruiser:      {cost: {point: ships.cruiser.cost * 10}, name: "cruiser", isLocked:  (state) => !isBuilt(state, 'm_shipyard'),    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('cruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "Сбалансированный военный корабль, готовый к любой ситуации.",
        text2: "Тяжелая броня, высокая скорость, высокие повреждения, скорострельный огонь."},
    dreadnought:  {cost: {point: ships.dreadnought.cost * 10}, name: "dreadnought", isLocked:  (state) => !isBuilt(state, 'm_shipyard'),  onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('dreadnought', {player: state.player_name, color: state.player_color})); return state; },
        text: "Неповоротливый тяжело-бронированный корабль для позиционной войны.",
        text2: "Большой размер, очень тяжелая броня, большие пушки."},
    battlecruiser:    {cost: {point: ships.battlecruiser.cost * 10}, name: "battlecruiser", isLocked:  (state) => !isBuilt(state, 'l_shipyard'),    onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('battlecruiser', {player: state.player_name, color: state.player_color})); return state; },
        text: "Тяжелый перехватчик для охоты на бронированные флоты. ",
        text2: "Тяжелая броня, высокая скорость, высокие повреждения, большие пушки."},
    battleship:     {cost: {point: ships.battleship.cost * 10}, name: "battleship", isLocked:  (state) => !isBuilt(state, 'l_shipyard'),     onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('battleship', {player: state.player_name, color: state.player_color})); return state; },
        text: "Венец военной техники, усыпанный пушками и броней.",
        text2: "Очень большой размер, очень тяжелая броня."},
    carrier:    {cost: {point: ships.carrier.cost * 10}, name: "carrier",isLocked:  (state) => !isBuilt(state, 'l_shipyard'),     onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('carrier', {player: state.player_name, color: state.player_color})); return state; },
        text: "Платформа-носитель, с которой взлетает шесть фрегатов.",
        text2: "Очень большой размер, высокие повреждения и скорострельный огонь."},
    titan:          {cost: {point: ships.titan.cost * 10}, name: "titan", isLocked:  (state) => !isBuilt(state, 'xl_shipyard'),          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('titan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Огромная боевая станция, уничтожитель крупных бронированных кораблей.",
        text2: "Очень большой размер, очень большие пушки."},


    /*
    transport:         {cost: {point: ships.transport.cost * 10}, name: "Transport",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('transport', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Civil Transport."},
    miner:         {cost: {point: ships.miner.cost * 10}, name: "Miner",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('miner', {player: state.player_name, color: state.player_color})); return state; },
        text: "Small Miner."},
    freighter:         {cost: {point: ships.freighter.cost * 10}, name: "Freighter",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('freighter', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Civil Transport."},
    exhumer:         {cost: {point: ships.exhumer.cost * 10}, name: "Exhumer",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('exhumer', {player: state.player_name, color: state.player_color})); return state; },
        text: "Big Miner"},
    colonisator:         {cost: {point: ships.colonisator.cost * 10}, name: "Colonisator",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('colonisator', {player: state.player_name, color: state.player_color})); return state; },
        text: "Planet Colonisator."},
    caravan:         {cost: {point: ships.caravan.cost * 10}, name: "Caravan",          onClick: (state) => { state.in_battle_fleets[state.player_name].ships.push(getShip('caravan', {player: state.player_name, color: state.player_color})); return state; },
        text: "Interstellar Caravan."},
        */


};