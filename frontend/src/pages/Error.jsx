import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import notFound from "../assets/not-found.png";

const ErrorContainer = styled.section`
  flex: 4;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  img {
    margin-top: 0;
    max-width: 400px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  a {
    color: var(--red-main);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <img src={notFound} alt="Not found" />
      <h3>La pagina no se encuentra!</h3>
      <p>No podemos encontrar la pagina que estas buscando.</p>
      <Link to="/">Regresar a la pagina principal</Link>
    </ErrorContainer>
  );
};

export default Error;
