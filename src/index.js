import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore, combinedReducers } from 'redux'; // to use combined reducers

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burguerBuilderReducer from './store/reducers/burgerBuilder';

// Eg. of combining reducers
// const rootReducer = combinedReducers({
//     ctr: counterReducer,
//     res: resultReducer
// })
// const store = createStore(rootReducer);

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] Next state', store.getState());
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burguerBuilderReducer, composeEnhancers(applyMiddleware(logger)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
