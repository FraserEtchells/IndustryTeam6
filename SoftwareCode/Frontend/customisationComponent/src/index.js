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

 var IconPicker = styled.div`

  background: white;
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

const RedBtn = styled.button`
  
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

  const BlueBtn = styled.button`

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

 const GreenBtn = styled.button`

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

 const PinkBtn = styled.button`

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

  const OrangeBtn = styled.button`
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

  const YellowBtn = styled.button`

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

  const GreyBtn = styled.button`
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


const WhiteBtn = styled.button`
  
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

  const PurpleBtn = styled.button`
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

  const CyanBtn = styled.button`
  
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

	constructor(){

		super();

		this.state = {

			bgColour: ""
		};
	}

	changeColour = () => {
     	this.setState({bgColour: "red"});
   
  	}
	 

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <Container>

    	<ColourHeader />

    	<IconPicker style={{background: this.state.bgColour}}/>
    	<Row>
    		 <RedBtn onClick={this.changeColour}/> <BlueBtn/> <GreenBtn/> <PinkBtn/> <OrangeBtn/> <YellowBtn/> <GreyBtn/> <WhiteBtn/> <PurpleBtn/> <CyanBtn/> 
    	</Row>
    </Container>

    </React.Fragment>
    );
  }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')

);