import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import logo from '../assets/logo.svg';
import PassionOne from '../fonts/PassionOne.ttf';
import {
  HashRouter,
  Link,
} from "react-router-dom";

const Logo = styled.img`
  background-image: url(../assets/logo.svg);
  margin: 0.1em;
  width: calc(0.035*100vw);
  height: calc(0.035*100vw);
  margin-top: -1%;
`;

const Name = styled.h1`
  font-size: calc(0.03*100vw);
  margin-top: -0.01%;
  font-family:'PassionOne';
`;

export const Grid = styled.div``;
export const Row = styled.div`display: flex;`;
export const Col = styled.div`flex: ${(props) => props.size};`;

export const Button = styled.button`
  float: right;
  background-color: Transparent;
  font-size: calc(0.03*100vw);
  font-family:'PassionOne';
  color: #e266ac;
  border: none;
  outline: none;
  padding: 12px;
  margin-right: 20px;
  margin-top: -0.01%;

  :hover {
    text-decoration: underline;
  }
`;

export const HeaderContainer = styled.div`
  color:#E266AC;
  font-family:'PassionOne'; 
  font-size: 25px;
  position: relative;
  
`;

export const HeaderSytle = styled.header`

`;

const GlobalStyle = createGlobalStyle`
    
    @font-face {
      font-family:PassionOne;
      src: url(${PassionOne});
    }
    body {
      background-color: #714C8A;
      font-family: 'PassionOne';
    }
`;

const Header = () => {
  return (
    <React.Fragment>
    <GlobalStyle/>
      <HeaderContainer>
        <header>
          <Grid>
            <Row>
              <Col size={0}>
                  <Logo src={logo} alt="Logo"/>
              </Col>
              <Col size={0}>
                  <Name>QUIZSTAR</Name>
              </Col>
              <Col size={1}>
                <HashRouter>
                  {/* TODO: ADD 'ARE YOU SURE?' POPUP */}
                  <Link to='./'>
                    <Button as="button" type="button">EXIT</Button>
                  </Link>
                </HashRouter>
              </Col>
            </Row>
          </Grid>
        </header>
      </HeaderContainer>
  </React.Fragment>
  );
}

export default Header;