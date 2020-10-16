import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'

import Timer from './Timer';

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

// grid width can be changed depending on how big the other components are
export const Grid = styled.div`
  background-color: #7E549F; // purple
  width: 940px;
`;


//display: flex; stretches it out a bit vertically but then the text doesn't center align
//display: block; FIXES IT <3

//adding height stops it from stretching vertically
//but seems to put it in the top 'line' so if it's a long question it'll wrap to the line below
//so if it's a short one it leaves a gap for the line underneath
export const QuestionRow = styled.div`
  display: block;
  background-color: #CAB1DE; // lilac
  justifyContent: center;
  alignItems: center;
  margin:;
  padding: 5px 5px;
  text-align: center;
  height:px;
`;

export const QuestionText = styled.h2`

`;

export const Row = styled.div`
  display: flex;

  justifyContent:center;
    alignItems: center;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

// button width used to be 400px but changed to percentage so it resizes

const Button1 = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
    font-family: 'Passion One', cursive;

  background: #FB836F; // orange
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 0px;
  margin-right: 5px;
  `;

const Button2 = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
    font-family: 'Passion One', cursive;

  background: #4E937A; // green
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 0px;
  `;

const Button3 = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
    font-family: 'Passion One', cursive;

  background: #E3B538; // yellow
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 0px;
  margin-right: 5px;
  `;

const Button4 = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
    font-family: 'Passion One', cursive;

  background: #C1549C; // pink
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 0px;
  `;

// button border and colour if we decide to use it
//  border: 2px solid #a90081;

// want to use this colour in background but not sure how outside of divs
//  background-color: #7E549F;

console.log(Timer);
class Answers extends React.Component {
    
  state = {

  };

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <div className="App">

      <Grid>
        <QuestionRow>
          <QuestionText>
            QUESTION QUESTION QUESTION QUESTION?
          </QuestionText>
        </QuestionRow>

        <Row>
          <Button1>ANSWER</Button1>
          <Button2>ANSWER</Button2>
        </Row>
        <Row>

          <Button3>ANSWER</Button3>
          <Button4>ANSWER</Button4>
       </Row>
      </Grid>

    </div>

    </React.Fragment>
    );
  }
}

export default Answers;
