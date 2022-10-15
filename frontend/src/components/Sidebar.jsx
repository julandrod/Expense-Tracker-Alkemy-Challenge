import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout, selectAuthState } from "../features/authSlice";
import { ImExit } from "react-icons/im";
import NavLinks from "./NavLinks";

const SidebarContainer = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 300px;
    min-height: calc(100vh - var(--navbar-height));
    background: var(--main-green);
    .user-info {
      display: flex;
      flex-direction: column;
      background: var(--dark-green);
      height: 40px;
      padding: 2rem;
      align-items: flex-start;
      justify-content: space-around;
      h3 {
        color: var(--dark-gray);
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      span {
        color: var(--light-gray);
        font-size: 1rem;
      }
    }
    .sidebar-title {
      align-items: center;
      justify-content: center;
      background: var(--medium-green);
      padding: 0.5rem;
      h3 {
        color: var(--light-gray);
        margin: 0 auto;
      }
    }
    .menu-items {
      .item {
        display: flex;
        align-items: center;
        cursor: pointer;
        background: transparent;
        color: var(--dark-gray);
        padding: 1.5rem;
        font-size: 1rem;
        &:hover {
          background: var(--dark-green);
        }
        svg {
          font-size: 1.5rem;
          margin-right: 1rem;
        }
      }
    }
  }
`;

const Sidebar = () => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <SidebarContainer>
      <div className="user-info">
        <h3>{userInfo.name}</h3>
        <span>{userInfo.email}</span>
      </div>
      <div className="user-info sidebar-title">
        <h3>Dashboard</h3>
      </div>
      <div className="menu-items">
        <NavLinks />
        <span className="item" onClick={() => handleLogout()}>
          <ImExit />
          Salir
        </span>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
