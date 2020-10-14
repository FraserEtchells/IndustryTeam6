import React from 'react';
import {
  HashRouter,
  Link,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import logo from './images/logo.svg';

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #7E549F;
    font-family: 'Passion One', cursive;
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
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  font-family: 'Passion One', cursive;

  color: white;
  border: none;
  height: 3.5em;
  font-size: 1.5em;
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
  width:8em;
  height:8em;
  margin-top: 2%;
`;

const Name = styled.h1`
  font-size: 4.5em;
  margin-top: -0.5%;
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
          <Button1>PLAY SOLO</Button1>
        </Row>
        <Row>
          <Link to='./index-custom-page'>
            <Button2>CREATE MULTIPLAYER GAME</Button2>
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