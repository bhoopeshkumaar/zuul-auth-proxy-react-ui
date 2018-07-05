import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';


import Login from './user/login/Login';
import InfoPage from './user/login/InfoPage';
import DemoLogin from './user/login/DemoLogin';
import { getCurrentUser } from './util/APIUtils';
import { Layout, notification } from 'antd';
import LoadingIndicator from './common/LoadingIndicator';
import { ACCESS_TOKEN } from './constants';
const { Content } = Layout;
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  handleLogin() {
    notification.success({
      message: 'Security App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/home");
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentWillMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'NTRS Security Demo App',
      description: description,
    });
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }

    return (
        <Layout className="app-container">
          <Content className="app-content">
            <div className="container">
              <Switch>      
              <Route path="/home" 
                  render={(props) => <DemoLogin isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} handleLogin={this.handleLogin} {...props} />}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
               
                <Route path="/userAccess" render={(props) => <InfoPage methodType='GET' {...props} />}></Route>
                <Route path="/adminAccess" render={(props) => <InfoPage methodType='GET' {...props} />}></Route>
                <Route path="/guest" render={(props) => <InfoPage methodType='GET' {...props} />}></Route>
                <Route path="/testOne" render={(props) => <InfoPage methodType='GET' {...props} />}></Route>
                <Route path="/testTwo" render={(props) => <InfoPage methodType='GET' {...props} />}></Route>

              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}


export default withRouter(App);
