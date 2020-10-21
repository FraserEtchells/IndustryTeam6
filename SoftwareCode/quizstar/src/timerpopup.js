import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo.svg';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import PassionOne from './fonts/PassionOne.ttf';
import {
  HashRouter,
  Link,
} from "react-router-dom";

//import UI components
import Leaderboard from './components/Leaderboard';
import Timer from './components/Timer';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8;
    font-family: 'PassionOne';
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

const TimerBuffer() => {
  return (
    <React.Fragment>
      <GlobalStyle/>
      	<Header/>
      	<Timer/>
      	<Leaderboard/>
    </React.Fragment>
  );
}

ReactDOM.render(
    <TimerBuffer />,
    document.getElementById('root')

)

export default Custom;