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
  padding: 0.5em 4em;
`;

export const Title = styled.h1``;

var IconPicker = styled.div`
  background: ${(props) => (props.background ? props.background : "white")};
  border: none;
  color: #7e549f;
  padding: 4em;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.5em 0.5em;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  bottom: 1em;
`;

const ColourHead = styled.div`
  background-color: #422d53;
  color: #c3b0d3;
  width: 100%;
  height: 1.2em;
  font-size:2em;
  text-align: center;
  border-radius: 5px 5px 0 0;
  margin: 0;
  padding-bottom: 0.5em;
  position: relative;
  top: -1.4em;
`;

const ColourHeader = () => {
  return (
    <ColourHead>
      <h2>PLAYERS CUSTOMISATIONS</h2>
    </ColourHead>
  );
};

export const Container = styled.div`
  display: block;
  background-color: #cab1de; // lilac
  margin-left: 0.5em;
text-align: center;
height: 20em;
width: 38em;
border-radius: 0.3em;
margin-top: 0.3em;
}
`;

const RedBtn = styled.button`
  background: #c41111; // red
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const BlueBtn = styled.button`
  background: #132ed0; // blue
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const GreenBtn = styled.button`
  background: #15a642; // green
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const PinkBtn = styled.button`
  background: #ec54b9; // pink
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const OrangeBtn = styled.button`
  background: #ee7d0d; // orange
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const YellowBtn = styled.button`
  background: #eded54; // yellow
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const GreyBtn = styled.button`
  background: #3f474e; // grey
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const WhiteBtn = styled.button`
  background: white; // white
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const PurpleBtn = styled.button`
  background: #6b2fba; // purple
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

const CyanBtn = styled.button`
  background: #50f5d0; // white
  border: none;
  color: #7e549f;
  padding: 22px;
  text-align: center;
  alignitems: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
`;

class Custom extends React.Component {
  constructor() {
    super();

    this.state = {
      bgColor: ""
    };
  }

  changeColour = (color) => {
    this.setState({ bgColor: color });
  };

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Container>
          <ColourHeader />

          <IconPicker background={this.state.bgColor} />
          <Row>
            <RedBtn onClick={() => this.changeColour("#c41111")} />{" "}
            <BlueBtn onClick={() => this.changeColour("#132ed0")} />{" "}
            <GreenBtn onClick={() => this.changeColour("#15A642")} />{" "}
            <PinkBtn onClick={() => this.changeColour("#EC54B9")} />{" "}
            <OrangeBtn onClick={() => this.changeColour("#EE7D0D")} />{" "}
            <YellowBtn onClick={() => this.changeColour("#EDED54")} />{" "}
            <GreyBtn onClick={() => this.changeColour("#3F474E")} /> {" "}
            <WhiteBtn onClick={() => this.changeColour("#FFFFFF")} />{" "}
            <PurpleBtn onClick={() => this.changeColour("#6B2FBA")} />{" "}
             <CyanBtn onClick={() => this.changeColour("#50F5D0")} />{" "}
          </Row>

          <Row>
          
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
    <Custom />,
    document.getElementById('root')

)

export default Custom;