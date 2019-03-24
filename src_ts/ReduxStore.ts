
import { FileTree } from './lib/FileTree';
import { ButtonBarData, ButtonData, AppButtonData } from './reducers/RedButtonBarComp';
import { AbstractReduxStore } from './lib/AbstractReduxStore';

const LEFTDIRTREE = 'leftDirTree';
const RIGHTDIRTREE = 'rightDirTree';


const configButtonBar = {
    buttons: [
        {
            cwd: "/Applications/CotEditor.app/Contents/SharedSupport/bin",
            command: "/Applications/CotEditor.app/Contents/SharedSupport/bin/cot",
            icon: "",
            title: "cot"

        } as AppButtonData,
    ]
} as ButtonBarData;



interface State {
    action: string,
    activeWindow: string,
    leftDirTree: FileTree,
    rightDirTree: FileTree,
    buttonBarData: ButtonBarData

}

const initiateState: State = {
    action: null,
    activeWindow: LEFTDIRTREE,
    leftDirTree: new FileTree("/"),
    rightDirTree: new FileTree("/"),
    buttonBarData: configButtonBar

}

class ReduxStore extends AbstractReduxStore<State> {

    static instance: ReduxStore;

    constructor() {

        super();

        if (!ReduxStore.instance) {
            this.initReduxStore(initiateState);
            ReduxStore.instance = this;
        }

        return ReduxStore.instance;
    }


}

const reduxStoreInstance = new ReduxStore();

export { reduxStoreInstance, ReduxStore, State, LEFTDIRTREE, RIGHTDIRTREE };


