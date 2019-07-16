import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import apiMiddleWare from './middleware/api';
import rootReducer from './reducers';
export const history = createHistory();

const enhancers = [];

const middleware = [
    thunk,
    routerMiddleware(history),
    apiMiddleWare,
];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    composedEnhancers,
);

export default store;