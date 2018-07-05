import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import { showAccessInfo } from '../../util/APIUtils';
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

class InfoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          methodType: this.props.methodType,  
          isSuccess:false,
          message:null
        }
        
        this.showInfo = this.showInfo.bind(this);
        
    }    

    componentWillMount() {
        this.showInfo(this.props.match.path, this.state.methodType);
      }

    showInfo (apiname, methodType){
        let promise;
        promise = showAccessInfo(apiname, methodType); 

        promise            
        .then(response => {
            const isSuccess = response.success;
            const message = response.message;
            
            this.setState({
                isSuccess:isSuccess,
                message: message
            })
        }).catch(error => {
            this.setState({
                isLoading: false,
                isSuccess:false,
                message: error.message
            })
        });
    }

    render() {
        return (
           
            <Layout className="app-container">
            <Content className="app-content">
                <div className="container">
                <h3>{this.state.message}</h3>
                <h2><Link to="/home">Home</Link></h2>
                </div>
            </Content>
            </Layout>

        );


    }
}
export default InfoPage;