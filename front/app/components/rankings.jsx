import React from 'react';

import RankingList from './rankingList.jsx';

const Rankings = ({rankings, onRankClick}) => (
    <RankingList rankings={rankings}
                 onRankClick={onRankClick}
    />
);

export default Rankings;
