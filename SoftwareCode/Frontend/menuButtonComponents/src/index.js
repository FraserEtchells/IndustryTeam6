import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'

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

export const Grid = styled.div`
  background-color: #7E549F; // purple
  width: 940px;
`;

export const Row = styled.div`
  display: block;

  justifyContent:center;
    alignItems: center;
`;

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  font-family: 'Passion One', cursive;

  color: white;
  border: none;
  height: 60px;
  font-size: 20px;
  margin: 5px;
  border-radius: 12px;
  outline: none;
`;

const Button1 = styled(Button)`
  background: #FB836F; // orange
  width: 15%;
  `;

const Button2 = styled(Button)`
  background: #4E937A; // green
  width: 25%;
  `;

const Button3 = styled(Button)`
  background: #E3B538; // yellow
  width: 17.5%;
  `;

//colour from 4th button
// background: #C1549C; // pink

// button border and colour if we decide to use it
//  border: 2px solid #a90081;

//  background-color: #7E549F;

class App extends React.Component {
  state = {

  };

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <div className="App">

      <Grid>
        <Row>
          <Button1>PLAY SOLO</Button1>
        </Row>
        <Row>
          <Button2>CREATE MULTIPLAYER GAME</Button2>
        </Row>
        <Row>
          <Button3>JOIN FRIENDS</Button3>
        </Row>
      </Grid>

    </div>

    </React.Fragment>
    );
  }
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);