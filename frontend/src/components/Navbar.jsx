import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthState } from "../features/authSlice";
import { ImMenu } from "react-icons/im";
import { sidebarOpen } from "../features/sidebarSlice";

const NavContainer = styled.nav`
  height: var(--navbar-height);
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--main-green);
  position: sticky;
  top: 0px;
  z-index: 999;
  .logo-container {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
    a {
      color: var(--light-gray);
    }
  }
  .login-container {
    display: none;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--light-gray);
    padding-right: 1rem;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .logo-container {
      padding-left: 5rem;
    }
    .login-container {
      display: flex;
      justify-content: end;
      padding-right: 5rem;
    }
    .button-navbar {
      height: 30px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 180px;
      cursor: pointer;
      button {
        background: transparent;
        border-color: transparent;
        font-size: 1rem;
        font-weight: bold;
        color: var(--light-gray);
        cursor: pointer;
      }
      &:hover {
        background: var(--dark-green);
      }
      svg {
        font-size: 1.5rem;
        color: var(--light-gray);
        margin-right: 5px;
      }
    }
  }
`;

const Navbar = () => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <div className="logo-container">
        <Link to={"/"}>
          <h3>Expense Tracker</h3>
        </Link>
        <button className="nav-toggle" onClick={() => dispatch(sidebarOpen())}>
          <ImMenu />
        </button>
      </div>
      {userInfo ? (
        <div
          className="login-container"
          onClick={() => {
            dispatch(logout());
            window.location.reload();
          }}
        >
          <div className="button-navbar">
            <BiLogOutCircle />
            <button>Salir</button>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <NavLink to={"/login"}>
            <div className="button-navbar">
              <BiLogInCircle />
              <button>Ingreso / Registro</button>
            </div>
          </NavLink>
        </div>
      )}
    </NavContainer>
  );
};

export default Navbar;
