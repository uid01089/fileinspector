//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../Component';



class EmptyElement extends Component {


    constructor() {
        super();

    }

    connectedCallback() {
        console.log('Context Menu.');

    }

    getHTML() {

        return Component.html` 
        <style>
        </style>
        <div></div>

        `;
    }




}
window.customElements.define('context-menu', EmptyElement);

export { EmptyElement };

