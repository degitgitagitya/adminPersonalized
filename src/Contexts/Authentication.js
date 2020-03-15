import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export default class Authentication extends Component {
  state = {
    isAuth: false,
    data: []
  };

  changeAuthToFalse = () => {
    this.setState({
      isAuth: false,
      data: []
    });
  };

  changeAuthToTrue = data => {
    this.setState({
      isAuth: true,
      data: data
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          changeAuthToFalse: this.changeAuthToFalse,
          changeAuthToTrue: this.changeAuthToTrue
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
