import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { ACCESS_TOKEN } from '../../constants';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './Login';

import {
    Route,
    withRouter,
    Switch
  } from 'react-router-dom';
  
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
class DemoLogin extends Component {
    render() {
        console.log("isAuth : " + this.props.isAuthenticated);
        if( !this.props.isAuthenticated) {
           //return <Login onLogin={this.props.handleLogin} />
        
        }

        return (
           
            <Layout className="app-container">
            <Content className="app-content">
                <div className="container">
                <h1>*** MENU ***</h1>   
                <h2><Link to="/userAccess">1. ROLE 'USER' access</Link></h2>
                <h2><Link to="/adminAccess">2. ROLE 'ADMIN' access</Link></h2>
                <h2><Link to="/guest">3. GUEST access</Link></h2>
                <h2><Link to="/testOne">4. TEST API 1</Link></h2>
                <h2><Link to="/testTwo">5. TEST API 2</Link></h2>
                <h1>*** ***</h1>   
                <h2><Link to="/login" onClick={this.props.handleLogout}>Logout</Link></h2>
                </div>
            </Content>
            </Layout>

        );


    }
}
export default DemoLogin;