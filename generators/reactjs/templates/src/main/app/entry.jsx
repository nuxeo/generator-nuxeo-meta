import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Link, Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';

// components
import LogInContainer from './components/log_in/log_in_container.js';
import ErrorsContainer from './components/errors/errors_container.jsx';


import { MainViewContainer } from './components/document_view/document_view_container';

// store
import configureStore from './store/store';
//utils
import NuxeoUtils from './utils/nuxeo_utils';
const store = configureStore();
NuxeoUtils.addStore(store);

let redirectConditions = function (nextState, replace) {
  if (!store.getState().currentUser.id) {
    replace("/");
  }
};

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <ErrorsContainer>
                <Router history={hashHistory}>
                    <Route path="/" component={LogInContainer}/>
                    <Route path="/documents" component={ MainViewContainer } onEnter={ redirectConditions }/>
                </Router>
            </ErrorsContainer>
        </Provider>
    )
};

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});
