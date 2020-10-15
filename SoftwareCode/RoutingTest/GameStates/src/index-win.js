import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import PassionOne from './fonts/PassionOne.ttf';

//import UI
import Winner from './components/Winner';
import Replay from './components/Replay';
import Leaderboard from './components/Leaderboard';

const GlobalStyle = createGlobalStyle`
     @font-face {
      font-family: PassionOne;
      src: url(${PassionOne});
    }
    body {
      background-color: #7E549F;
      text-align: center;
      align-content: center;
    }
`;

const Style = styled.div`
position: relative;
left: 35%;
`;


class EndGameWin extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />

          <Winner/>
      
        <Style><Leaderboard/></Style>

        <Replay/>
        
      </React.Fragment>
    );
  }
}

ReactDOM.render(
    <EndGameWin />,
    document.getElementById('root')

)

export default EndGameWin;