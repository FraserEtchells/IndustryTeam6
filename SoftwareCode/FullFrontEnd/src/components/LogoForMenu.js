import * as React from "react";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import logo from '../assets/logo.svg';
import ReactDOM from 'react-dom';


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #7E549F;
    font-family: 'Passion One', cursive;
    overflow: hidden;
    text-align-last: center; 
    font: 50px;
  }
`;

const Logo = styled.img`
  background-image: url(../assets/logo.svg);
  margin: 0.1em;
  width:70px;
  height:70px;
  margin: 0 auto;
`;

class LogoForMenu extends React.Component {
  state = {

  };

  render() {
    return (
    <div>
      {/* Logo is an actual React component */}
      <Logo src={logo}  className="App-logo"  alt="Logo"/>
      <h1 className="App-title" src={GlobalStyle}>Quizstars</h1>
    </div>
    );
  }
}

export default LogoForMenu;
