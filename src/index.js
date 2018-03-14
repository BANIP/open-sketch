import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import 'index.css';
import modules from 'modules';
import Root from 'client/Root';

const logger = createLogger();
const store = createStore(modules, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("root")
) 
