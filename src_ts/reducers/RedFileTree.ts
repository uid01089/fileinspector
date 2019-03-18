import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';
import { FileTree } from '../lib/FileTree.js';

const { exec } = require('child_process');


const ELEMENT_CLICKED = "ELEMENT_CLICKED";
const DIR_DBLCLICKED = "DIR_DBLCLICKED";
const FILE_DBLCLICKED = "FILE_DBLCLICKED";

const KEY_PRESSED = "KEY_PRESSED";
const ARROW_PRESSED = "ARROW_PRESSED";


interface ActionElementClicked extends Action {
    trail: string,
    id: string
}

interface ActionFileDblClicked extends Action {
    trail: string,
    id: string
}

interface ActionDirDblClicked extends Action {
    trail: string,
    id: string
}

interface ActionKeyPressed extends Action {
    keyCode: number
    id: string
}



class RedFileTree extends AbstractReducer {


    constructor() {
        super();
    }
    reducer(state: State, actionIn: Action): State {
        switch (actionIn.type) {
            case ELEMENT_CLICKED:
                {
                    var actionElementClicked = actionIn as ActionElementClicked;
                    state.action = actionElementClicked.type;
                    var tree = state[actionElementClicked.id] as FileTree;
                    tree.clicked(actionElementClicked.trail);
                    state.activeWindow = actionElementClicked.id;
                    return state;
                }
            case KEY_PRESSED:
                {
                    var actionKeyPressed = actionIn as ActionKeyPressed;

                    var fileTree = state[actionKeyPressed.id] as FileTree;

                    state.action = ARROW_PRESSED;
                    fileTree.keyPressed(actionKeyPressed.keyCode);

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

    boundActionKeyPressed(keyCode: number, id: string): any {
        const action: ActionKeyPressed = {
            type: KEY_PRESSED,
            id: id,
            keyCode: keyCode
        }

        switch (keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                this._store.dispatch(action);
                break;

        }
    }

    boundActionTerminalHere(trail: string, id: string) {
        var command = "/Applications/Utilities/Terminal.app/Contents/MacOS/Terminal " + trail;
        exec(command, (err, stdout, stderr) => {
            console.log(err);
            console.log(stdout);
            console.log(stderr);
        });
    }


}



export { RedFileTree, ELEMENT_CLICKED, DIR_DBLCLICKED, FILE_DBLCLICKED, ARROW_PRESSED };