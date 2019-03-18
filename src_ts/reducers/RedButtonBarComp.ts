import { AbstractReducer } from '../lib/AbstractReducer.js';
import { Action } from 'redux';
import { State } from '../ReduxStore';



const { exec } = require('child_process');



const BUTTON_BAR_BUTTON_PRESSED = "BUTTON_BAR_BUTTON_PRESSED";
interface AppButtonData extends ButtonData {
    cwd: string; // Current working directory
    command: string // Command
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
    btnNr: number,
    params: string[]
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

        var obj = JSON.parse(parameters) as Array<string>;

        const action: ActionButtonPress = {
            type: BUTTON_BAR_BUTTON_PRESSED,
            btnNr: i,
            params: obj
        }
        this._store.dispatch(action);
    }


}

export { RedButtonBarComp, ButtonBarData, ButtonData, AppButtonData };