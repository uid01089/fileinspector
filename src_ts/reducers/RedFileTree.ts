import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';


const ELEMENT_CLICKED = "ELEMENT_CLICKED";
const DIR_DBLCLICKED = "DIR_DBLCLICKED";
const FILE_DBLCLICKED = "FILE_DBLCLICKED";


interface ActionElementClicked extends Action {
    trail: string
    id: string
}

interface ActionFileDblClicked extends Action {
    trail: string
    id: string
}

interface ActionDirDblClicked extends Action {
    trail: string
    id: string
}

class RedFileTree extends AbstractReducer {

    constructor() {
        super();
    }
    reducer(state: State, action: ActionElementClicked): State {
        switch (action.type) {
            case ELEMENT_CLICKED:
                {
                    state.action = action.type;
                    var tree = state[action.id];
                    tree.clicked(action.trail);
                    return state;
                }
            default: return state;
        }
    }

    boundActionElementClicked(trail: string, id: string) {
        const action: ActionElementClicked = {
            type: ELEMENT_CLICKED,
            id: id,
            trail: trail
        }
        this._store.dispatch(action);
    }

    boundActionFileDblClicked(trail: string, id: string): any {
        const action: ActionFileDblClicked = {
            type: FILE_DBLCLICKED,
            id: id,
            trail: trail
        }
        this._store.dispatch(action);
    }
    boundActionDirDblClicked(trail: string, id: string): any {
        const action: ActionDirDblClicked = {
            type: DIR_DBLCLICKED,
            id: id,
            trail: trail
        }
        this._store.dispatch(action);
    }
}



export { RedFileTree, ELEMENT_CLICKED, DIR_DBLCLICKED, FILE_DBLCLICKED };