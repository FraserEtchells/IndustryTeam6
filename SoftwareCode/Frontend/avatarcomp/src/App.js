import React from 'react';
import './App.css';
import Avatar from './components/Avatar';

function App() {

  return (
    <div className="App">
      <h1>App</h1>
      <Avatar name="Tom" image="./images/doggo.png" />
      <Avatar name="Alice" image="./images/kitty.png" />
      <Avatar name="Bob" image="./images/panda.png"  />
    </div>
  );
}

export default App;
