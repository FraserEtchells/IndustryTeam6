import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

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
  padding-top: 10%;
`;

export const Button = styled.button`
    position: absolute;
    margin-top: 2%;
    left: 50%;
    right: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: 1.5em;
    font-family: 'Passion One', cursive;
    color: white;
    border: none;
    padding: 12px;
    outline: none;
    border-radius: 12px;

    :hover {
        text-decoration: underline;
    }
`;

export const Form = styled.form`
    background-color: #7E549F;
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
  padding: 0.3em;
  border-radius: 25px;
  text-align: center;
`;

export const Label = styled.label`
  color: black;
  opacity: 0.7;
  font-family: 'Passion One', cursive;
  padding-right: 0.5em;
  padding-top: 1em;
  text-align: center;
`;

// export const P = styled.p`
//   color: black;
//   opacity: 0.7;
//   font-family: 'Passion One', cursive;
//   text-align: center;
// `;

export const Code = styled.p`
    font-size: 1.5em;
    font-family: 'Passion One', cursive;
    margin-top: -1.5%;
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap')
    body {
      background-color: #7E549F;
      font-family: 'Passion One', cursive;
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
      <body>
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
          <Button type='submit'>READY</Button>
        </Form>
      </Div>
      </body>
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