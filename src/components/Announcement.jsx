import React from "react";
import styled from "styled-components";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
`;
export const Announcement = () => {
  return (
    <div>
      <Container>Super Deal ! Free shipping on Order Over $50</Container>
    </div>
  );
};
