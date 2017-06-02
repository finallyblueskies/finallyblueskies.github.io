// Bulma and other core CSS
// import '/src/core/variables.scss';
import 'bulma';
import 'core/style.scss';

// App entry
import ReactDOM from 'react-dom';
import React from 'react';
import Router from 'core/router';

ReactDOM.render(<Router />, document.getElementsByTagName('main')[0]);
