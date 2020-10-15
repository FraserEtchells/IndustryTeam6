import React, { Component } from 'react';
import './Avatar.css';


class Avatar extends React.Component {
    render(){
      return (
        <div className="avatar">
            <img src={this.props.image}></img>
            <h1>{this.props.name}</h1>
        </div>
      )
    }
  }

export default Avatar;
