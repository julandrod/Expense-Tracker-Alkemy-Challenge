import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import financeImage from "../assets/finance.svg";

const LandingContainer = styled.section`
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem 2rem 2rem;
  .info {
    h1,
    p,
    a {
      margin: 2rem;
    }
    h1 {
      font-weight: bold;
      font-size: 2rem;
      span {
        color: var(--main-green);
      }
    }
    p {
      color: black;
    }
  }
  .img-container {
    display: none;
  }
  @media (min-width: 992px) {
    .img-container {
        display: flex;
      flex: 1;
    }
    .main-img {
      width: 100%;
      display: block;
      object-fit: cover;
    }

    .info {
      flex: 1;
      height: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .btn {
      width: 30%;
      text-align: center;
    }
  }
`;

const Landing = () => {
  return (
    <LandingContainer>
      <div className="img-container">
        <img src={financeImage} alt="expense tracker" className="main-img" />
      </div>
      <div className="info">
        <h1>
          <span>Expense</span> Tracker App
        </h1>
        <p>Lleva el registro diario de tus cuentas y organiza tus finanzas.</p>
        <Link to="/login" className="btn">
          Login /Registro
        </Link>
      </div>
    </LandingContainer>
  );
};

export default Landing;
