import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.svg';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

export const Grid = styled.div`
  background-color: #7E549F;
`;
export const Row = styled.div`display: flex;`;
export const Col = styled.div`flex: ${(props) => props.size};`;;

export const Button = styled.button`
  float: right;
  background-color: Transparent;
  font-size: 1.5em;
  font-family: 'Passion One', cursive;
  color: white;
  border: none;
  padding: 10%;
  margin-right: 7%;
  margin-top: 8.5%;

  :hover {
    text-decoration: underline;
  }
`;

export const HeaderContainer = styled.div`
  color:#E266AC;
  font-family: 'Passion One', cursive;
  font-size: 1.5em;
  position: relative;
  
`;

export const Title = styled.h1`
  position: relative;
  top: -23%;
`;

export const Logo = styled.img`
  margin: 0.1em;
  width:3em;
  height:3em;
  float: left;
`;

export const HeaderSytle = styled.header`

`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap')
    body {
      background-color: #7E549F;
      font-family: 'Passion One', cursive;
    }
`;
const Header = () => {
  return (
    <React.Fragment>
    <GlobalStyle/>
      <HeaderContainer>
        <header>
          <Grid>
            <Row>
              <Col size={0.2}>
                <Logo src={logo} alt="Logo"/>
              </Col>
              <Col size={10}>
                <Title>QUIZSTAR</Title>
              </Col>
              <Col size={1}>
                <Button as="button" type="button">EXIT</Button>
              </Col>
            </Row>
          </Grid>
        </header>
      </HeaderContainer>
    </React.Fragment>
  );
}

// ========================================

ReactDOM.render(
  <Header/>,
  document.getElementById('root')
);

// export default Header;
export default Header;