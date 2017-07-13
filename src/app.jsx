'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var RouterDOM = require('react-router-dom');
var Router = RouterDOM.HashRouter;
var Route = RouterDOM.Route;
var routes = require('./routes.jsx');
var Overlays = require('./overlays.jsx');

ReactDOM.render(
  <div id="main">
    <Router>{routes}</Router>
    <Overlays/>
  </div>,
  document.getElementById('app'));

