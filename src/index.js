import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import { createStore, combinedReducers } from 'redux'; // to use combined reducers

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burguerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    burgerBuilder: burguerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const logger = store => {
    return next => {
        return action => {
            //console.log('[Middleware] Dispatching', action);
            const result = next(action);
            //console.log('[Middleware] Next state', store.getState());
            return result;
        }
    }
}

const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(logger, thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
