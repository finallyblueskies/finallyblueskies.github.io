import React from 'react';
import Nav from 'nav';

export default props => (
  <div>
    <Nav />
    {props.children}
    {/*<Footer />*/}
  </div>
);
