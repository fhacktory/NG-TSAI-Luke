import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const Rank = ({rank, index, onClick}) => (
    <ListItem leftAvatar={<Avatar src={rank.img_24}/>}
              primaryText={`N°: ${index + 1} - ${rank.username}`}
              secondaryText={rank.points + ' points'}
              rightIcon={<ActionInfo />}
              onClick={e => {
                  e.preventDefault();
                  onClick();
              }}
    />
);

export default Rank;