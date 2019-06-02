

import { Component } from '../lib/Component';
import { CSS } from '../Css';
import "./ButtonBarComp";
import "./NaviWindowComp";

import { reduxStoreInstance, State } from '../ReduxStore';
import { RedP3ElectronApp, TAB_PRESSED } from '../reducers/RedP3ElectronApp';






class P3ElectronApp extends Component {
  _reducer: RedP3ElectronApp;
  reduxListenerUnsubsribe: Function;



  constructor() {
    super();

    this._reducer = new RedP3ElectronApp();
    reduxStoreInstance.registerReducer(this._reducer);
    this.reduxListenerUnsubsribe = reduxStoreInstance.subscribe(() => this.reduxtrigger(reduxStoreInstance));

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      let element = event.currentTarget as HTMLScriptElement;
      this._reducer.boundActionKeyPressed(event.keyCode);
      if (event.keyCode == 9) {
        event.preventDefault();
      }
    });

  }

  connectedCallback() {
    console.log('P3ElectronApp added to page.');
    super.connectedCallback();



  }

  registerCallBack() {



    var appState = this._reducer._store.getState();
    var activWindowId = appState.activeWindow;
    var activeWindow = this.shadowRoot.getElementById(activWindowId) as HTMLScriptElement;
    activeWindow.classList.add("focused");
  }

  getHTML() {




    return Component.html` 
        ${CSS}
        
       <style>
           
            .focused{
              box-shadow: 0px 0px 13px 0px black;
            }
            .menuarea {
              grid-area: menu; 
              
              
            }
            .leftWindow { 
                grid-area: left; 
                /*overflow: auto;*/
                height: 70vh;
                
                }
            .rightWindow { 
                grid-area: right; 
                /*overflow: auto;*/
                height: 70vh;
                }
            .terminalarea{
              grid-area: terminal; 
              height: 20vh;
            }


            .grid-container-main {
                display: grid;
                grid-template-areas:
                    'menu  menu'
                    'left right'
                    'terminal terminal'
                    ;
                grid-gap: 5px;
                background-color: #f1f1f1;
                padding: 5px;
                border: 1px solid #ccc;
                height: 100vh;
            }

            .grid-container-main > div {
                background-color: rgba(255, 255, 255, 0.8);
                text-align: center;
                padding: 5px 0;
                font-size: 30px;
            }

        </style>

        <div class="grid-container-main">
            
            <div class="menuarea">
            <buttonbar-view></buttonbar-view>
            </div>
             
            <div class="leftWindow" id="leftDirTree">
               <navi-window_comp id="leftDirTree"></navi-window_comp>
            </div>

            <div class="rightWindow" id="rightDirTree" >
               <navi-window_comp id="rightDirTree"></navi-window_comp>
            </div>
            
            <div class="terminalarea">
            </div>
            
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
      case TAB_PRESSED:
        this.update();
        break;
      default:
    }


  }
}

window.customElements.define('p3-electron-app', P3ElectronApp);
