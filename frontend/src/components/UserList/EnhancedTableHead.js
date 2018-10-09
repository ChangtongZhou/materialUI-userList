import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const rows = [
    { id: 'edit', label: 'Edit' },
    { id: 'toDelete', label: 'Delete' },
    { id: 'fn', label: 'First Name' },
    { id: 'ln', label: 'Last Name' },
    { id: 'sex', label: 'Sex' },
    { id: 'age', label: 'Age' },
    
]

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };

    render() {
      const { order, orderBy} = this.props;
      return (
        <TableHead>
          <TableRow>
            {rows.map(row => {
              return (
                <TableCell
                  key={row.id}
                  style={row.id !== "edit" && row.id !== "toDelete" ? {color: '#4049d4', fontSize: '20px'} : {color: '', fontSize: '20px'}}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title={row.id !== "edit" && row.id !== "toDelete" ? "Sort" : ""}
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  export default EnhancedTableHead;