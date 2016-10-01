import { connect } from 'react-redux';

import Rankings from '../components/rankings.jsx';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        rankings: state.items
    }
};

const Leaderboard = connect(
    mapStateToProps
)(Rankings);

export default Leaderboard
