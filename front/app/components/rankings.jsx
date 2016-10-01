import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const style = {
    maxWidth: 300
};

const Rankings = ({rankings}) => (
    <List style={style}>
        {rankings.map(rank =>
            <ListItem key={rank._id}
                      leftAvatar={<Avatar src={rank.img_24} />}
                      primaryText={rank.username}
                      secondaryText={rank.points + ' points'}
                      rightIcon={<ActionInfo />}
            />
        )}
    </List>
);

export default Rankings;
