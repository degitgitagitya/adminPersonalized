import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export default class Authentication extends Component {
  state = {
    isAuth: true,
    data: [],
  };

  changeAuthToFalse = () => {
    this.setState({
      isAuth: true,
      data: [],
    });
  };

  changeAuthToTrue = (data) => {
    this.setState({
      isAuth: true,
      data: data,
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          changeAuthToFalse: this.changeAuthToFalse,
          changeAuthToTrue: this.changeAuthToTrue,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
