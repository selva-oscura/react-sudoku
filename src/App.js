import React from 'react';
import './App.css';

const App = React.createClass({
  getInitialState(){
    let board = [];
    let row = [];
    let numbers = [];
    for(let i = 1; i<=9; i++){
      numbers.push(i);
    }
    while(numbers.length>0){
      let n =Math.floor(Math.random()*numbers.length);
      row.push(numbers[n]);
      numbers=numbers.slice(0,n).concat(numbers.slice(n+1, numbers.length));
    }
    board.push(row);
    board.push(row.slice(3,9).concat(row.slice(0,3)));
    board.push(row.slice(6,9).concat(row.slice(0,6)));
    board.push(row.slice(1,9).concat(row.slice(0,1)));
    board.push(row.slice(4,9).concat(row.slice(0,4)));
    board.push(row.slice(7,9).concat(row.slice(0,7)));
    board.push(row.slice(2,9).concat(row.slice(0,2)));
    board.push(row.slice(5,9).concat(row.slice(0,5)));
    board.push(row.slice(8,9).concat(row.slice(0,8)));
    board.forEach((row)=>{
      console.log(row.join(' '));
    });
    return{
      board:      board,
      messages:   "",
    }
  },
  render() {
    console.log("state", this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Sudoku</h2>
        </div>
        <p className="App-intro">
          Will eventually want to display directions here for
        </p>
        <ol> 
          <li>basic play</li>
          <li>setting and changing a square</li>
          <li>setting and unsetting pencil marks</li>
        </ol>
      </div>
    );
  }
});

export default App;
