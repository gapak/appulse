
import {buy} from '../core/bdcgin';

export const research = {
    epoch_1: {name: '1 epoch',   build_on: 'any', locked:  (state) => false,   cost: {'point': 25}, text: 'epoch_1', onClick: (state) => buy(state, 'epoch_1')},
    epoch_2: {name: '2 epoch',   build_on: 'any', locked:  (state) => false,   cost: {'point': 100}, text: 'epoch_2', onClick: (state) => buy(state, 'epoch_2')},
    epoch_3: {name: '3 epoch',   build_on: 'any', locked:  (state) => false,   cost: {'point': 250}, text: 'epoch_3', onClick: (state) => buy(state, 'epoch_3')},
    epoch_4: {name: '4 epoch',   build_on: 'any', locked:  (state) => false,   cost: {'point': 1000}, text: 'epoch_4', onClick: (state) => buy(state, 'epoch_4')},
    epoch_5: {name: '5 epoch',   build_on: 'any', locked:  (state) => false,   cost: {'point': 2500}, text: 'epoch_5', onClick: (state) => buy(state, 'epoch_5')},
};
