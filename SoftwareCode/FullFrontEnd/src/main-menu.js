import React from 'react';
import {
  HashRouter,
  Link,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import logo from './images/logo.svg';
import PassionOne from './fonts/PassionOne.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8A;
    font-family: 'PassionOne';
    overflow: hidden;
    text-align: center;
    color: #df67a7;
  }
`;

export const Grid = styled.div`
  background-color: #7E549F; // purple
  width: ;
`;

export const Row = styled.div`
  display: block;
  justifyContent:center;
  alignItems: center;
`;

const Button = styled.button`
  
  font-family:'PassionOne';
  color: white;
  border: none;
  min-height: calc(0.11*100vh);
  // height: 3.5em;
  font-size: calc(0.015*100vw);
  margin: 0.3em;
  border-radius: 12px;
  outline: none;
  width: 27%;
  :hover {
    text-decoration: underline;
  }
`;

const Button1 = styled(Button)`
  background: #FB836F; // orange  
`;

const Button2 = styled(Button)`
  background: #4E937A; // green
`;

const Button3 = styled(Button)`
  background: #E3B538; // yellow
`;

const Logo = styled.img`
  background-image: url(../assets/logo.svg);
  margin: 0.1em;
  // width:8em;
  width: calc(0.1*100vw);
  // height:8em;
  height: calc(0.1*100vw);
  margin-top: -1%;
`;

const Name = styled.h1`
  font-size: calc(0.05*100vw);
  margin-top: -0.5%;
  font-family:'PassionOne';
`;

class LogoForMenu extends React.Component {
  state = {

  };
}
//colour from 4th button
// background: #C1549C; // pink

// button border and colour if we decide to use it
//  border: 2px solid #a90081;

//  background-color: #7E549F;

class MainMenu extends React.Component {
  state = {

  };

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <div className="App">

    <div>
      {/* Logo is an actual React component */}
      <Logo src={logo}  className="App-logo"  alt="Logo"/>
      <Name className="App-title" src={GlobalStyle}>QUIZSTAR</Name>
    </div>
    <HashRouter>
      <Grid>
        <Row>
        <Link to="./solo-view">
          <Button1>PLAY SOLO</Button1>
          </Link>
        </Row>
        <Row>
          <Link to='./index-custom-page'>
            <Button2>HOST MULTIPLAYER GAME</Button2>
          </Link>
        </Row>
        <Row>
          <Button3>JOIN FRIENDS</Button3>
        </Row>
      </Grid>
      </HashRouter>

    </div>

    </React.Fragment>
    );
  }
}

export default MainMenu;

ReactDOM.render(
    <MainMenu />,
    document.getElementById('root')
);