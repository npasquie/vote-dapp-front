import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import { Provider } from 'react-redux';
import store from './redux/store';

import VoteDapp from "./components/VoteDapp"

ReactDOM.render(
    <Provider store={store}>
        <VoteDapp />
    </Provider>
    , document.getElementById('root')
);
