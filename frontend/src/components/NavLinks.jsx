import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { sidebarClose } from "../features/sidebarSlice";
import links from "../utils/menu-links";

const NavLinks = () => {
  const dispatch = useDispatch();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={() => dispatch(sidebarClose())}
            className="item"
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
