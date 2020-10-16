import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import dogicon from '../assets/doggo.png'


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
	background-color: #c3b0d3;
	display: block ruby;
  margin: 0;
`;


export const Col = styled.div`
	flex: ${(props) => props.size};


`;



const CardStyle = styled.div`

	display: table;
	padding-right: 30px;
  font-size: 35px;
  background-color: #C3B0D3;
  color: #2A1D34;
  margin: 0; 

  height: 3.57em;


`;

const TextStyle = styled.p`
  margin: 1rem 1rem 1rem 1rem;

`;

const CardImg = styled.div`

   position: relative;
    top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;

`;

const Leadheader =  styled.div`
  display: block;
  background-color: #422D53;
  justifyContent: center;
  alignItems: center;
  color: #C3B0D3;
  width: 100%;
  height: 3.1rem;
  font-size: 45px;
  border-radius: 5px 5px 0 0;
  padding-top: 0.04rem;
  padding-bottom: 4rem;
`;


const Container =  styled.div`

  width: 550px;

`;


const Title = styled.h1`
  margin: 0.1em
`;

console.log(dogicon);

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
        <TextStyle>{this.props.name}</TextStyle><TextStyle>{this.props.score}</TextStyle> <img src={this.props.icon} alt=""/>
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
            name: "PLAYER 1",
            score: "200",
           	icon: require('../assets/doggo.png'),
        };

    }

    render() {
      const {name} = this.state; 
      const{score} = this.state;
      const{icon} = this.state;
      return (
      <React.Fragment>
      <GlobalStyle/>
      	<Container>

          <LeaderboardHeader />

          	<Grid>
          		<Row>

          		  <CardStyle>

          			   <Col size={1}>

                      <CardImg>
  	          			    <Card icon={icon}/>
                      </CardImg>

      	          		<CardImg>
                        <Card icon={icon}/>
                      </CardImg>

      	          		<CardImg>
                        <Card icon={icon}/>
                      </CardImg>

  	           		  </Col>

                </CardStyle>

  	           	<CardStyle>		
          			 <Col size={1}>
  	          			<Card name ={name} />
  	          			<Card name ={name} />
  	          			<Card name ={name} />
  	           	 </Col>
  	           	</CardStyle>

  	           	<CardStyle>	
  	           		<Col size={1}>
    	         			<Card score={score} />
    	         			<Card score={score} />
    	         			<Card score={score} />
  	         		  </Col>
  	         		</CardStyle>
  	         	</Row>
	    	</Grid>
      </Container>
    
      </React.Fragment>      )
    }
}

export default Leaderboard;