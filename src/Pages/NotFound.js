import React, { Component } from "react";

import NavLink from "../Components/NavLink";

import "./NotFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2 className="text-white">
            Oops, The Page you are looking for can't be found!
          </h2>

          <NavLink href="/">
            <h3 className="text-white">Return To Homepage</h3>
          </NavLink>

          <br />
          <a
            className="text-white"
            href="https://colorlib.com/wp/free-404-error-page-templates/"
          >
            Template By ColorLib
          </a>
        </div>
      </div>
    );
  }
}
