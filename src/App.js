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
    board = this.removeNumbers(board);
    return{
      board:           board,
      message:         "",
      displayIntro:    false,
      selectedSquare:  null,
    }
  },
  createBaseRow(){
    let row = [];
    let numbers = [1,2,3,4,5,6,7,8,9];
    while(numbers.length>0){
      let n=Math.floor(Math.random()*numbers.length);
      row.push({
        value:       numbers[n],
        display:     true,
        selected:    false,
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
    for(let shuffles=0; shuffles<40; shuffles++){
      let alt = Math.floor(Math.random()*3);
      let group = Math.floor(Math.random()*3);
      let target = Math.floor(Math.random()*3);
      if(shuffles%4===0){
        board = this.swapBoxColAcrossBoxes(board, group, target, shuffleAlternatives[alt]);
      }else if(shuffles%4===2){
        // board = this.swapBoxRowAcrossBoxes(board, group, target, shuffleAlternatives[alt]);
      }else if(shuffles%4===3){
          board = this.swapCols(board, group, shuffleAlternatives[alt]);
      }else{
        board = this.swapRows(board, group, shuffleAlternatives[alt]);
      }
      if(!this.isValidBoard(board)){
        console.log('errk, mistake has been made');
        if(shuffles%4===0){ 
          console.log('failure on swapBoxRowAcrossBoxes, group, target, shuffleAlternatives[alt]', group, target, shuffleAlternatives[alt])
        }else if(shuffles%4===2){
          console.log('failure on swapBoxColAcrossBoxes, group, target, shuffleAlternatives[alt]', group, target, shuffleAlternatives[alt])
        }else if(shuffles%4===3){
            console.log('failure on swapCols, group, shuffleAlternatives[alt]', group, shuffleAlternatives[alt]);
        }else{
          console.log('failure on swapRows, group, shuffleAlternatives[alt]', group, shuffleAlternatives[alt]);
        }

        return board;
      }
    }
    return board;
  },
  isDeterminableByOneChoice(board, row, col){
    let hash = {};
    // check row
    for(let i = 0; i<9; i++){
      if(i!==col && board[row][i].display){
        hash[board[row][i].value]=1;
      }
    }
    // check column
    for(let i = 0; i<9; i++){
      if(i!==row && board[i][col].display){
        hash[board[i][col].value]=1;
      }
    }
    // check box
    let boxRow = Math.floor(row/3);
    let boxCol = Math.floor(col/3);
    for(let r=0; r<3; r++){
      for(let c = 0; c<3; c++){
        if((boxRow*3+r!==row) && (boxCol*3+c!==col) && (board[boxRow*3+r][boxCol*3+c].display)){
          hash[board[boxRow*3+r][boxCol*3+c].value]=1;
        }
      }
    }
    console.log('col', col, 'row', row, 'hash', hash)
    if(Object.keys(hash).length===8){
      console.log("true");
      return true;
    }
    console.log("false");
    return false;
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
  swapBoxColAcrossBoxes(board, rowGroup, targetCol, shuffleAlternative){
    let boxColValues = [];
    let boxColValuesForCounterpart = [];
    for(let i = 0; i<3; i++){
      boxColValues.push(board[rowGroup*3+i][shuffleAlternative[0]*3+targetCol].value);
    }
    let counterpartCol;
    for(let i = 0; i<3; i++){    
      if(boxColValues.indexOf(board[rowGroup*3][shuffleAlternative[1]*3+i].value)>-1){
        counterpartCol = i;
        break;
      }
    }
    let validSwap = true;
    for(let i = 0; i<3; i++){
      boxColValuesForCounterpart.push(board[rowGroup*3+i][shuffleAlternative[1]*3+counterpartCol].value)
      if(boxColValues.indexOf(board[rowGroup*3+i][shuffleAlternative[1]*3+counterpartCol].value)<0){
        validSwap = false;
      }
    }
    if(validSwap){
      for(let i = 0; i<3; i++){
        [board[rowGroup*3+i][shuffleAlternative[0]*3+targetCol], board[rowGroup*3+i][shuffleAlternative[1]*3+counterpartCol]] = [board[rowGroup*3+i][shuffleAlternative[1]*3+counterpartCol],board[rowGroup*3+i][shuffleAlternative[0]*3+targetCol]]
      }
    }else{
      console.log("problem in swapBoxColAcrossBoxes: board at this point:")
      board.forEach((row) => {
        let rowContents = "";
        row.forEach((square) => rowContents += " "+ square.value);
        console.log(rowContents);
      })
      console.log("rowGroup, targetCol, shuffleAlternative", board, rowGroup, targetCol, shuffleAlternative);
      console.log('shuffleAlternative[1]', shuffleAlternative[1], 'countpartCol is', counterpartCol);
      console.log('validSwap?', validSwap, boxColValues, boxColValuesForCounterpart)
    }
    return board;
  },
  swapBoxRowAcrossBoxes(board, colGroup, targetRow, shuffleAlternative){
    return board;
  },
  removeNumbers(board){
    for(let row=0; row<9; row++){
      for(let col=0; col<5; col++){
        let counterpartRow=8-row;
        let counterpartCol=8-col;
        if(this.isDeterminableByOneChoice(board, row, col) && this.isDeterminableByOneChoice(board, counterpartRow, counterpartCol)){
          board = this.removeSquare(board, row, col);
          board = this.removeSquare(board, counterpartRow, counterpartCol);
          if(col<7){
            let skip = Math.floor(Math.random()*2);
            if(skip) col +=1; 
          }
        }
      }
    }
    return board;
  },
  removeSquare(board, row, col){
    let pencilMarks = new Array(9).fill(false);
    board[row][col].display = false;
    board[row][col].inkMark = null;
    board[row][col].pencilMarks = pencilMarks;
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
      state.board[row][col].pencilMarks[pencilMark-1] = !state.board[row][col].pencilMarks[pencilMark-1];
      state.message = "";
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
