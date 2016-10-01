import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Leaderboard} from './components/leaderboard';

export const App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <Leaderboard />
            </MuiThemeProvider>
        );
    }
});
