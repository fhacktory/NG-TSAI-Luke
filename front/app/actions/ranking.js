export const REQUEST_RANKING = 'REQUEST_RANKING';
export const RECEIVE_RANKING = 'RECEIVE_RANKING';

export function requestRanking() {
    return {
        type: REQUEST_RANKING
    }
}

export function receiveRanking(data) {
    return {
        type: RECEIVE_RANKING,
        rankings: data.map(rank => rank),
        receivedAt: Date.now()
    }
}

/*--------------------------------------------------*\
    # ASYNC
\*--------------------------------------------------*/

export function fetchRankings() {
    return function (dispatch) {
        dispatch(requestRanking());

        return fetch('http://localhost:3000/all')
            .then(response => response.json())
            .then(json => dispatch(receiveRanking(json)));
    }
}