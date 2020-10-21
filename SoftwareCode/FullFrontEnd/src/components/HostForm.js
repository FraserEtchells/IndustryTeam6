import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import PassionOne from '../fonts/PassionOne.ttf';
import {
  HashRouter,
  Link,
} from "react-router-dom";

// Placeholder code until fetching from BE
var lobbyCode = "HSAKHFV";

export const Grid = styled.div``;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

export const Div = styled.div`
  text-align: center;
  display: block;
  align-content: center; 
  border: solid 0.6em;
  border-color: #422d53;
  border-style: dotted;
  height: calc(0.37*100vh);
  width: calc(0.2*100vw);

`;

export const Button = styled.button`
    position: absolute;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: calc(0.03*100vh);
    color: white;
    border: none;
    padding: 0.5em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';

    :hover {
        text-decoration: underline;
    }
`;

export const Form = styled.form`
    padding: 1em;
    display: inline-block;
    margin: auto;
    align-content: center;
    text-align: center;
`;

export const TextInput = styled.input`
  background-color: white;
  opacity: 0.7;
  color: black;
  outline: none;
  border: none;
  // padding: 0.7em;
  padding: 4%;
  border-radius: 25px;
  text-align: center;
  width: 92%;
  margin-bottom: 2%;
`;

export const Label = styled.label`
  color: black;
  opacity: 0.7;
  font-family:'PassionOne';
  padding-right: 0.3em;
  padding-left: 0.3em;
  text-align: center;
  font-size: calc(0.04*100vh);
  padding-top: 2%;
`;

// export const P = styled.p`
//   color: black;
//   opacity: 0.7;
//   font-family: 'Passion One', cursive;
//   text-align: center;
// `;

export const Code = styled.p`
    // font-size: 5em;
    font-size: calc(0.08*100vh);
    margin: 0;
    color: #cab1de;
    font-family:'PassionOne';
    margin-top: -3%;
`;

const GlobalStyle = createGlobalStyle`
     @font-face {
      font-family: PassionOne;
      src: url(${PassionOne});
    }
    body {
      background-color: #714C8A;
      text-align: center;
      align-content: center;
    }
`;

// const ReadyBtn = () => {
//     return (
//         <React.Fragment>
//             <GlobalStyle/>
//             <body>
//                 <Button as="button" type="button">READY</Button>
//             </body>
//         </React.Fragment>
//     );
//   }


const PlayerInputFrm = () => {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Div>
        <Form id="PIFrm" name="Player input form">
          <Row>
            <Label for='nickname'>NICKNAME</Label>
            <TextInput type='text' id='nickname' name='nickname'/>
          </Row>
          <Row>
            {/* GAME CODE WILL BE FETCHED FROM BE AND DISPLAYED TO HOST HERE */}
            <Label for='Code'>YOUR GAME CODE IS</Label>
            <Code>{lobbyCode}</Code>
          </Row>
          <HashRouter>
            <Link to='./quiz-page'>
              <Button type='submit'>READY</Button>
            </Link>
          </HashRouter>
        </Form>
      </Div>
    </React.Fragment>
  );
}

// this is necessary but unsure what for
class PlayerInput extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }
}

ReactDOM.render(
    <PlayerInputFrm/>,
    document.getElementById('root')
  );

export default PlayerInputFrm;