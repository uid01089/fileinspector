//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../Component';
import { CSS } from '../../Css';



class EmptyElement extends Component {


    constructor() {
        super();

    }

    connectedCallback() {
        console.log('Context Menu.');

    }

    getHTML() {

        return Component.html` 
        ${CSS}

        <style>
        </style>
        <div></div>

        `;
    }




}
window.customElements.define('context-menu', EmptyElement);

export { EmptyElement };

