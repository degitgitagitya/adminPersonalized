import React, { Component } from "react";

import NavLink from "../Components/NavLink";

import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="card login-box p-3">
                <h3 className="text-center">Login</h3>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="password"
                  className="form-control"
                />
                <label htmlFor="password" className="mt-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="form-control"
                />
                <NavLink href="/home">
                  <button className="btn btn-info form-control mt-4 mb-3">
                    Login
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
