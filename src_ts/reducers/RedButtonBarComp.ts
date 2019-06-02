import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';



const { exec } = require('child_process');



const BUTTON_BAR_BUTTON_PRESSED = "BUTTON_BAR_BUTTON_PRESSED";
/**
 * Single file mode: Via drag and drop
 */
const DRAG_AND_DROP: string = 'DRAG_AND_DROP_MODE';
/**
 * Multi file mode: left selected file and right selected file
 */
const START_WITH_RIGHT_LEFT_SELECTED: string = 'START_WITH_RIGHT_LEFT_SELECTED';

interface AppButtonData extends ButtonData {
    mode: string; // Mode of button, DRAG_AND_DROP or START_WITH_RIGHT_LEFT_SELECTED
    cwd: string; // Current working directory
    command: string; // Command
}

interface ActionButtonData extends ButtonData {
    action: string; // Current working directory

}

interface ButtonData {
    icon: string;
    title: string;

}

interface ButtonBarData {
    buttons: ButtonData[];
}

interface ActionButtonPress extends Action {
    btnNr: number;
    params: string[];
}



class RedButtonBarComp extends AbstractReducer {
    constructor() {
        super();
    }
    reducer(state: State, action: Action): State {

        switch (action.type) {
            case BUTTON_BAR_BUTTON_PRESSED:
                {
                    var actionElementClicked = action as ActionButtonPress;
                    state.action = actionElementClicked.type;

                    var button = state.buttonBarData.buttons[actionElementClicked.btnNr] as AppButtonData;

                    var command = button.command;
                    var workDir = button.cwd;
                    var parameters = actionElementClicked.params;

                    for (var parameter of parameters) {
                        command = command + " " + parameter;
                    }




                    exec(command, (err, stdout, stderr) => {
                        console.log(err);
                        console.log(stdout);
                        console.log(stderr);
                    });

                    return state;
                }

            default: return state;
        }


    }

    handleButton(i: number, parameters: string) {

        var button = this._store.getState().buttonBarData.buttons[i] as AppButtonData;
        switch (button.mode) {
            case DRAG_AND_DROP:
                if (parameters.length > 0) {
                    var obj = JSON.parse(parameters) as Array<string>;

                    const action: ActionButtonPress = {
                        type: BUTTON_BAR_BUTTON_PRESSED,
                        btnNr: i,
                        params: obj
                    }
                    this._store.dispatch(action);
                }
                break;
            case START_WITH_RIGHT_LEFT_SELECTED:
                var leftPath = this._store.getState().leftDirTree.getCurrentPath();
                var rightPath = this._store.getState().rightDirTree.getCurrentPath();

                const action: ActionButtonPress = {
                    type: BUTTON_BAR_BUTTON_PRESSED,
                    btnNr: i,
                    params: [leftPath, rightPath]
                }
                this._store.dispatch(action);

                break;
            default:
                break;
        }






    }


}

export { RedButtonBarComp, ButtonBarData, ButtonData, AppButtonData, DRAG_AND_DROP, START_WITH_RIGHT_LEFT_SELECTED };