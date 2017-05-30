// Bulma and other core CSS
// import '/src/core/variables.scss';
import 'bulma';
import 'core/style.scss';

// App entry
import ReactDOM from 'react-dom';
import React from 'react';
import Routes from 'core/routes';

ReactDOM.render(<Routes />, document.getElementsByTagName('main')[0]);
