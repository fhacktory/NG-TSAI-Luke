import React from 'react';

const Rankings = ({rankings}) => (
    <ul>
        {rankings.map(rank =>
            <li key={rank._id}>
                {rank.username} : {rank.points}
            </li>
        )}
    </ul>
);

export default Rankings;
