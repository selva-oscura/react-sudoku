import React from 'react';
import './App.css';
import Header from './Header';
import Intro from './Intro';
import Board from './Board';

const App = React.createClass({
  getInitialState(){
    let row = this.createBaseRow();
    let board = this.createBasicBoard(row);
    board = this.shuffleBoard(board);
    return{
      board:      board,
      messages:   "",
      displayIntro: false,
    }
  },
  createBaseRow(){
    let row = [];
    let numbers = [1,2,3,4,5,6,7,8,9];
    while(numbers.length>0){
      let n =Math.floor(Math.random()*numbers.length);
      row.push({
        value: numbers[n],
        guess: null,
        pencilMarks: [],
        display: true,
      });
      numbers=numbers.slice(0,n).concat(numbers.slice(n+1, numbers.length));
    }
    return row;
  },
  createBasicBoard(row){
    let board = [];
    let offsets = [3,6,1,4,7,2,5,8];
    board.push(row);
    offsets.forEach(function(offset){
      board.push(row.slice(offset, 9).concat(row.slice(0, offset)));
    });
    return board;
  },
  shuffleBoard(board){
    let shuffleAlternatives = [[0,1],[0,2],[1,2]];
    for(let shuffles=0; shuffles<50; shuffles++){
      let alt = Math.floor(Math.random()*3);
      let group = Math.floor(Math.random()*3);
      if(shuffles%2===0){
        board = this.swapCols(board, group, shuffleAlternatives[alt]);
      }else{
        board = this.swapRows(board, group, shuffleAlternatives[alt]);
      }
    }
    return board;
  },
  swapRows(board, rowGroup, shuffleAlternative){
    [board[rowGroup*3+shuffleAlternative[0]], board[rowGroup*3+shuffleAlternative[1]]] = [board[rowGroup*3+shuffleAlternative[1]], board[rowGroup*3+shuffleAlternative[0]]]
    return board;
  },
  swapCols(board, colGroup, shuffleAlternative){
    board.forEach(function(row){
      [row[colGroup*3+shuffleAlternative[0]],row[colGroup*3+shuffleAlternative[1]]] = [row[colGroup*3+shuffleAlternative[1]],row[colGroup*3+shuffleAlternative[0]]]
    });
    return board;
  },
  render() {
    const state = this.state;
    var mainDisplay;
    if(state.displayIntro){
      mainDisplay = <Intro />;
    }else{
      mainDisplay = <Board board={state.board} />
    }
    return (
      <div className="app">
        <Header />
        {mainDisplay}
      </div>
    );
  }
});

export default App;
