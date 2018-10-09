import React, {Component} from 'react';
import AddUser from '../../components/AddUser';
import EditUser from '../../components/EditUser';
import UserList from '../../components/UserList';


import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

const WithRouterUserList = withRouter(UserList);
const WithRouterAddUser = withRouter(AddUser);
const WithRouterEditUser = withRouter(EditUser);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route 
              exact={true} 
              path="/" 
              render={() => (
                <WithRouterUserList />
              )}
            />
            <Route
              path="/addUser"
              render={() => (
                <WithRouterAddUser />
              )}
            />
            <Route
              path="/editUser/:id"
              render={() => (
                <WithRouterEditUser />
              )}
            />
          </Switch>
          
        </div>
      </BrowserRouter>

    )
    
  }
}

export default App;
