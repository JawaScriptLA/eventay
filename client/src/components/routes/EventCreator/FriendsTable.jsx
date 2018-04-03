import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const FriendsTable = props => {
  // TODO: add avatar pictures, pulling from user profiles
  return (
    <div>
      <h2 style={{fontWeight: '300'}}>invite friends</h2>
      <Table
        multiSelectable={true}
        onRowSelection={selectedRows => {
          props.handleSelectionChange(selectedRows);
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} deselectOnClickaway={false}>
          {props.allFriends &&
            props.allFriends.map((friend, idx) => (
              <TableRow selected={props.isSelected(idx)} key={friend[0]}>
                <TableRowColumn>{friend[1]}</TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FriendsTable;
