import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import MainMenu from "./main-menu";
  import CustomisationPage from "./index-custom-page";
  import QuizPage from "./quiz-page";
  import styled from 'styled-components';

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                {/* <ul className="header">
                    <li><NavLink to="/main-menu">Home</NavLink></li>
                    <li><NavLink to="/index-custom-page">Customisation</NavLink></li>
                    <li><NavLink to="/quiz-page">Quiz</NavLink></li>
                </ul> */}
                <div className="content">
                    <Route exact path="/" component={MainMenu}/>
                    <Route path="/index-custom-page" component={CustomisationPage}/>
                    <Route path="/quiz-page" component={QuizPage}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;