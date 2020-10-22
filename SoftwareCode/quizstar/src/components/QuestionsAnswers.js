import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import PassionOne from '../fonts/PassionOne.ttf';

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8A;
    font-family: 'Passion One', cursive;
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

// grid width can be changed depending on how big the other components are
export const Grid = styled.div`
  background-color: #714C8A; // purple
 
  position: relative;
  left: 2em;
`;


//display: flex; stretches it out a bit vertically but then the text doesn't center align
//display: block; FIXES IT <3

//adding height stops it from stretching vertically
//but seems to put it in the top 'line' so if it's a long question it'll wrap to the line below
//so if it's a short one it leaves a gap for the line underneath
export const QuestionRow = styled.div`
  display: block;
  background-color: #DCC6E0; // lilac
  justifyContent: center;
  alignItems: center;
  margin:;
  padding: 1em;
  height:10vh;
  width:92vmin;
`;

export const QuestionText = styled.h2`
  font-size: calc(0.5em + 1vw);
  color: #714C8A;
`;

export const Row = styled.div`
  display: flex;

  justifyContent:center;
    alignItems: center;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

// button width used to be 400px but changed to percentage so it resizes

const Button = styled.button`
    font-family:'PassionOne';
    color: #714c8a;
    border: none;
    width: 48vmin;
    height: 20vmin;
    font-size: 2em;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-right: 0.75vw;
    outline: none;
    
    :hover {
      text-decoration: underline;
      font-size: 2.5em;
    }
`;

const Button1 = styled(Button)` 
  background: #98FB98; // green
  `;

const Button2 = styled(Button)`
  background: #89C4F4; // blue  
  `;

const Button3 = styled(Button)`
  background: #DDA0DD; // pink
  `;

const Button4 = styled(Button)`
  background: #F4A460; // orange
  `;

// button border and colour if we decide to use it
//  border: 2px solid #a90081;

// want to use this colour in background but not sure how outside of divs
//  background-color: #7E549F;

class Answers extends React.Component {
  state = {
    question:[],
    code:this.props.code,
    time:5,
    color:""
  };

  componentWillMount(){
    

    //Ask for a question
    console.log(this.state.code);
    let data={code:this.state.code}
   // this.props.socket.emit("QUESTION",data);



    //Recive the question
    // this.props.socket.on("QUESTION", question =>{
    //     console.log(`Questions: ${question.question}`);
    //     this.setState({
    //       question:[question]
    //     })
    // })
}


  nextQ = () =>{
        let data={code: this.state.code}
        //this.props.socket.emit("QUESTION",data);

        // this.props.socket.on("QUESTION", question =>{
        //     this.setState({
        //       question:[question]
        //     })
        // })

        this.setState({
            color: "#714C8A"
        })
    }

  CheckAns = (userSelect) =>{

    userSelect= userSelect.toString();
    if(userSelect === this.state.question[0].correct_ans){
        console.log("nice")
        this.setState({
            color: "green"
        })
        let scorevalue= 5*this.state.time;
        //Emit to score to server
        var data={
            score: scorevalue,
            code: this.state.code
        }
        //this.props.socket.emit("SCORE",data);

        // data={
        //     code: this.state.code
        // }
        // this.props.socket.emit("LEADERBOARD",data);

        // //Recivce the leaderboard
        // this.props.socket.on("LEADERBOARD", leaderboard => {
        //     this.setState({
        //         leaderboard: leaderboard
        //     });

        // console.log(this.state.leaderboard);
    // })
    }else{
        console.log("nope")
        this.setState({
            color: "red"
        })
    }

    //Request new question
    this.nextQ();
}

  renderQuestion = () =>{
    var {question} = this.state;

    return question.map( q => {
            return (
                <h1>{q.question}</h1>
            );
        })
}

  renderAnswerA = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <button onClick={() => {this.CheckAns(q.answer_a)}} style = {{color: this.state.color}}>{q.answer_a}</button>
        )
    })
}

renderAnswerB = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <button onClick={() => {this.CheckAns(q.answer_b)}} style = {{color: this.state.color}}>{q.answer_b}</button>
        )
    })
}

renderAnswerC = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
        <button onClick={() => {this.CheckAns(q.answer_c)}} style = {{color: this.state.color}}>{q.answer_c}</button>
        )
    })
}

renderAnswerD = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <button onClick={() => {this.CheckAns(q.answer_d)}} style = {{color: this.state.color}}>{q.answer_d}</button>
        )
    })
}

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <div className="App">

      <Grid>
        <QuestionRow>
          <QuestionText>
            {this.renderQuestion()}
          </QuestionText>
        </QuestionRow>

        <Row>
            <Button1>{this.renderAnswerA()}</Button1>
            <Button2>{this.renderAnswerB()}</Button2>
          </Row>
          <Row>

            <Button3>{this.renderAnswerC()}</Button3>
            <Button4>{this.renderAnswerD()}</Button4>
          </Row>
        </Grid>

    </div>

    </React.Fragment>
    );
  }
}

export default Answers;
