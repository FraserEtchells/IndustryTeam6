import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import MainMenu from "./main-menu";
  import CustomisationPage from "./index-custom-page";
  import QuizPage from "./quiz-page";
  import SoloView from "./solo-view";
  import TimerPopUp from "./timerpopup";
  import NonHostView from "./non-host-view";
  import openSocket from "socket.io-client"


  const socket= openSocket("http://localhost:4000");

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <div className="content">
                    <Route exact path="/" component={MainMenu}/>
                    <Route path="/index-custom-page" component={() => <CustomisationPage socket={socket} />}/>
                    <Route path="/quiz-page" component={() => <QuizPage socket={socket} />}/>
                    <Route path="/solo-view" component={() => <SoloView/>}/>
                    <Route path="/timerpopup" component={() => <TimerPopUp/>}/>
                    <Route path="/non-host-view" component={() => <NonHostView socket={socket} />}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}

export default Main;