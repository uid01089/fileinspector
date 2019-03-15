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


    }

    registerCallBack() {


        var button1 = this.shadowRoot.getElementById("Button1");
        button1.addEventListener("click", (ev) => {

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

            var type = (ev as DragEvent).dataTransfer.types[0];

            var data = (ev as DragEvent).dataTransfer.getData(type);

            var fileList = (ev as DragEvent).dataTransfer.files;

            console.log(fileList);



        });


    }

    getHTML() {

        var buttonString: string = "";
        buttonString = buttonString.concat(Component.html`
            <button id="Button1">Button1</button>
        `);
        buttonString = buttonString.concat(Component.html`
            <button id="Button2">Button2</button>
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

