//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../lib/Component';
import { CSS } from '../Css';
import { RedButtonBarComp } from '../reducers/RedButtonBarComp';
import { reduxStoreInstance, State } from '../ReduxStore';




class ButtonBarComp extends Component {
    _reducer: any;


    constructor() {
        super();

        this._reducer = new RedButtonBarComp();
        reduxStoreInstance.registerReducer(this._reducer);
        reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));

    }

    connectedCallback() {
        super.connectedCallback();

        console.log('Context Menu.');

    }

    getHTML() {

        var buttonString: string = "";
        buttonString = buttonString.concat(Component.html`
            <button id="xxx">Button1</button>
        `);
        buttonString = buttonString.concat(Component.html`
            <button id="xxxx">Button2</button>
        `);
        return Component.html` 
            
            ${CSS}
            
            
            <style>

            </style>

 
            <div class="btn-group-horizontal">
            ${buttonString}
            </div>

        `;
    }

    reduxtrigger(storeInstance) {

        var state: State = storeInstance.getState();

    }




}
window.customElements.define('buttonbar-view', ButtonBarComp);

export { ButtonBarComp };

