
import {obtain} from '../core/bdcgin';

export const research = {
    epoch_1: {name: '1 epoch', build_on: 'any', isLocked: (state) => false,               isDisabled: (state) => state.tech.epoch_1, cost: {'point': 25}, text: 'epoch_1', onClick: (state) => obtain(state, 'epoch_1')},
    epoch_2: {name: '2 epoch', build_on: 'any', isLocked: (state) => !state.tech.epoch_1, isDisabled: (state) => state.tech.epoch_2, cost: {'point': 100}, text: 'epoch_2', onClick: (state) => obtain(state, 'epoch_2')},
    epoch_3: {name: '3 epoch', build_on: 'any', isLocked: (state) => !state.tech.epoch_2, isDisabled: (state) => state.tech.epoch_3, cost: {'point': 250}, text: 'epoch_3', onClick: (state) => obtain(state, 'epoch_3')},
    epoch_4: {name: '4 epoch', build_on: 'any', isLocked: (state) => !state.tech.epoch_3, isDisabled: (state) => state.tech.epoch_4, cost: {'point': 1000}, text: 'epoch_4', onClick: (state) => obtain(state, 'epoch_4')},
    epoch_5: {name: '5 epoch', build_on: 'any', isLocked: (state) => !state.tech.epoch_4, isDisabled: (state) => state.tech.epoch_5, cost: {'point': 2500}, text: 'epoch_5', onClick: (state) => obtain(state, 'epoch_5')},
};
