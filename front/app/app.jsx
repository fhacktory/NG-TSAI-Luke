import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Leaderboard from './containers/leaderboard.jsx';

export const App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <Leaderboard />
            </MuiThemeProvider>
        );
    }
});
