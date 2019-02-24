//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../lib/Component';
import { CSS } from '../Css';
import { ELEMENT_CLICKED } from '../reducers/RedFileTree';
import { RedNaviComp } from '../reducers/RedNaviComp';
import { reduxStoreInstance, State } from '../ReduxStore';
import { FileTree } from '../lib/FileTree';



class NaviComp extends Component {
    _reducer: any;


    constructor() {
        super();
        this.id = this.getAttribute('id');

        this._reducer = new RedNaviComp();
        reduxStoreInstance.registerReducer(this._reducer);
        reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));

    }

    connectedCallback() {
        super.connectedCallback();

        console.log('Context Menu.');

    }

    getHTML() {

        let tree = reduxStoreInstance.getState()[this.id] as FileTree;

        return Component.html` 
        ${CSS}
        <link rel="stylesheet" href="../../node_modules/font-awesome/css/font-awesome.css">

        <style>
            .backButton { 
            background: url("icons/baseline_arrow_back_ios_black_18dp.png") no-repeat top left; 
            cursor: pointer;
            display: inline-block;
            width: 20px;
            height: 20px;
            grid-area: backBtn; 
            }
            .upButton { 
            background: url("icons/baseline_arrow_upward_black_18dp.png") no-repeat top left; 
            cursor: pointer;
            display: inline-block;
            width: 20px;
            height: 20px;
            grid-area: upBtn; 
            }
            .trail { 
            height: auto;
            width: 50%;
            grid-area: trail; 
            }
            .pattern { 
            height: auto;
            width: max-content;
            grid-area: pattern; 
            }
            .navi-container {

                display: grid;
                grid-template-areas:
                    'backBtn  upBtn trail pattern';            
                float: left; /* Float the buttons side by side */
                height: auto;
                display: flex;
                width: 100%;
            }

        </style>
        <div class="navi-container">
                <button class="backButton"></button>
                <button class="upButton"></button>
                <input type="text" class="trail" value="${tree.getCurrentPath()}">
                <input type="text" class="pattern">
        </div>

        `;
    }

    reduxtrigger(storeInstance) {

        var state: State = storeInstance.getState();
        if (state.action === ELEMENT_CLICKED) {

            this.update();
        }
    }




}
window.customElements.define('navi-view', NaviComp);

export { NaviComp };

