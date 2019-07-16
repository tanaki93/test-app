import React, { Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router";
import store, {history} from "./store";
import Cart from './containers/cart'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
                <Fragment>

                    <Switch>
                        <Route exact path='/' component={Cart}/>
                    </Switch>

                </Fragment>
        </Router>
    </Provider>, document.getElementById('root')
);
