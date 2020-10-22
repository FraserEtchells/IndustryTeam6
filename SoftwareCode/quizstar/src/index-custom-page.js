import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo.svg';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import PassionOne from './fonts/PassionOne.ttf';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
  Redirect
} from "react-router-dom";


//import UI components
import Customisation from './components/Customisation';
import Form from './components/HostForm';
import Players from './components/PlayerList';
import Header from './components/Header';
import Quiz from './quiz-page'
//import MainMenu from './components/MainMenu';


const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8A;
    font-family: 'PassionOne';
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

export const Row = styled.div`
  display: flex;
  padding: 4em;
  padding: 4em;
	position: relative;
	left: 10vw;
	top: 30%;
  font-family:'PassionOne';
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
    right: 10vw;

    :hover {
        text-decoration: underline;
    }
`;

export const Button1 = styled.button`
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
    left: 5vw;

    :hover {
        text-decoration: underline;
    }
`;




class LobbyPage extends Component{


  state={
    name:"Bob",
    color:"",
    code:"",
    leaderboard:{0:{name:"John",score:69}}
  }


  getName(){
    return document.getElementById('nickname').value;
  }

  updateColor = (colorValue) =>{
    this.setState({
      color: colorValue
    })
    
    console.log(`color change:${this.state.color}`);
  }




  ReadyUp = () =>{
    //Get Name
    var nameValue=this.getName()

    //Get colour
    var colour=this.state.color

    console.log(`color: ${colour} name: ${nameValue}`)

    var data={
      nameValue,
      colour:"#c41111"
    }
    //Send host message here
    this.props.socket.emit("HOST",data);

    var code=""
    //Recive the lobby code
    this.props.socket.on("CODE",lobbyCode =>{
      this.setState({
          code: lobbyCode
      });

      console.log(this.state.code);
     
      // //Call for the leaderboard
      // var data={
      //   code:this.state.code
      // }
      // this.props.socket.emit("LEADERBOARD",data)

  });   
  }




  ReadySignalSend = () =>{
  console.log(`ready button clicked`)
  //Send the ready signal to the rest of the players
  this.props.socket.emit("HOSTREADY",this.state.code);
  console.log(`sent: ${this.state.code}`)
  }

  renderCode=()=>{
    var {code} = this.code;

    return(<h1>code</h1>)
  }


  renderCustomisation =()=>{
    return(
      <Customisation saveColor={this.updateColor}/>
    )
  }

  renderPlayers =() =>{
    var {leaderboard} = this.state;
  
    return (
        //Pass the leaderboard into the object
        <Players  players={leaderboard}/>
    
        )
    
  }


  componentWillMount(){
    //Check for if player has joined the lobby
    this.props.socket.on("PLAYERJOINED",name =>{
      //Call for the leaderboard
      var data={
        code:this.state.code
      }
      this.props.socket.emit("LEADERBOARD",data)
    })


    //Listen for leaderboard update
    this.props.socket.on("LEADERBOARD",leaderboard=>{
      this.setState({
        leaderboard:leaderboard
      })

      console.log(`leaderboard: ${this.state.leaderboard}`)
    })


     //Wait for the signal back
     this.props.socket.on("GAMEREADY",() =>{
      //Redirect to quiz page
      window.location = "./#/quiz-page">
      //<Route path="/quiz-page" component={() => <Quiz socket={this.props.socket} code={this.state.code} />}/>
     
      console.log("GAMEREADYSIGNAL");
      
      // return(
      // <Redirect to="/quiz-page" />
      // )
    })


  }

  renderRedirect(){
          
    return "bob"
        };

  render(){
    return(
      <React.Fragment>
    <GlobalStyle/>
    <Header />
    <Row>
      <Form/>
         
    	<Customisation saveColor={this.updateColor}/>

      {this.renderPlayers()}
      
    </Row>
    <Row><h1>Game Code:{this.state.code}</h1></Row>
    <Row>
    <Button1 type='submit' onClick={this.ReadyUp}>Save</Button1>
          <HashRouter>
            <Link to='./quiz-page'>
              
              <Button type='submit'>Start Quiz</Button>
             </Link>
          </HashRouter>
    </Row>
    </React.Fragment>
    )
  }
}



export default LobbyPage;