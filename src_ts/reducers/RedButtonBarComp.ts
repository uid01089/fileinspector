import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';


class RedButtonBarComp extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        return state;
    }
}

export { RedButtonBarComp };