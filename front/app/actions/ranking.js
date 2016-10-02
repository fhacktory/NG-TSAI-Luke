export const REQUEST_RANKING = 'REQUEST_RANKING';
export const RECEIVE_RANKING = 'RECEIVE_RANKING';
export const SELECT_RANK = 'SELECT_RANK';

export function requestRanking() {
    return {
        type: REQUEST_RANKING
    }
}

export function receiveRanking(data) {
    return {
        type: RECEIVE_RANKING,
        rankings: data.map(rank => rank)
            .sort((rank1, rank2) => rank2.points - rank1.points),
        receivedAt: Date.now()
    }
}

export function selectRank(index) {
    return {
        type: SELECT_RANK,
        index
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