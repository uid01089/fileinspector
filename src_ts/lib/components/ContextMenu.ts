//import { LitElement, html } from '@polymer/lit-element';
import { Component } from '../Component';

interface ContextEventResult {
    ident: string,
    command: string
}

class ContextMenu extends Component {


    static menuPresent: boolean = false;
    menuElements: Set<string>;

    constructor() {
        super();



    }

    connectedCallback() {
        super.connectedCallback();

        let parent = this.parentElement;
        let elementId = this.getAttribute('elementid');
        let type = this.getAttribute('type');
        let ident = this.getAttribute('ident');

        let targetElement = parent.querySelector('#' + elementId);




        // Hide in case of ESC-Key
        document.addEventListener("keydown", (ev) => {
            if (ev.keyCode === 27) {
                this.toggleMenuOff();
            }
        }, false);

        document.addEventListener('click', (ev) => {
            this.toggleMenuOff();
        });


        targetElement.addEventListener(type, (ev) => {

            this.toggleMenuOn();
            this.positionMenu(ev as MouseEvent);
        });




    }



    registerCallBack() {
        var identValue = this.getAttribute('ident');
        this.menuElements.forEach((menuElementId) => {
            var element = this.shadowRoot.getElementById(menuElementId);
            element.addEventListener('click', (ev) => {
                this.dispatchEvent(new CustomEvent<ContextEventResult>('valueSelected', { detail: { ident: identValue, command: menuElementId } }));
            });

        });
    }

    getHTML() {

        var htmlString = "";
        var menuString = this.getAttribute('menu-entries');
        var parameters = JSON.parse(decodeURI(menuString));

        this.menuElements = new Set();

        for (var menu in parameters) {
            this.menuElements.add(parameters[menu]);
            htmlString = htmlString.concat(Component.html`
            <p class="context-menu__item" id="${parameters[menu]}">${menu}</p>
            `);
        }



        return Component.html` 
        <style>
            .context-menu {
            display: none;
            position: absolute;
            z-index: 10;
            padding: 5px 0;
            width: 240px;
            background-color: #fff;
            border: solid 1px #dfdfdf;
            box-shadow: 1px 1px 2px #cfcfcf;
            }

            .context-menu--active {
            display: block;
            }



            .context-menu__item {
            display: block;
            padding: 4px 12px;
            color: black;
            margin-bottom: 4px;
            font-size: 16px;
            text-align: left;
            text-decoration: none;
            text-indent: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: normal;
            line-height: 1.0;            
            }

            .context-menu__item:last-child {
            margin-bottom: 0;
            }


            .context-menu__item:hover {
            
            background-color: rgba(0,0,0,0.5);
            }

        </style>
        <div id="context-menu" class="context-menu">
            ${htmlString}    
        </div>

        `;
    }

    positionMenu(e: MouseEvent) {
        var clickCoords = this.getPosition(e);
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;
        var menu = this.shadowRoot.querySelector("#context-menu") as HTMLScriptElement;

        var menuWidth = menu.offsetWidth + 4;
        var menuHeight = menu.offsetHeight + 4;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + "px";
        } else {
            menu.style.left = clickCoordsX + "px";
        }

        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + "px";
        } else {
            menu.style.top = clickCoordsY + "px";
        }
    }

    getPosition(e: MouseEvent) {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event as MouseEvent;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    toggleMenuOn() {
        var menu = this.shadowRoot.querySelector("#context-menu") as HTMLScriptElement;

        if (!ContextMenu.menuPresent) {
            ContextMenu.menuPresent = true;
            menu.classList.add("context-menu--active");
        }
    }


    toggleMenuOff() {
        var menu = this.shadowRoot.querySelector("#context-menu") as HTMLScriptElement;
        ContextMenu.menuPresent = false;
        menu.classList.remove("context-menu--active");
    }






}
window.customElements.define('context-menu', ContextMenu);

export { ContextMenu, ContextEventResult };

