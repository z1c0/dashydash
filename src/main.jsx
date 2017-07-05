"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var RouterDOM = require('react-router-dom');
var Router = RouterDOM.HashRouter;
var Route = RouterDOM.Route;

var routes = require('./routes.jsx');

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app'));

