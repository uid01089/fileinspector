import { AbstractReducer } from '../../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../../ReduxStore';


class RedEmptyComponent extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        return state;
    }
}

export { RedEmptyComponent };