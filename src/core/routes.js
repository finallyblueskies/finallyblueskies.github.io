import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import Main from 'core/main';

export default () => (
  <Router>
    <Route component={Main}>
      <Route exact path="/" />
    </Route>
  </Router>
);
