import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Input, Button } from 'antd';

import state from '../state.js';


const containerStyle = {
  margin: 'auto',
  textAlign: 'center',
  width: '300px'
};

@observer
class TextInput extends Component {
  @action change(e) {
    this.props.object[this.props.id] = e.target.value;
  }
  render() {
    let Clz = Input;
    if (this.props.isPassword) {
      Clz = Input.Password;
    }
    return (
      <Clz placeholder={this.props.name}
        onChange={this.change.bind(this)}
        value={this.props.object[this.props.id]}
      />
    );
  }
}


export default class Login extends Component {

  @observable login = "admin";
  @observable password = "admin";

  render() {
    return (
      <div style={containerStyle}>
        <h1>Login</h1>
        <TextInput object={this} id="login" name="username"/>
        <div style={{height: '5px'}} />
        <TextInput object={this} id="password" name="password"
          isPassword={true} />
        <div style={{height: '15px'}} />
        <Button type="primary"
          onClick={() => state.login(this.login, this.password)}
        >
          Test
        </Button>
      </div>
    );
  }
}

