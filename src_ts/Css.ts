import { Component } from './lib/Component'

const CSS = Component.html` 
        <style>
            
            ul,
            ol,
            li,
            body {
                font-size: 16px;
                font-family: Arial, Helvetica, sans-serif;
                text-align: left;
            }

            ul {
                padding-left: 10px;
                
            }

            
             

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
            .btn-group  button {
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
            .btn-group  button:hover {
            background-color: rgba(0,0,0,0.5);
            }          
                .btn-group-horizontal button {
                background-color: #ccc; /* Green background */
                border: none; /* Green border */
                color: black; /* White text */
                padding: 10px 24px; /* Some padding */
                cursor: pointer; /* Pointer/hand icon */
                float: left; /* Float the buttons side by side */
                }

                .btn-group-horizontal button:not(:last-child) {
                border-right: none; /* Prevent double borders */
                }



                /* Add a background color on hover */
                .btn-group-horizontal button:hover {
                background-color: rgba(0,0,0,0.5);
                }
                </style>
        `;

export { CSS };