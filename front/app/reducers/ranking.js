import {RECEIVE_RANKING, REQUEST_RANKING} from '../actions/ranking';

const initialState = {
    isFetching: false,
    items: [],
    lastUpdate: null
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
        default:
            return state;
    }
}

export default ranking;