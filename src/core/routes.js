import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import Main from 'core/main';
import Projects from 'projects';
// import Contact from 'core/contact';

export default () => (
  <Router>
    <Route path="/" component={Main}>
      <Route exact path="projects" component={Projects} />
      {/*<Route exact path="contact" component={Contact} /> */}
    </Route>
  </Router>
);
