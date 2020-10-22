import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #7E549F;
    font-family: 'Passion One', cursive;
    overflow: hidden;
    text-align: center;
  
  }
`;
export const Grid = styled.div`
 
`;

export const Row = styled.div`

  display: flex;
  display: block ruby;
  margin: 0;
  
`;


export const Col = styled.div`
  flex: ${(props) => props.size};


`;

const CardStyle = styled.div`

  display: table;

  font-size: 1.5em;
  color: #2A1D34;
  margin: 0; 


`;

const TextStyle = styled.p`
  margin: 0px 0px;
  padding-bottom: 0.2em;

`

const CardImg = styled.div`

   position: relative;
    top: 15px;
    padding-bottom: 15px;


`;

const UnderDiv = styled.div`
border: 0.4em  #422d53;
height: 1em;

`;

const Leadheader =  styled.h2`
  color: #271A31;
  width: 100%;
height: 01.5em;
font-size: calc(2*1vw);
text-align: center;
border-radius: 0.2em 0.2em 0 0;
margin: 0;
padding-bottom: 0.7em;
border-bottom: 0.3em dotted #422d53;
`;


const Container =  styled.div`

  width: 20%;
padding-left: 0.5em;
position: relative;
bottom: 3em;

`;

const PlayerStyle = styled.div`
position: relative;
left: 14vh;
`;


const LeaderboardHeader = () => {
  return (
    <Leadheader>
        <h2>PLAYERS</h2>
    </Leadheader>
  )
}
class Card extends React.Component {
  render(){
    return (
      <CardStyle>
        <TextStyle>{this.props.name}</TextStyle> 
      </CardStyle>
    )

  }
}

class PlayerList extends React.Component {

    // fires before component is mounted
    constructor(props) {
        
        // makes this refer to this component
        super(props);

        // set local state
        // this.state = {
        //     name: "PLAYER 1",
        // };

    }

    renderPlayersNames = () =>{
      console.log(`forlb ${this.props.players}`);

      var playersN= []
      let number=0;

      for(let key in this.props.players){
        console.log("asd,asdaj sdgsdjkf");
        playersN[number]=this.props.players[key];
        number++
      }
      return playersN.map(p => {
        return(
        <Card name ={p.name} />
        )
      })

    }


    render() {
      // const {name} = this.state; 
     
      return (
      <React.Fragment>
      <GlobalStyle/>
        <Container>

          <LeaderboardHeader />

            <Grid>
            <UnderDiv>
              <Row>

      

                <CardStyle> 
                  <PlayerStyle>  
                 <Col size={1}>
                    {this.renderPlayersNames}
                 </Col>
                 </PlayerStyle>  
                </CardStyle>

              </Row>
            </UnderDiv>
        </Grid>
      </Container>
    
      </React.Fragment>      )
    }
}

ReactDOM.render(
    <PlayerList />,
    document.getElementById('root')

);

export default PlayerList;