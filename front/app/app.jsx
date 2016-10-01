import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Leaderboard from './containers/leaderboard.jsx';

export const App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Suzette"
                    />
                    <Leaderboard />
                </div>
            </MuiThemeProvider>
        );
    }
});
