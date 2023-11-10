import React from "react";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Not Found</NotFoundTitle>
      <NotFoundText>
        Sorry, the page you are looking for does not exist.
      </NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFoundPage;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: #555;
`;
