import { Component } from './lib/Component'

const CSS = Component.html` 
        <style>
            
            .input{
                background-color: #ccc; 
                border: none;
                color: black;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                width: 100%;               
            }
            .button {
                background-color: #ccc; 
                border: none;
                color: black;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                width: 100%;
            }
            .button:hover {
                background-color: rgba(0,0,0,0.5);
            }  
            .btn-group button {
                background-color: #ccc; 
                border: none;
                color: black;
                padding: 10px 10px;
                text-align: center;
                text-decoration: none;
                display: block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                width: 100%;
            }

            .btn-group button:not(:last-child) {
            border-bottom: none; /* Prevent double borders */
            }

            /* Add a background color on hover */
            .btn-group button:hover {
            background-color: rgba(0,0,0,0.5);
            }          
        </style>
        `;

export { CSS };