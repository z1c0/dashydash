"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var RouterDOM = require('react-router-dom');
var Router = RouterDOM.HashRouter;
var Route = RouterDOM.Route;

var routes = require('./routes.jsx');

ReactDOM.render(
  <div>
    <Router>{routes}</Router>
  </div>,
  document.getElementById('app'));

