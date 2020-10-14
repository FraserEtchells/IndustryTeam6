import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import PassionOne from '../fonts/PassionOne.ttf';

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


const Title = styled.h1`
  margin: 0.1em;
  color: #FFF100;
  font-size: 7em;
`;

const ExitButton = styled.button`
    position: absolute;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: 1.9em;
    color: white;
    border: none;
    padding: 0.8em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';
    position: relative;
    top: 2em;
    left: 4em;
  
    :hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    position: absolute;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: 1.9em;
    color: white;
    border: none;
    padding: 0.8em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';
    position: relative;
    top: 2em;
    
  
    :hover {
        text-decoration: underline;
    }
`;

class Replay extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />

       <Button type='submit'>REPLAY ?</Button>
        
        <ExitButton type='submit'> EXIT  </ExitButton>

      </React.Fragment>
    );
  }
}

ReactDOM.render(
    <Replay />,
    document.getElementById('root')

)

export default Replay;