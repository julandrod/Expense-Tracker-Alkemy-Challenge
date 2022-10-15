import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectSidebarState, sidebarClose } from "../features/sidebarSlice";
import { FaTimesCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { logout } from "../features/authSlice";
import NavLinks from "./NavLinks";

const SmallSidebarContainer = styled.aside`
  .small-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

  .content {
    background: var(--light-gray);
    width: 90vw;
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .menu-items {
    margin-bottom: 2rem;
  }
  .item {
    text-decoration: none;
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: black;
    transition: var(--transition);
    letter-spacing: var(--letterSpacing);
    &:hover {
      padding: 1rem 1.5rem;
      padding-left: 2rem;
      background-color: var(--dark-green);
    }
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: red;
    cursor: pointer;
  }
`;

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector(selectSidebarState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(sidebarClose());
    dispatch(logout());
    window.location.reload();
  };

  return (
    <SmallSidebarContainer>
      <div
        className={
          isSidebarOpen ? "show-sidebar small-sidebar" : "small-sidebar"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => dispatch(sidebarClose())}
          >
            <FaTimesCircle />
          </button>
          <div className="menu-items">
            <NavLinks />
            <span className="item" onClick={() => handleLogout()}>
              <ImExit />
              Salir
            </span>
          </div>
        </div>
      </div>
    </SmallSidebarContainer>
  );
};

export default SmallSidebar;
