import React from 'react';
import {List} from 'material-ui/List';

import Rank from './rank.jsx';

const style = {
    maxWidth: 300
};

const RankingList = ({rankings, onRankClick}) => (
    <List style={style}>
        {rankings.map((rank, i) =>
            <Rank key={rank._id}
                  rank={rank}
                  index={i}
                  onClick={() => onRankClick(i)}
            />
        )}
    </List>
);

export default RankingList;