import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './app/app.jsx';

ReactDOM.render(
    <App url="http://localhost:3000/api"
    />,
    document.getElementById('root')
);