
import { Component } from '../lib/Component';
import { CSS } from '../Css';
import { reduxStoreInstance, State } from '../ReduxStore';
import { Directory as FileTreeDir, File as FileTreeFile } from '../lib/FileTree';
import { RedFileTree, ELEMENT_CLICKED, ARROW_PRESSED } from '../reducers/RedFileTree';
import { SET_TRAIL } from '../reducers/RedNaviComp';
import { TAB_PRESSED } from '../reducers/RedP3ElectronApp'



const path = require('path');
const feather = require('feather-icons');


const MIME_TEXT = 'text/plain';
const MIME_BINARY = 'application/octet-stream';
const MIME_UNKNOWN = 'application/unknown';

const DOWNLOADURL = 'DownloadURL';
const RESOURCEURLS = 'ResourceURLs';






class FileTreeComp extends Component {
    _reducer: RedFileTree;


    constructor() {
        super();
        this.id = this.getAttribute('id');

        this._reducer = new RedFileTree();
        reduxStoreInstance.registerReducer(this._reducer);
        reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));


    }

    connectedCallback() {
        console.log('FileTree.');

        super.connectedCallback();



    }

    registerCallBack() {
        var directories = this.shadowRoot.querySelectorAll(".directory");
        var files = this.shadowRoot.querySelectorAll(".file");
        var i;



        for (i = 0; i < directories.length; i++) {
            var directory = directories[i] as HTMLScriptElement;

            if (directory.classList.contains("focused")) {
                directory.focus({ preventScroll: true });
                directory.scrollIntoView(false);
                directory.addEventListener("keydown", (ev) => {
                    this._reducer.boundActionKeyPressed(ev.keyCode, this.id);
                })


            }


            this.addEventListeners(directory);

            directory.addEventListener("dblclick", (ev) => {
                let clickedElement = ev.target as HTMLScriptElement;
                this._reducer.boundActionDirDblClicked(clickedElement.id, this.id);
                ev.preventDefault();
            });


        }

        for (i = 0; i < files.length; i++) {
            var file = files[i] as HTMLScriptElement;

            if (file.classList.contains("focused")) {
                file.focus({ preventScroll: true });
                file.scrollIntoView(false);
                file.addEventListener("keydown", (ev) => {
                    this._reducer.boundActionKeyPressed(ev.keyCode, this.id);
                })


            }

            this.addEventListeners(file);

            file.addEventListener("dblclick", (ev) => {
                let clickedElement = ev.target as HTMLScriptElement;
                this._reducer.boundActionFileDblClicked(clickedElement.id, this.id);
                ev.preventDefault();
            });
        }
    }

    private addEventListeners(element: Element) {



        element.addEventListener("click", (ev) => {
            let clickedElement = ev.target as HTMLScriptElement;
            this._reducer.boundActionElementClicked(clickedElement.id, this.id);
        });



        // This event is fired when the user starts dragging an element or text selection.
        element.addEventListener("dragstart", (ev) => {
            let element = ev.target as HTMLScriptElement;
            element.style.opacity = '0.4';

            var uri = [MIME_BINARY, path.basename(element.id), "file:" + element.id].join(':');

            // Data for dragging it to outside of the browser window
            (ev as DragEvent).dataTransfer.setData(DOWNLOADURL, uri);

            // Data for dragging it within this application
            (ev as DragEvent).dataTransfer.setData(RESOURCEURLS, JSON.stringify([element.id]));

        });

        //This event is fired when an element is no longer the drag operation's immediate selection target.
        element.addEventListener("dragexit", (ev) => {
            let element = ev.target as HTMLScriptElement;

        });

        // This event is fired when an element or text selection is being dragged.
        element.addEventListener("drag", (ev) => {
            let element = ev.target as HTMLScriptElement;

        });

        // This event is fired when a dragged element or text selection enters a valid drop target.
        element.addEventListener("dragenter", (ev) => {
            let element = ev.target as HTMLScriptElement;
            element.classList.add('over');

        });

        // This event is fired when a dragged element or text selection leaves a valid drop target.
        element.addEventListener("dragleave", (ev) => {
            let element = ev.target as HTMLScriptElement;
            element.classList.remove('over');

        });

        // This event is fired continuously when an element or text selection is being dragged and the 
        // mouse pointer is over a valid drop target(every 50 ms WHEN mouse is not moving ELSE much faster 
        // between 5 ms(slow movement) and 1ms(fast movement) approximately.This firing pattern is different than mouseover).
        element.addEventListener("dragover", (ev) => {
            let element = ev.target as HTMLScriptElement;
            (ev as DragEvent).dataTransfer.dropEffect = 'copy';

            if (ev.preventDefault) {
                ev.preventDefault(); // Necessary. Allows us to drop.
            }

            return false;
        });

        //This event is fired when an element or text selection is dropped on a valid drop target.
        element.addEventListener("drop", (ev) => {
            if (ev.stopPropagation) {
                ev.stopPropagation(); // stops the browser from redirecting.
            }

            let element = ev.target as HTMLScriptElement;

            var type = (ev as DragEvent).dataTransfer.types[0];

            var data = (ev as DragEvent).dataTransfer.getData(type);

            var fileList = (ev as DragEvent).dataTransfer.files;

            console.log(fileList);



        });

        // This event is fired when a drag operation is being ended(by releasing a mouse button or hitting the escape key).
        element.addEventListener("dragend", (ev) => {
            let element = ev.currentTarget as HTMLScriptElement;
            element.style.opacity = '1.0';

        });




    }

    getHTML() {

        let treeHtml = this.getTreeHtml(this.id);



        return Component.html` 
        ${CSS}

        <!--link rel="stylesheet" href="../../node_modules/font-awesome/css/font-awesome.css"-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">



        <style>

     

  
            /* Remove default bullets */
            ul, #myUL {
            list-style-type: none;
            }

            /* Remove margins and padding from the parent ul */
            #myUL {
            margin: 0;
            padding: 0;
            }

            /* Style the directory/arrow */
            .file,
            .directory {
            cursor: pointer; 
            user-select: none; /* Prevent text selection */
            }




            .directory:hover,
            .file:hover{
                background-color: #DDDDDD;
            }

            .directory:focus,
            .file:focus,
            .focused{
            border-color: black;
            background-color: #666699;
            }


            .directory:before {
                content: url('icons/baseline_folder_black_18dp.png');
                /*
                font-family: "Font Awesome 5 Free";
                content: "\f095";
                display: inline-block;
                padding-right: 3px;
                vertical-align: middle;
                font-weight:900;
                margin-left: -1.3em; 
                width: 1.3em; 
                */

            }

             .file:before {
                content: url('icons/baseline_description_black_18dp.png');

            }
            .over {
                border: 2px dashed #000;
            }

        </style>

        
        ${treeHtml}
        

        `;
    }

    private getTreeHtml(id: string): string {
        var htmlTree = "";
        htmlTree = htmlTree.concat(Component.html`<ul id="htmlTree" contenteditable="false">`);

        let tree = reduxStoreInstance.getState()[id];
        let root = tree.getRootDir();

        htmlTree = htmlTree.concat(this.getNodeHtml(root));

        htmlTree = htmlTree.concat(Component.html`</ul>`);

        return htmlTree;
    }

    private getNodeHtml(dir: FileTreeDir): string {
        var html = "";

        let classes;
        if (dir.getFocus()) {
            classes = "directory focused";
        } else {
            classes = "directory";
        }



        html = html.concat(Component.html`<li contenteditable="false"><span class="${classes}" draggable="true" id="${dir.getPath()}" contenteditable="true">${dir.getName()}</span>`);
        html = html.concat(Component.html`<ul class="nested">`);

        dir.getSubDirectories().forEach(subDir => {
            html = html.concat(this.getNodeHtml(subDir));
        });


        dir.getFiles().forEach(file => {
            let classes;
            if (file.getFocus()) {
                classes = "file focused";
            } else {
                classes = "file";
            }

            html = html.concat(Component.html`<li contenteditable="false"><span class="${classes}" draggable="true" id="${file.getPath()}" contenteditable="true">${file.getName()}</span></li>`);
        });


        html = html.concat(Component.html`</ul>`);
        html = html.concat(Component.html`</li>`);
        return html;
    }

    reduxtrigger(storeInstance) {

        var state: State = storeInstance.getState();

        if (state.activeWindow === this.id) {

            switch (state.action) {
                case ELEMENT_CLICKED:
                case ARROW_PRESSED:
                case SET_TRAIL:
                case TAB_PRESSED:
                    this.update();
                    break;
                default:
            }
        }

    }
}





window.customElements.define('file-tree', FileTreeComp);

export { FileTreeComp };

