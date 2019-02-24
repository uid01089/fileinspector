

import { Component } from '../lib/Component';
import { CSS } from '../Css';
import './FileTreeComp';
import "./NaviComp";




class P3ElectronApp extends Component {


  constructor() {
    super();


  }

  connectedCallback() {
    console.log('P3ElectronApp added to page.');

  }

  getHTML() {

    return Component.html` 
        ${CSS}
        
       <style>
           
            .menuarea {
              grid-area: menu; 
              
            }
            .leftarea { 
                grid-area: left; 
                overflow: auto;
                
                }
            .rightarea { 
                grid-area: right; 
                overflow: auto;
                }
            .terminalarea{
              grid-area: terminal; 
            }


            .grid-container-main {
                display: grid;
                grid-template-areas:
                    'menu  menu'
                    'left right'
                    'left right'
                    'left right'
                    'left right'
                    'left right'
                    'left right'
                    'left right'
                    'terminal terminal'
                    'terminal terminal'
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
            </div>
             
            <div class="leftarea">
               <navi-view id="leftDirTree"></navi-view>
               <file-tree id="leftDirTree"></file-tree>
            </div>

            <div class="rightarea">
               <navi-view id="rightDirTree"></navi-view>
               <file-tree id="rightDirTree"></file-tree>
            </div>
            
            <div class="terminalarea">
            </div>
            
        </div>
 
    `;
  }
}

window.customElements.define('p3-electron-app', P3ElectronApp);
