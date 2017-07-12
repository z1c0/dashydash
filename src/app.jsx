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
    <div className="home">
      <a href="/"><i className="fa fa-home"></i></a>
    </div>
    <div id="datetime">
      <span className="time">AA:BB</span>
      <span className="seconds">XY</span>
    </div>    
  </div>,
  document.getElementById('app'));

