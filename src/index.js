// App entry
import 'bulma';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import Main from 'main';

const App = () => (
  <Router>
    <Route path="/" component={Main} />
  </Router>
);

ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
