import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';
import { FileTree } from '../lib/FileTree.js';

const SET_TRAIL = "SET_TRAIL";

interface ActionSetTrail extends Action {
    trail: string,
    id: string
}

class RedNaviComp extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, actionIn: Action): State {

        switch (actionIn.type) {
            case SET_TRAIL:
                {
                    var actionElementClicked = actionIn as ActionSetTrail;
                    state.action = actionElementClicked.type;
                    var tree = state[actionElementClicked.id] as FileTree;
                    tree.setTrail(actionElementClicked.trail);
                    return state;
                }

            default: return state;
        }
    }

    setTrail(trail: string, id: string): any {
        const action: ActionSetTrail = {
            type: SET_TRAIL,
            id: id,
            trail: trail
        }
        this._store.dispatch(action);
    }
}
export { RedNaviComp, SET_TRAIL };