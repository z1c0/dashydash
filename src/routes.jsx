"use strict";

var React = require('react');
var RouterDOM = require('react-router-dom');
var Route = RouterDOM.Route;
var Switch = RouterDOM.Switch;

var Home = require('./components/home.jsx');
var Board = require('./components/board/board.jsx');
var NotFound = require('./components/404.jsx');


var routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/board/:boardId" component={Board} />
    <Route component={NotFound} />
  </Switch>
)

module.exports = routes;