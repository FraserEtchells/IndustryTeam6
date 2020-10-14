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


class Winner extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />

        <Title> <span role="img" aria-label="sparkles">✨ ✨</span>YOU WIN! <span role="img" aria-label="sparkles">✨ ✨</span></Title>
        
      </React.Fragment>
    );
  }
}

ReactDOM.render(
    <Winner />,
    document.getElementById('root')

)

export default Winner;