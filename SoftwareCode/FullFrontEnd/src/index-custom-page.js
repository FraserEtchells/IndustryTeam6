import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo.svg';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import PassionOne from './fonts/PassionOne.ttf';

//import UI components
import Customisation from './components/Customisation';
import Form from './components/HostForm';
//import MainMenu from './components/MainMenu';


const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #7E549F;
    font-family: 'PassionOne';
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

export const Row = styled.div`
  display: flex;
  padding: 4em;
  padding: 4em;
	position: relative;
	left: 20%;
	top: 30%;
`;

const LobbyPage = () => {
  return (
    <React.Fragment>
    <GlobalStyle/>

    <Row>

       	<Form/>

    	<Customisation/>
      
    </Row>
    </React.Fragment>
  );
}



/// ========================================

ReactDOM.render(
  <LobbyPage/>,
  document.getElementById('root')
);

export default LobbyPage;