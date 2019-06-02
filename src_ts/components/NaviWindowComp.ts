//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../lib/Component';
import { CSS } from '../Css';
import { reduxStoreInstance, State } from '../ReduxStore';
import { RedNaviWindowComp, } from '../reducers/RedNaviWindowComp';
import { ELEMENT_CLICKED } from '../reducers/RedFileTree';
import { SET_TRAIL } from '../reducers/RedNaviComp';

import './FileTreeComp';
import "./NaviComp";



class NaviWindowComp extends Component {
    _reducer: RedNaviWindowComp;
    reduxListenerUnsubsribe: Function;

    constructor() {
        super();

        this._reducer = new RedNaviWindowComp();
        reduxStoreInstance.registerReducer(this._reducer);
        this.reduxListenerUnsubsribe = reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));


        this.id = this.getAttribute('id');

    }

    connectedCallback() {
        super.connectedCallback();
        console.log('Context Menu.');

    }

    getHTML() {

        return Component.html` 
        ${CSS}

        <style>
            #navi-view-section{
                padding: 5px;
                 display: block;
            }
            
            #file-tree-section{
                padding: 5px;
                display: block;
                overflow: auto;
                height: 60vh;
            }

        </style>
         <div id="navi-view-section">
               <navi-view  id="${this.id}"></navi-view>
         </div> 
        <div id="file-tree-section">
            <file-tree class="file-tree" id="${this.id}"></file-tree>
        </div>
        `;
    }

    reduxtrigger(storeInstance) {

        if (!this.isConnected) {
            this.reduxListenerUnsubsribe();
            return;
        }

        var state: State = storeInstance.getState();

        switch (state.action) {
            case ELEMENT_CLICKED:
            case SET_TRAIL:
                this.update();
                break;
            default:
        }


    }




}
window.customElements.define('navi-window_comp', NaviWindowComp);

export { NaviWindowComp };

