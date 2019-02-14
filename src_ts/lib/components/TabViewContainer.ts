//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../Component';
import { TabView } from './TabView';



class TabViewContainer extends Component {
    selection: string;

    constructor() {
        super();

        this.selection = "";

    }

    connectedCallback() {
        console.log('TabViewContainer added to page.');

        this.shadowRoot.querySelectorAll(".tablinks").forEach((elememt) => {
            const buttonText = elememt.innerHTML;

            elememt.addEventListener("click", (ev) => {
                this.openTab(ev, buttonText);
            });


        });


    }


    getHTML() {

        var buttonHtml: string = "";
        var tabHtml: string = "";

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children.item(i);

            if (child.nodeName == "TAB-VIEW") {
                let childName = child.attributes.getNamedItem("name").nodeValue;  //(<TabView>child).getName().toString();

                buttonHtml = buttonHtml.concat(Component.html`<button class="tablinks">${childName}</button>`);
                const childContent = Component.html`${child.innerHTML}`;
                tabHtml = tabHtml.concat(Component.html`
                    <div id=${childName} class="tabcontent">
                        ${childContent}
                    </div>`);
            }

        }


        return Component.html` 
        <style>
            /* Style the tab */
            .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
            }

            /* Style the buttons inside the tab */
            .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            font-size: 17px;
            }

            /* Change background color of buttons on hover */
            .tab button:hover {
            background-color: #ddd;
            }

            /* Create an active/current tablink class */
            .tab button.active {
            background-color: #ccc;
            }

            /* Style the tab content */
            .tabcontent {
            display: none;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
            overflow: visible;
            }            
        </style>
        <div class="tab">
            ${buttonHtml}
        </div>
        ${tabHtml}
        `;



    }


    openTab(evt, cityName) {

        this.selection = cityName;

        var i, tabcontent, tablinks;
        tabcontent = this.shadowRoot.querySelectorAll(".tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = this.shadowRoot.querySelectorAll(".tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        (<HTMLElement>this.shadowRoot.querySelectorAll("#" + cityName)[0]).style.display = "block";

        evt.currentTarget.className += " active";
    }

}
window.customElements.define('tab-view-container', TabViewContainer);

