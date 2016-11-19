import React from 'react';
import './App.css';
import Header from './Header';
import Intro from './Intro';
import Board from './Board';

const App = React.createClass({
  getInitialState(){
    let row = this.createBaseRow();
    let board = this.createBasicBoard(row);
    board.forEach((row)=>{
      console.log(row.join(' '));
    });
    return{
      board:      board,
      messages:   "",
    }
  },
  createBaseRow(){
    let row = [];
    let numbers = [1,2,3,4,5,6,7,8,9];
    while(numbers.length>0){
      let n =Math.floor(Math.random()*numbers.length);
      row.push(numbers[n]);
      numbers=numbers.slice(0,n).concat(numbers.slice(n+1, numbers.length));
    }
    return row;
  },
  createBasicBoard(row){
    let board = [];
    board.push(row);
    board.push(row.slice(3,9).concat(row.slice(0,3)));
    board.push(row.slice(6,9).concat(row.slice(0,6)));
    board.push(row.slice(1,9).concat(row.slice(0,1)));
    board.push(row.slice(4,9).concat(row.slice(0,4)));
    board.push(row.slice(7,9).concat(row.slice(0,7)));
    board.push(row.slice(2,9).concat(row.slice(0,2)));
    board.push(row.slice(5,9).concat(row.slice(0,5)));
    board.push(row.slice(8,9).concat(row.slice(0,8)));
    return board;
  },
  render() {
    const state = this.state;
    return (
      <div className="app">
        <Header />
        <Intro />
        <Board board={state.board} />
      </div>
    );
  }
});

export default App;
