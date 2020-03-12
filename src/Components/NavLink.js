import React from "react";
import { withRouter } from "react-router-dom";

import "./NavLink.css";

const NavLink = props => {
  const { href, history, children } = props;
  return (
    <div
      className="navlink"
      href={href}
      onClick={e => {
        e.preventDefault();
        history.push(href);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
    >
      {children}
    </div>
  );
};

export default withRouter(NavLink);
