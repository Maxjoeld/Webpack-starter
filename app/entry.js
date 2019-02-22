let React = require('react');
let ReactDOM = require("react-dom");
import { Link, Route } from 'react-router-dom';
import App from "./app";
// require("./index.css"); // the style loader lets us use style for this page
//
import "./styles/styles.scss";
//webpack bundles all of our modules together
//a module is "index.js" aka file
// 
 
ReactDOM.render(
    <App />, // takes our App componenet and render
    document.getElementById('app') // it to element that has id of app 
)