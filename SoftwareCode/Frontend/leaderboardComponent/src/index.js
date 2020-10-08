import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import dogicon from './assets/doggo.png'
import './index.css';

export const Grid = styled.div`

`;

export const Row = styled.div`

	display: flex;
	background-color: #c3b0d3;
	display: block ruby;
`;

export const Col = styled.div`
	flex: ${(props) => props.size};
`;

const CardStyle = styled.div`
	
	display: table;
	padding-left: 30px;
	padding-right: 30px;
`;

console.log(dogicon);

const LeaderboardHeader = () => {
  return (
    <div className="leadheader">
        <h2>LEADERBOARD</h2>
    </div>
  )
}
class Card extends React.Component {
  render(){
    return (
      <div className="card">
        <p>{this.props.name}</p> <p>{this.props.score}</p> <img src={this.props.icon} alt=""/>
      </div>
    )
  }
}

class App extends React.Component {

    // fires before component is mounted
    constructor(props) {
        
        // makes this refer to this component
        super(props);

        // set local state
        this.state = {
            name: "PLAYER 1",
            score: "200",
           	icon: require('./assets/doggo.png'),
        };

    }

    render() {
      const {name} = this.state; 
      const{score} = this.state;
      const{icon} = this.state;
      return (
     	<div className="container">  

          <LeaderboardHeader />

        	<Grid>
        		<Row>
        		<CardStyle>
        			<Col size={1}>
	          			<Card icon={icon}/>
	          			<Card icon={icon}/>
	          			<Card icon={icon}/>
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
        </div>
      )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);