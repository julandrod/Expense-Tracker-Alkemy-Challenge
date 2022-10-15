import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  width: 6rem;
  height: 6rem;
  border: 5px solid var(--grey-400);
  border-radius: 50%;
  border-top-color: var(--primary-500);
  animation: spinner 2s linear infinite;
  margin: 0 auto;
`;

const Loading = () => {
  return <LoadingContainer></LoadingContainer>;
};

export default Loading;
