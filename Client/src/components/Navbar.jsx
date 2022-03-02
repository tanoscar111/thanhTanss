import { Badge } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;
const Logo = styled.h1`
  font-weight: bold;
`;
const MenuItem = styled.div`
  font-size: 14;
  cursor: pointer;
  margin-left: 25px;
`;
export default function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>OSCAR</Logo>
        </Center>
        <Right>
          <MenuItem>Regitter</MenuItem>
          <MenuItem>Login</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}
