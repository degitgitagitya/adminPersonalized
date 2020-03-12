import React from "react";

import "./Container.css";

const NavLink = props => {
  const { children } = props;
  return <div className="page-container">{children}</div>;
};

export default NavLink;
