/* global document */
import './assets/styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Splash from './components/Splash';
import Dashboard from './components/Dashboard';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="/dashboard" component={Dashboard} />
    </Route>
  </Router>,
  document.getElementById('app')
);
