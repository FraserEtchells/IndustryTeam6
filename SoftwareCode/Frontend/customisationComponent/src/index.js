import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';




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

  justifyContent:center;
    alignItems: center;
    padding: 7px;
`;

export const Title = styled.h1`

`;

 const IconPicker = styled.div`

  background: white; // green
  border: none;
  color: #7E549F;
  padding: 50px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%

`;
const ColourHead =  styled.div`

  background-color: #422D53;
  color: #C3B0D3;
   width: 100%;
  height: 40px;
  font-size: 30px;
  text-align: center;
  border-radius: 5px 5px 0 0;
    margin: 0;
  padding-bottom: 15px;
  position: relative;
  top: -40px;
`;

const ColourHeader = () => {
  return (
    <ColourHead>
        <h2>PLAYER CUSTOMISATION</h2>
    </ColourHead>
  )
}

export const Container = styled.div`
 display: block;
  background-color: #CAB1DE; // lilac
  justifyContent: center;
  alignItems: center;
  margin: 5px;
  text-align: center;
  height:300px;
  width: 500px;
`;

const Button1 = styled.button`
  
   background: #C41111; // red
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%
  `;

  const Button2 = styled.button`

  background: #132ED0; // blue
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%
  `;

 const Button3 = styled.button`

   background: #15A642; // green
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

 const Button4 = styled.button`

  background: #EC54B9; // pink
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

  const Button5 = styled.button`
  background: #EE7D0D; // orange
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

  const Button6 = styled.button`

  background: #EDED54; // yellow
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

  const Button7 = styled.button`
    background: #3F474E; // grey
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;


const Button8 = styled.button`
  
background: white; // white
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

  const Button9 = styled.button`
  background: #6B2FBA; // purple
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;

  const Button10 = styled.button`
  
  background: #50F5D0; // white
  border: none;
  color: #7E549F;
  padding: 22px;
  text-align: center;
  alignItems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  `;


class App extends React.Component {
  state = {

  };

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <Container>

    	<ColourHeader />

    	<IconPicker/>
    	<Row> <Button1/> <Button2/> <Button3/> <Button4/> <Button5/> <Button6/> <Button7/> <Button8/> <Button9/> <Button10/></Row>
    </Container>

    </React.Fragment>
    );
  }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')

);