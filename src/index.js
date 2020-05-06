import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import { Provider } from 'react-redux';
import store from './redux/store';
import VoteDapp from "./components/VoteDapp";
import {getWeb3Action} from "./redux/asyncActions";

store.dispatch(getWeb3Action(false));

ReactDOM.render(
    <Provider store={store}>
        <VoteDapp />
    </Provider>
    , document.getElementById('root')
);
