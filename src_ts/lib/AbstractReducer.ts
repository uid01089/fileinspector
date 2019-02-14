import { reduxStoreInstance, ReduxStore } from '../ReduxStore';
import { Action } from 'redux';
import { State } from '../ReduxStore';




class AbstractReducer {
    _store: ReduxStore;
    constructor() {
        this._store = reduxStoreInstance;
    }

    reducer(state: State, action: Action): State {
        console.error("reducer not overwritten");
        return state;
    }

    static copyInstance(original) {
        if (typeof original !== 'undefined') {

            var copied = Object.assign(
                Object.create(
                    Object.getPrototypeOf(original)
                ),
                original
            );
        }
        return copied;
    }
}

export { AbstractReducer, Action };