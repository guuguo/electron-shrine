/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import ShrinePage from './containers/ShrinePage';
import DetailPage from './containers/DetailPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path="/shrine" component={ShrinePage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/detail/:category/:id" component={DetailPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
