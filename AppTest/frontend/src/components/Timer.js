import * as React from "react";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import ReactDOM from 'react-dom';


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

export const Grid = styled.div`

`;

export const Row = styled.div`
display: flex;
`;

export const Col = styled.div`
flex: ${(props) => props.size};
`;

export const progressdiv = styled.div`
  background-color: rgb(233, 233, 233);
  border-radius: 2rem;
`;

export const progress = styled.div`
  background: rgb(24, 204, 147);
  background: linear-gradient(
    90deg,
    rgba(210, 0, 160, 1) 0%,
    rgba(210, 0, 160, 0.6264880952380952) 52%,
    rgba(210, 0, 160, 0.4332107843137255) 100%
  );

  height: 2rem;
  transition: 1s linear;
  transition-delay: 0s;
  border-radius: 2rem;
`;

export const progressComp = styled.h1`
  font-size: 10px;
`;

export const percentnumber = styled.div`
  color: rgb(121, 121, 121);
`;

export const countdown = styled.div `
    font-size: 24pt;
`;

export default function Timer() {
    
  const [timer, setTimer] = React.useState(15);
    
  const id =React.useRef(null);
    
  const clear=()=>{
  window.clearInterval(id.current)
}
  
  React.useEffect(()=>{
     id.current=window.setInterval(()=>{
      setTimer((time)=>time-1)},1000)
      
    return ()=>clear();
  },[])

  React.useEffect(()=>{
    if(timer===0){
        
      clear()
    }

  },[timer])


  return (
    <div className="countdown">
        <div className = "countdown"> {timer} </div>
    </div>
  );
}
