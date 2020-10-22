import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #714C8A;
    font-family: 'Passion One', cursive;
    overflow: hidden;
    text-align: center;
  
  }
`;
export const Grid = styled.div`
 
`;

export const Row = styled.div`

	display: flex;
	background-color: #E1D3E4;
	display: block ruby;
  margin: 0;
`;


export const Col = styled.div`
	flex: ${(props) => props.size};


`;



const CardStyle = styled.div`

	display: table;
	padding-right:calc(1*1vw);
  font-size: calc(2*1vw);
  color: #2A1D34;
  margin: 0; 
  height: 13vh;
  position: relative;
  right: 1vw;


`;

const TextStyle = styled.p`
  margin: 1rem 1rem 1rem 1rem;

`;

const CardImg = styled.div`

   position: relative;
    top: 0.4em;
    padding-left: 2em;

`;

const Leadheader =  styled.div`
  display: block;
  background-color: #422D53;
  justifyContent: center;
  alignItems: center;
  color: #C3B0D3;
  width: 25vw;
  height: calc(1.3*1vw);
  font-size: calc(2*1vw);
  border-radius: 0.5em 0.5em 0 0;
  padding-top: 0.04rem;
  padding-bottom: 4rem;
`;


const Container =  styled.div`

width: 25vw;
position: relative;
left: 4vw;
bottom: 5vh;
`;


const Title = styled.h1`
  margin: 0.1em

`;


const LeaderboardHeader = () => {
  return (
    <Leadheader>
        <Title>LEADERBOARD</Title>
    </Leadheader>
  )
}
class Card extends React.Component {
  render(){
    return (
      <CardStyle>
        <TextStyle>{this.props.name}</TextStyle><TextStyle>{this.props.score}</TextStyle>
      </CardStyle>
    )

  }
}
class Leaderboard extends React.Component {

    
    constructor(props) {
        
        // makes this refer to this component
        super(props);

        // set local state
         this.state = {
        //     name: "PLAYER 1",
             score: "200",
        };

    }

    renderPlayersNames = () =>{

      var players= []
      let number=0;

      for(let key in this.props.leaderboard){
        players[number]=this.props.leaderboard[key];
        number++
      }
      return players.map(p => {
        return(
        <Card name ={p.name} />
        )
      })

    }

    renderPlayersScores = () =>{

      var players= []
      let number=0;

      for(let key in this.props.leaderboard){
        players[number]=this.props.leaderboard[key];
        number++
      }
      return players.map(p => {
        return(
        <Card score ={p.score} />
        )
      })

    }

    render() {
      // const {name} = this.state; 
       const{score} = this.state;
      return (
      <React.Fragment>
      <GlobalStyle/>
      	<Container>

          <LeaderboardHeader />

          	<Grid>
          		<Row>
  	           	<CardStyle>		
          			 <Col size={1}>
  	          			{this.renderPlayersNames()}
  	           	 </Col>
  	           	</CardStyle>

  	           	<CardStyle>	
  	           		<Col size={1}>
                    {this.renderPlayersScores()}
  	         		  </Col>
  	         		</CardStyle>
  	         	</Row>
	    	</Grid>
      </Container>
    
      </React.Fragment>      )
    }
}

export default Leaderboard;