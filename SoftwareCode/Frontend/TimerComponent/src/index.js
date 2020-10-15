import * as React from "react";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import ReactDOM from 'react-dom';
import "./index.css";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
  body {
    background-color:  #7E549F;
    font-family: 'Passion One', cursive;
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

  height: 20px;
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

class App extends React.Component {
    state = {

        percent: 1425



    };
updateProgress = (field, val) => {
    this.setState({ [field]: val });
};

render() {
    return (
        <React.Fragment>
        <GlobalStyle/>
        <div className="App">
        <div className="div">
            <Grid>
                <Row>
                    <Col size={10}>
                        <Timer width= 'auto' percent={this.state.percent} />
                    </Col>
                    <Col size={1}>
                    </Col>
                    <Col size={1}>
        
                        <div className = "countdown"> {//code to decrement//
        }</div>
                    </Col>
                </Row>
            </Grid>
        </div>
        </div>
                </React.Fragment>


    );
}
}

export var Timer = ({ width, percent, status }) => {
    const [value, setValue] = React.useState(1425);

    React.useEffect(() => {
        //setValue(percent * width);
        value > 0 && setTimeout(() => setValue(value - (percent/15)), 1000);
    }, [value]);


    return (
        <div className={"progressComp"}>
        <h1 className="percent-number">{status}</h1>
        <div className="progress-div" style={{ width: width }}>

        <div className="progress" style={{ width: `${value}px` }}>



</div>
</div>
</div>
);

}


export default App;

ReactDOM.render(
<App />,
document.getElementById('root')
);