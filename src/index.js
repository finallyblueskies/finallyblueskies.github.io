// App entry
import Async from 'helpers/webpack';
import 'bulma';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
const Main = props => (
  <Async load={System.import('main')} componentProps={props} />
);

const App = () => (
  <Router>
    <Route path="/" component={Main} />
  </Router>
);

ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
