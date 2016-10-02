import {RECEIVE_RANKING, REQUEST_RANKING, SELECT_RANK} from '../actions/ranking';

const initialState = {
    isFetching: false,
    items: [],
    lastUpdate: null,
    selectedRankIndex: 0
};

function ranking(state = initialState, action) {
    switch (action.type) {
        case REQUEST_RANKING:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_RANKING:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.rankings,
                lastUpdate: action.receivedAt
            });
        case SELECT_RANK:
            return Object.assign({}, state, {
                selectedRankIndex: action.index
            });
        default:
            return state;
    }
}

export default ranking;