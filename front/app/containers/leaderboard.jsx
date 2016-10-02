import { connect } from 'react-redux';

import Rankings from '../components/rankings.jsx';
import {selectRank} from '../actions/ranking';

const mapStateToProps = (state) => {
    return {
        rankings: state.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRankClick: (i) => {
            dispatch(selectRank(i))
        }
    }
};

const Leaderboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(Rankings);

export default Leaderboard
