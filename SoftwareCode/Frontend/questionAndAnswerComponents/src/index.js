import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import styled from "styled-components";

// grid width can be changed depending on how big the other components are
export const Grid = styled.div`
  background-color: #7E549F;
  width: 920px;
`;

export const QuestionRow = styled.div`
  display: flex;
  background-color: #CAB1DE;
  justifyContent:center;
  alignItems: center;
  margin: 10px 0px;
  text-align: center;
`;

//text-align: center; <----doesn't work

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
  background: #FB836F;
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin: 10px 10px;
  `;

const Button2 = styled.button`
  background: #4E937A;
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin: 10px 10px;
  `;

const Button3 = styled.button`
  background: #E3B538;
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin: 10px 10px;
  `;

const Button4 = styled.button`
  background: #C1549C;
  color: white;
  border: none;
  width: 50%;
  height: 200px;
  font-size: 20px;
  margin: 10px 10px;
  `;

// button border and colour if we decide to use it
//  border: 2px solid #a90081;

// want to use this colour in background but not sure how outside of divs
//  background-color: #7E549F;

class App extends React.Component {
  state = {

  };

  render() {
    return (
    <div className="App">

      <Grid>
        <QuestionRow>
          <h2>QUESTION QUESTION QUESTION QUESTION?</h2>
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
    );
  }
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);