import React from "react";

import "./Container.css";

const Container = props => {
  const { children } = props;
  return <div className="page-container">{children}</div>;
};

export default Container;
