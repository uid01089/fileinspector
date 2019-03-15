import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State, LEFTDIRTREE, RIGHTDIRTREE } from '../ReduxStore';
import { FileTree } from '../lib/FileTree.js';

const TAB_PRESSED = "TAB_PRESSED";


interface ActionKeyPressed extends Action {
    keyCode: number
}

class RedP3ElectronApp extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        switch (action.type) {

            case TAB_PRESSED:
                {
                    var actionKeyPressed = action as ActionKeyPressed;

                    var fileTree = state[state.activeWindow] as FileTree;
                    switch (actionKeyPressed.keyCode) {

                        case 9:
                            state.action = action.type;

                            if (state.activeWindow === LEFTDIRTREE) {
                                state.activeWindow = RIGHTDIRTREE;
                            } else {
                                state.activeWindow = LEFTDIRTREE;
                            }
                            break;


                    }

                    return state;
                }
            default: return state;
        }
    }

    boundActionKeyPressed(keyCode: number, ): any {
        const action: ActionKeyPressed = {
            type: TAB_PRESSED,
            keyCode: keyCode
        }

        switch (keyCode) {

            case 9:
                this._store.dispatch(action);

        }
    }
}

export { RedP3ElectronApp, TAB_PRESSED };