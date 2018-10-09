import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button'; 
import TextField from '@material-ui/core/TextField';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';


import {connect} from 'react-redux';
import {getUsers, deleteUser} from '../../actions/users';
import { getCurrentUser } from '../../actions/currentUser';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    paddingLeft:'5',
    paddingRight: '0'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  addButton: {
    background: 'LightSeaGreen',
    color: 'white',
    '&:hover': {
      background: 'darkCyan'
    },
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },

});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'fn',
    selected: [],
    textInput: '',
    page: 0,
    rowsPerPage: 10,
    isSearching: false
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (property !== "edit" && property !== "toDelete") {
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
          }
          this.setState({ order, orderBy });
    }

  };

  handleSearchInput = (e, user) => {
    this.setState({textInput: e.target.value});
  }

  handleSearch = (user) => {
    let matchesUsers = [user.fn, user.ln, user.sex, user.age];
    let flag = matchesUsers.some(elem => {
        if(typeof elem !== 'string') {
            elem = '' + elem;
            return elem === this.state.textInput;
        } else {
            let regex = new RegExp(`^${this.state.textInput}`, 'i');
            let retVal = elem.match(regex);
            return retVal != null;
        }
    })
    return flag;
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleAddUser = () => {
      this.props.history.push('/addUser');
  }

  handleEditUser = (id) => {
      this.props.getCurrentUser(id);
      this.props.history.push(`/editUser/${id}`);
  }

  handleDeleteUser = (id) => {
    this.props.deleteUser(id);
  }

  render() {
    const { classes, users} = this.props;

    // console.log(`error in userlist: ${JSON.stringify(users.error, null, 2)}`);
    if (users.isLoading) {
        return <p>Loading users</p>;
    } else if (users.error) {
        return <p style={{color: 'red'}}>{users.error.response.statusText}: You failed to fetch data from server.</p>;
    } else {
        const { order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.data.length - page * rowsPerPage);
        return (
            <div>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    
                    <div style={{margin: '25px'}}>
                        <SearchIcon style={{marginRight: '5px'}}/>
                        <TextField
                            placeholder="Search User"
                            id="bootstrap-input"
                            value = {this.state.textInput}
                            onChange={this.handleSearchInput}
                            InputProps={{
                            disableUnderline: true,
                            classes: {
                                root: classes.bootstrapRoot,
                                input: classes.bootstrapInput,
                            },
                            }}
                            InputLabelProps={{
                            shrink: true,
                            className: classes.bootstrapFormLabel,
                            }}
                        />
                    </div>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={users.data.length}
                            />
                            <TableBody>
                            {users.data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .filter(user => this.handleSearch(user))
                                .map(user => {
                                return (
                                    <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={user._id}
                                    >
                                    <TableCell className={classes.button}>
                                        <Button variant="extendedFab" aria-label="Edit" color="primary" onClick={()=>this.handleEditUser(user._id)}>
                                            <EditIcon className={classes.extendedIcon} />
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell className={classes.button}>
                                        <Button variant="extendedFab" aria-label="Delete" color="secondary" onClick={()=>this.handleDeleteUser(user._id)}>
                                            <DeleteForeverIcon className={classes.extendedIcon} />
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{fontSize: '18px'}}>{user.fn}</TableCell>
                                    <TableCell style={{fontSize: '18px'}}>{user.ln}</TableCell>
                                    <TableCell style={{fontSize: '18px'}}>{user.sex}</TableCell>
                                    <TableCell style={{fontSize: '18px'}}>{user.age}</TableCell>
                                    
                                    </TableRow>
                                );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                    component="div"
                    count={users.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <Button variant="contained" className={classes.addButton} onClick={this.handleAddUser}>
                    <PersonIcon className={classes.leftIcon} />
                    Create New User
                </Button>
            </div>
        )
    }
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    deleteUser: (id) => {
      dispatch(deleteUser(id));
    },
    getCurrentUser: (id) => {
      dispatch(getCurrentUser(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable));
