import React from 'react';

import RankingList from './rankingList.jsx';
import Details from './details.jsx';

const Rankings = ({rankings, onRankClick, selectedRank}) => (
    <div>
        <RankingList
            rankings={rankings}
            onRankClick={onRankClick}
        />
        <Details
            {...selectedRank}
        />
    </div>
);

export default Rankings;
