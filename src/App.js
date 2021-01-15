import React from 'react';
import "./App.css"
import Twitter from './components/twitter-table/twitter'
import {WWC} from './components/wwc/WWC'



function App(){
    return (
      <div className="App">
      <WWC />
      <Twitter />
      <h2 className="graph-head">What it means</h2>
      </div>
    );
  
}

export default App;
