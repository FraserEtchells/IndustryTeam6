import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo.svg';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

//import UI components
import Customisation from './components/Customisation';
import Form from './components/HostForm';
import PlayerList from './components/PlayerList';
//import MainMenu from './components/MainMenu';


const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #7E549F;
    font-family: 'Passion One', cursive;
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
	left: 10%;
	top: 30%;
`;

const LobbyPage = () => {
  return (
    <React.Fragment>
    <GlobalStyle/>

    <Row>

       	<Form/>

    	<Customisation/>

      <PlayerList/>
      
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