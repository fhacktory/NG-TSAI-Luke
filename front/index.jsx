import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import {App} from './app/app.jsx';
import {fetchRankings} from './app/actions/ranking';
import ranking from './app/reducers/ranking';

/*--------------------------------------------------*\
    # Init Store
\*--------------------------------------------------*/
const logger = createLogger();
const store = createStore(
    ranking,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);

store.dispatch(fetchRankings());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);