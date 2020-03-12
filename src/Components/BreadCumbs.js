import React, { Component } from "react";

import Container from "../Components/Container";

import "./BreadCumbs.css";

export default class BreadCumbs extends Component {
  render() {
    return (
      <Container>
        <div className="breadcumbs-box">{this.props.content}</div>
      </Container>
    );
  }
}
