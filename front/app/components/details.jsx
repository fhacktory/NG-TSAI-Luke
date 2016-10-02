import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const style = {
    width: 'calc(100% - 300px)',
    display: 'inline-block',
    float: 'right',
    marginTop: 50
};

const Details = ({log}) => {
    if (!log) {
        return null;
    }
    return (
        <div style={style}>
            <Table selectable={false}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Info</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {log.map((l, i) =>
                        <TableRow key={i}>
                            <TableRowColumn>{l.winner} à pwned {l.loser} à {l.date}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
};

export default Details;
