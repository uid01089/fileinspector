
import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Action
} from 'redux';

import thunk from 'redux-thunk';
import { AbstractReducer } from './lib/AbstractReducer';
import { FileTree } from './lib/FileTree';
import { ButtonBarData, ButtonData, AppButtonData } from './reducers/RedButtonBarComp';

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

class ReduxStore {

    static instance: ReduxStore;
    _reducers: Map<String, AbstractReducer>;
    store: any;

    constructor() {
        if (!ReduxStore.instance) {
            const self = this;
            this._reducers = new Map();
            this.store = createStore<State, Action, {}, {}>((state: State = initiateState, action: Action) => {
                return this._coreReducer(state, action, self)
            },
                applyMiddleware(thunk));

            ReduxStore.instance = this;
        }

        return ReduxStore.instance;
    }

    registerReducer(reducerInstance: AbstractReducer) {
        var className = reducerInstance.constructor.name;
        if (!this._reducers.has(className)) {
            this._reducers.set(className, reducerInstance);
        }
    }


    dispatch(action) {
        this.store.dispatch(action);
    }

    subscribe(listener) {
        this.store.subscribe(listener);
    }
    getState(): State {
        return this.store.getState();
    }

    _coreReducer(state: State, action: Action, reduxStoreInstance): State {
        var runningState = state;

        reduxStoreInstance._reducers.forEach(reducerClass => {
            runningState = reducerClass.reducer(runningState, action);
        });

        return runningState;
    }

}

const reduxStoreInstance = new ReduxStore();

export { reduxStoreInstance, ReduxStore, State, LEFTDIRTREE, RIGHTDIRTREE };


