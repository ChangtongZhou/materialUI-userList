import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';

import {connect} from 'react-redux';
import {addUser} from '../../actions/users';

const styles = theme => ({
  layout: {
    padding: `0 ${theme.spacing.unit * 3}px`,
    maxWidth: 400,
    margin: '0 auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    background: 'LightSeaGreen',
    color: 'white',
    '&:hover': {
      background: 'darkCyan'
    },
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    width: 300,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
});

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fn: '', 
      ln: '', 
      sex: '', 
      age: '', 
      password: '', 
      repeat: '', 
      showPassword: false, 
      showRepeat: false,
      psError: false
    };
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowRepeatPassword = () => {
    this.setState({ showRepeat: !this.state.showRepeat });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.repeat) {
      this.setState({psError: !this.state.psError});
    } else {
      this.setState({psError: !this.state.psError});
      let user = {
        fn: this.state.fn,
        ln: this.state.ln,
        sex: this.state.sex,
        age: this.state.age,
        password: this.state.password
      }
      this.props.createUser(user);
      this.setState({fn: '', ln: '', sex: '', age: '', password: '', repeat: ''});
      this.props.history.push('/');
    }
  };

  render() {

    const {classes} = this.props;
    return (
      <form className={classNames(classes.layout)}>
        
            <Paper className={classes.paper}>
              
                <h2>Create New User:</h2>
                <div>
                  <TextField
                    id="fn"
                    label="First Name"
                    name = "fn"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.fn}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    id="ln"
                    label="Last Name"
                    name = "ln"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.ln}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    id="sex"
                    label="Sex"
                    name = "sex"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.sex}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    id="age"
                    label="Age"
                    name="age"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.age}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    className={classNames(classes.margin, classes.textField)}
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange}
                    margin="normal"
                    InputProps = {{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="repeat"
                    label="Repeat"
                    name="repeat"
                    className={classNames(classes.margin, classes.textField)}
                    type={this.state.showRepeat ? 'text' : 'password'}
                    value={this.state.repeat}
                    onChange={this.handleChange}
                    margin="normal"
                    InputProps = {{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowRepeatPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showRepeat ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                {this.state.psError && <p style={{ color: 'red', paddingLeft: '15px'}}>Your repeated password doesn't match with your password</p>}
                <Button variant="contained" className={classes.button} onClick={this.handleSubmit}>
                  <PersonIcon className={classes.leftIcon} />
                  Add User
                </Button>
            </Paper>
      </form>
    )
  }

}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (newUser) => {
      dispatch(addUser(newUser));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddUser));
// export default withStyles(styles)(AddUser);

