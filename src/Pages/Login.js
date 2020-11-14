import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthContext } from '../Contexts/Authentication';

import './Login.css';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    inputEmail: '',
    inputPassword: '',
    error: false,
    errorMsg: '',
  };

  changeInputEmail = (event) => {
    this.setState({
      inputEmail: event.target.value,
    });
  };

  changeInputPassword = (event) => {
    this.setState({
      inputPassword: event.target.value,
    });
  };

  toggleError = (msg) => {
    this.setState({
      error: true,
      errorMsg: msg,
    });
  };

  checkInput = () => {
    if (this.state.inputPassword === '' || this.state.inputEmail === '') {
      return false;
    } else {
      return true;
    }
  };

  handleClickLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: this.state.inputEmail,
      password: this.state.inputPassword,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth/guru`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.toggleError('Wrong Email / Password');
        } else {
          this.context.changeAuthToTrue(data);
          this.props.history.push('/home');
        }
      })
      .catch((error) => console.log('error', error));
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClickLogin();
    }
  };

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-4'>
              <div className='card login-box p-3'>
                <h3 className='text-center'>Login</h3>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='Email'
                  id='email'
                  className='form-control'
                  value={this.state.inputEmail}
                  onChange={this.changeInputEmail}
                  onKeyPress={this.handleKeyPress}
                />
                <label htmlFor='password' className='mt-2'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  className='form-control'
                  value={this.state.inputPassword}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.changeInputPassword}
                />
                {this.state.error ? (
                  <div className='text-danger my-1 text-left'>
                    {this.state.errorMsg}
                  </div>
                ) : (
                  <br></br>
                )}
                <button
                  onClick={() => {
                    if (this.checkInput() === true) {
                      this.handleClickLogin(this.props);
                    } else {
                      this.toggleError('Fill Email & Password');
                    }
                  }}
                  className='btn btn-info form-control mt-2 mb-3'
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
