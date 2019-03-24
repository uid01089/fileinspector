//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../lib/Component';
import { CSS } from '../Css';
import { RedButtonBarComp } from '../reducers/RedButtonBarComp';
import { reduxStoreInstance, State } from '../ReduxStore';




class ButtonBarComp extends Component {
    _reducer: any;
    reduxListener: void;
    reduxListenerUnsubsribe: Function;


    constructor() {
        super();

        this._reducer = new RedButtonBarComp();
        reduxStoreInstance.registerReducer(this._reducer);
        this.reduxListenerUnsubsribe = reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));

    }

    connectedCallback() {
        super.connectedCallback();


    }

    registerCallBack() {

        var state = reduxStoreInstance.getState();
        var buttonConfig = state.buttonBarData;

        var i = 0;

        buttonConfig.buttons.forEach(button => {

            const y = i;

            var button1 = this.shadowRoot.getElementById("" + i);
            button1.addEventListener("click", (ev) => {

                this._reducer.handleButton(y, "");

            });


            // This event is fired continuously when an element or text selection is being dragged and the 
            // mouse pointer is over a valid drop target(every 50 ms WHEN mouse is not moving ELSE much faster 
            // between 5 ms(slow movement) and 1ms(fast movement) approximately.This firing pattern is different than mouseover).
            button1.addEventListener("dragover", (ev) => {
                let element = ev.target as HTMLScriptElement;
                (ev as DragEvent).dataTransfer.dropEffect = 'move';

                if (ev.preventDefault) {
                    ev.preventDefault(); // Necessary. Allows us to drop.
                }

                return false;
            });


            //This event is fired when an element or text selection is dropped on a valid drop target.
            button1.addEventListener("drop", (ev) => {
                if (ev.stopPropagation) {
                    ev.stopPropagation(); // stops the browser from redirecting.
                }

                let element = ev.target as HTMLScriptElement;

                var type = "resourceurls";

                var data = (ev as DragEvent).dataTransfer.getData(type);

                var fileList = (ev as DragEvent).dataTransfer.files;

                this._reducer.handleButton(y, data);



            });

            // Increment counter
            i++;

        });




    }

    getHTML() {

        var state = reduxStoreInstance.getState();
        var buttonConfig = state.buttonBarData;

        var i = 0;
        var buttonString: string = "";
        buttonConfig.buttons.forEach(button => {
            buttonString = buttonString.concat(Component.html`
            <button id="${"" + i}">${button.title}</button>
            `);

            // Increment counter
            i++;
        });

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

        if (!this.isConnected) {
            this.reduxListenerUnsubsribe();
        }

        var state: State = storeInstance.getState();

    }




}
window.customElements.define('buttonbar-view', ButtonBarComp);

export { ButtonBarComp };

