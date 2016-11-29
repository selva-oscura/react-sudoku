import React from 'react';
import './App.css';
import Header from './Header';
import Intro from './Intro';
import InkChoices from './InkChoices';
import PencilChoices from './PencilChoices';
import Board from './Board';
import Message from './Message';

const App = React.createClass({
  getInitialState(){
    let row = this.createBaseRow();
    let board = this.createBasicBoard(row);
    board = this.shuffleBoard(board);
    return{
      board:      board,
      message:    "",
      displayIntro: false,
      selectedSquare: null,
    }
  },
  createBaseRow(){
    let row = [];
    let numbers = [1,2,3,4,5,6,7,8,9];
    while(numbers.length>0){
      let n =Math.floor(Math.random()*numbers.length);
      row.push({
        value: numbers[n],
        inkMark: null,
        pencilMarks: [],
        display: true,
        selected: false,
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
      let offsetRow = row.slice(offset, 9).concat(row.slice(0, offset));
      let deepCloneOffsetRow = JSON.parse(JSON.stringify(offsetRow))
      board.push(deepCloneOffsetRow);
    });
    if(this.isValidBoard(board)){
      return board;
    }else{
      console.log('error in creating board', board);
    }
  },
  isValidBoard(board){
    // check all rows are valid
    for(let row = 0; row<9; row++){
      let hash = {};
      for(let col = 0; col<9; col++){
        if(!hash[board[row][col].value]){
          hash[board[row][col].value] = 1;
        }
      }
      if(Object.keys(hash).length!==9){
        console.log("failure on row", row, 'hash', hash, Object.keys(hash).length);
        return false;
      }
    }
    // check all columns are valid
    for(let col = 0; col<9; col++){
      let hash = {};
      for(let row = 0; row<9; row++){
        if(!hash[board[row][col].value]){
          hash[board[row][col].value] = 1;
        }
      }
      if(Object.keys(hash).length!==9){
        console.log("failure on col", col, 'hash', hash, Object.keys(hash).length);
        return false;
      }
    }
    // check all boxes are valid
    for(let boxRow = 0; boxRow<3; boxRow++){
      for(let boxCol = 0; boxCol<3; boxCol++){
        let hash = {};
        for(let row = 0; row<3; row++){
          for(let col = 0; col<3; col++){
            if(!hash[board[boxRow*3+row][boxCol*3+col].value]){
              hash[board[boxRow*3+row][boxCol*3+col].value] = 1;
            }
          }
        }
        if(Object.keys(hash).length!==9){
          console.log("failure on boxRow", boxRow, "boxCol", boxCol,  'hash', hash, Object.keys(hash).length);
          return false;
        }
      }
    }
    return true;
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
  selectSquare(rowIndex, colIndex){
    let state = this.state;
    if(state.selectedSquare){
      let row = state.selectedSquare[0];
      let col = state.selectedSquare[1];
      state.board[row][col].selected = false;
    }
    state.selectedSquare = [rowIndex, colIndex];
    state.board[rowIndex][colIndex].selected = true;
    this.setState(state);
  },
  updateInkMark(inkMark){
    console.log("inkMark", inkMark);
    let state = this.state;
    if(state.selectedSquare){
      let row = state.selectedSquare[0];
      let col = state.selectedSquare[1];
      state.board[row][col].inkMark = inkMark;
      state.message = "";
      console.log('inkmark?', state.board[row][col]);
    }else{
      state.message = "Please select a square before selecting your choice."
    }
    this.setState(state);
  },
  updatePencilMarks(pencilMark){
    console.log("pencilMark", pencilMark);
    let state = this.state;
    if(state.selectedSquare){
      let row = state.selectedSquare[0];
      let col = state.selectedSquare[1];
      if(state.board[row][col].pencilMarks.length===0){
        state.board[row][col].pencilMarks = new Array(9).fill(false);
        state.board[row][col].pencilMarks[pencilMark-1] = true;
      }else{
        state.board[row][col].pencilMarks[pencilMark-1] = !state.board[row][col].pencilMarks[pencilMark-1];
      }
      state.message = "";
      console.log('pencilmark?', state.board[row][col]);
    }else{
      state.message = "Please select a square before adding pencil marks."
    }
    this.setState(state);
  },  
  render() {
    const state = this.state;
    var mainDisplay;
    if(state.displayIntro){
      mainDisplay = <Intro />;
    }else{
      mainDisplay = (
        <div className="gameBody">
          <InkChoices 
            updateInkMark={this.updateInkMark} 
          />
          <PencilChoices 
            updatePencilMarks={this.updatePencilMarks} 
          />
          <Board 
            board={state.board} 
            selectSquare={this.selectSquare}
          />
          <Message 
            message={state.message}
          />
        </div>
      )
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
