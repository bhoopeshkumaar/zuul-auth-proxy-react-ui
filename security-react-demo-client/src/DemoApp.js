import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from './util/APIUtils';
//import { ACCESS_TOKEN } from './constants';
import { Layout, notification } from 'antd';
//import Login from './user/login/Login';
import DemoLogin from './user/login/DemoLogin';
const { Content } = Layout;

class DemoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentUser: null,
          isAuthenticated: false,
          isLoading: false
        }

        //this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        console.log("Inside handle login");
        notification.success({
          message: 'NTRS Security Demo App',
          description: "You're successfully logged in.",
        });
        
        this.loadCurrentUser();
        this.props.history.push("/");
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

    render() {
        
         return (
             <Layout className="app-container">
                Weclome to spring demo app
                <Content className="app-content">
                    <div className="container">
                    <Switch>      
                    <Route path="/login" 
                        render={(props) => <DemoLogin onLogin={this.handleLogin} {...props} />}></Route>
                    </Switch>
                    </div>
                </Content>
             </Layout>
         );
       }
}

export default withRouter(DemoApp);