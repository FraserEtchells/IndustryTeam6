import React, {Component} from 'react';
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
import QuestionsAnswers from './components/QuestionsAnswers';
import Timer from './components/Timer';
import Header from './components/Header';

export const Grid = styled.div``;
export const Row = styled.div`display: flex;`;
export const TimerRow = styled.div`
display: fixed;
position: relative;
right: -55vmin;
font-size: 3.5em;
`;
export const Col = styled.div`flex: ${(props) => props.size};`;;

export const Button = styled.button`
  float: right;
  background-color: Transparent;
  font-size: 36px;
  font-family:'PassionOne';
  color: #e266ac;
  border: none;
  padding: 12px;
  margin-right: 20px;
  margin-top: 7px;

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

export const Title = styled.h1`
  position: relative;
  top: -24px;
  font-family:'PassionOne';
`;

export const Logo = styled.img`
  margin: 0.1em;
  width:70px;
  height:70px;
  float: left;
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


class Page extends Component{
  state ={}


  render(){
    return(
      <React.Fragment>
    <GlobalStyle/>
      <HeaderContainer>
        <header>
          <Grid>
            {/* <Row> */}
              {/* <Col size={0}>
                                <Logo src={logo} alt="Logo"/>
                            </Col>
                            <Col size={0}>
                                <Title>QUIZSTAR</Title>
                            </Col>
                            <Col size={1}> */}
                            {/* <Col> */}
                <Header/>
                {/* <HashRouter> */}
                  {/* TODO: ADD 'ARE YOU SURE?' POPUP */}
                  {/* <Link to='./'>
                    <Button as="button" type="button">EXIT</Button>
                  </Link> */}
                {/* </HashRouter> */}
              {/* </Col> */}
                        {/* </Row> */}
                        <TimerRow>
                            <Col size={1}>
                                {/* To-do get the value of the time*/}
                                <Timer>
                                    
                                </Timer>
                            </Col>
      
                        </TimerRow>
                        <Row>
                            <Col size = {1}> 
                                {/* Send the value of the timer in the time parameter*/}
                                <QuestionsAnswers code={this.props.code} time={5} socket={this.props.socket}>
        
                                </QuestionsAnswers>
                            </Col>
                                <Col size = {0.02}>
                            </Col>
                            <Col size = {1}>
                                <Leaderboard>
        
                                </Leaderboard>
                            </Col>
                        </Row>

                    </Grid>
                </header>
            </HeaderContainer>
        </React.Fragment>
    )
  }
}


export default Page;