import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadCSS } from 'fg-loadcss';

import reducer from './reducer';
import App from './component/App';
import * as serviceWorker from './serviceWorker';

/* Load Roboto Font from Google CDN */
loadCSS('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

/* Font Awesome */
loadCSS('https://use.fontawesome.com/releases/v5.9.0/css/all.css');

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
