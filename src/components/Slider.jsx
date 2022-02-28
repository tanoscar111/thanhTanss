import React from "react";

import styled from "styled-components";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: coral;
  position: relative;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
`;
const Wrapper = styled.div`
  height: 100%;
`;
const Image = styled.img`
  height: 80%;
`;
const Slide = styled.div`
  width: 100vw;
  height:100vh
  display: flex;
  align-items: center;
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const InforContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1``;
const Desc = styled.p``;
const Button = styled.button``;
export const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <ArrowLeftIcon />
      </Arrow>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src="https://i.ibb.co/DG69bQ4/2.png" />
          </ImgContainer>
          <InforContainer></InforContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right">
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};
