import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State, LEFTDIRTREE, RIGHTDIRTREE } from '../ReduxStore';
import { FileTree } from '../lib/FileTree.js';

const KEY_PRESSED = "KEY_PRESSED";
const TAB_PRESSED = "TAB_PRESSED";
const ARROW_PRESSED = "ARROW_PRESSED";

interface ActionKeyPressed extends Action {
    keyCode: number
}

class RedP3ElectronApp extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        switch (action.type) {

            case KEY_PRESSED:
                {
                    var actionKeyPressed = action as ActionKeyPressed;

                    var fileTree = state[state.activeWindow] as FileTree;
                    switch (actionKeyPressed.keyCode) {

                        case 9:
                            state.action = TAB_PRESSED;

                            if (state.activeWindow === LEFTDIRTREE) {
                                state.activeWindow = RIGHTDIRTREE;
                            } else {
                                state.activeWindow = LEFTDIRTREE;
                            }
                            break;
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            state.action = ARROW_PRESSED;
                            fileTree.keyPressed(actionKeyPressed.keyCode);
                            break;

                        default:
                            state.action = actionKeyPressed.type;
                    }

                    return state;
                }
            default: return state;
        }
    }

    boundActionKeyPressed(keyCode: number, ): any {
        const action: ActionKeyPressed = {
            type: KEY_PRESSED,
            keyCode: keyCode
        }
        this._store.dispatch(action);
    }
}

export { RedP3ElectronApp, KEY_PRESSED, TAB_PRESSED, ARROW_PRESSED };