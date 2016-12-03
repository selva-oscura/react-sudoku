import React from 'react';
import './App.css';
import Header from './Header';
import Intro from './Intro';
import Stats from './Stats';
import InkChoices from './InkChoices';
import PencilChoices from './PencilChoices';
import Board from './Board';
import Message from './Message';

const App = React.createClass({
  getInitialState(){
    let board = this.newBoard();
    let remainingToBeFilled = this.removedNumbersCount(board);
    console.log('remainingToBeFilled', remainingToBeFilled);
    return{
      board:           board,
      displayIntro:    false,
      gameStatus:      "inProgress",
      message:         "",
      remainingToBeFilled: remainingToBeFilled,
      scores: {
        won: 0,
        bestTime: null,
      },
      selectedSquare:  null,
      timer: 0,
    }
  },
  newBoard(){
    let row = this.createBaseRow();
    let board = this.createBasicBoard(row);
    board = this.shuffleBoard(board);
    board = this.removeNumbers(board);
    return board;
  },
  newGame(){
    let state = this.state;
    let board = this.newBoard();
    let remainingToBeFilled = this.removedNumbersCount(board);
    state.board = board;
    state.gameStatus = "inProgress";
    state.message = "";
    state.remainingToBeFilled = remainingToBeFilled;
    state.selectedSquare = null;
    state.timer = 0;
    this.setState(state); 
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
  shuffleBoard(board){
    let shuffleAlternatives = [[0,1],[0,2],[1,2]];
    for(let shuffles=0; shuffles<40; shuffles++){
      let alt = Math.floor(Math.random()*3);
      let group = Math.floor(Math.random()*3);
      let target = Math.floor(Math.random()*3);
      if(shuffles%3===0){
        board = this.swapBoxColAcrossBoxes(board, group, target, shuffleAlternatives[alt]);
      }else if(shuffles%3===1){
          board = this.swapCols(board, group, shuffleAlternatives[alt]);
      }else{
        board = this.swapRows(board, group, shuffleAlternatives[alt]);
      }
      if(!this.isValidBoard(board)){
        console.log('errk, mistake has been made');
        if(shuffles%3===0){ 
          console.log('failure on swapBoxRowAcrossBoxes, group, target, shuffleAlternatives[alt]', group, target, shuffleAlternatives[alt])
        }else if(shuffles%3===1){
            console.log('failure on swapCols, group, shuffleAlternatives[alt]', group, shuffleAlternatives[alt]);
        }else{
          console.log('failure on swapRows, group, shuffleAlternatives[alt]', group, shuffleAlternatives[alt]);
        }

        return board;
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
    if(Object.keys(hash).length===8){
      return true;
    }
    return false;
  },
  isDeterminableByElimination(board, row, col){
    // check row
    let isDeterminable = true;
    let emptySpaces = [];
    for(let i = 0; i<9; i++){
      if(!board[row][i].display && col!==i){
        emptySpaces.push([row, i]);
      }
    }
    emptySpaces.forEach((emptySpace)=>{
      if(!this.isNotAllowedInSpace(board, board[row][col].value, row, col, emptySpace[0], emptySpace[1])){
        isDeterminable = false;
      }
    });
    if(isDeterminable){ return true; }
    // check col
    isDeterminable = true;
    emptySpaces = [];
    for(let i = 0; i<9; i++){
      if(!board[i][col].display && row!==i){
        emptySpaces.push([i, col]);
      }
    }
    emptySpaces.forEach((emptySpace)=>{
      if(!this.isNotAllowedInSpace(board, board[row][col].value, row, col, emptySpace[0], emptySpace[1])){
        isDeterminable = false;
      }
    });
    if(isDeterminable){ return true; }
    // check box
    isDeterminable = true;
    emptySpaces = [];
    let boxRow = Math.floor(row/3);
    let boxCol = Math.floor(col/3);
    for(let r = 0; r<3; r++){
      for(let c = 0; c<3; c++){
        if(!board[boxRow*3+r][boxCol*3+c].display){
          if(!(boxRow*3+r===row && boxCol*3+c===col)){
            emptySpaces.push([boxRow*3+r, boxCol*3+c]);
          }
        }
      }
    }
    emptySpaces.forEach((emptySpace)=>{
      if(!this.isNotAllowedInSpace(board, board[row][col].value, row, col, emptySpace[0], emptySpace[1])){
        isDeterminable = false;
      }
    });
    return isDeterminable;
  },
  isNotAllowedInSpace(board, value, excludeRow, excludeCol, row, col){
    // check row
    for(let i = 0; i<9; i++){
      if(board[row][i].value===value && board[row][i].display && !(row===excludeRow && i===excludeCol)){
        return true;
      }
    }
    // check col
    for(let i = 0; i<9; i++){
      if(board[i][col].value===value && board[i][col].display && !(i===excludeRow && col===excludeCol)){
        return true;
      }
    }
    // check box
    let boxRow = Math.floor(row/3);
    let boxCol = Math.floor(col/3);
    for(let r = 0; r<3; r++){
      for(let c = 0; c<3; c++){
        if(board[boxRow*3+r][boxCol*3+c].display && board[boxRow*3+r][boxCol*3+c].value===value && !(boxRow*3+r===excludeRow && boxCol*3+c===excludeCol)){
          return true;
        }
      }
    }
    return false;
  },
  removeNumbers(board){
    for(let row=0; row<5; row++){
      for(let col=0; col<9; col++){
        let counterpartRow=8-row;
        let counterpartCol=8-col;
        if(board[row][col].display && board[counterpartRow][counterpartCol].display){        
          if(this.isDeterminableByOneChoice(board, row, col)){
            board[row][col].display = false;
            if(this.isDeterminableByOneChoice(board, counterpartRow, counterpartCol)){
              board = this.removeSquare(board, row, col);
              board = this.removeSquare(board, counterpartRow, counterpartCol);
              if(col<7){
                let skip = Math.floor(Math.random()*2);
                if(skip) col +=1; 
              }
            }else{
              board[row][col].display = true;
            }
          }else if(this.isDeterminableByElimination(board, row, col)){
            board[row][col].display = false;
            if(this.isDeterminableByElimination(board, counterpartRow, counterpartCol)){
              board = this.removeSquare(board, row, col);
              board = this.removeSquare(board, counterpartRow, counterpartCol);
              if(col<7){
                let skip = Math.floor(Math.random()*2);
                if(skip) col +=1; 
              }            
            }else{
              board[row][col].display = true;
            }
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
  removedNumbersCount(board){
    let removed = 0;
    board.forEach((row) => {
      row.forEach((square) => {
        if(!square.display){
          removed+=1;
        }
      });
    });
    return removed;
  },
  selectSquare(rowIndex, colIndex){
    let state = this.state;
    if(state.gameStatus==="gameOver"){ return; }
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
    let state = this.state;
    if(state.gameStatus==="gameOver"){ return; }
    if(state.selectedSquare){
      let row = state.selectedSquare[0];
      let col = state.selectedSquare[1];
      let accurateExAnte;
      if(state.board[row][col].value===state.board[row][col].inkMark){
        accurateExAnte = true;
      }else{
        accurateExAnte = false;
      }
      if(inkMark==="X"){
        state.board[row][col].inkMark = null;
        if(accurateExAnte){
          state.remainingToBeFilled += 1;
        }
      }else{
        let accurateExPost;
        if(state.board[row][col].value===inkMark){
          accurateExPost = true;
        }else{
          accurateExPost = false;
        }
        if(accurateExAnte && !accurateExPost){
          state.remainingToBeFilled +=1;
        }else if(!accurateExAnte && accurateExPost){
          state.remainingToBeFilled -= 1;
        }
        state.board[row][col].inkMark = inkMark;
      }
      if(state.remainingToBeFilled===0){
        clearInterval(this.timer);
        state.message = "Congratulations you won!";
        state.gameStatus = "gameOver";
        state.scores.won += 1;
        if(state.scores.bestTime===null || state.scores.bestTime>state.timer){
          state.scores.bestTime=state.timer;
        }
      }else{
        state.message = "";
      }
    }else{
      state.message = "Please select a square before selecting your choice."
    }
    console.log('remainingToBeFilled', state.remainingToBeFilled);
    console.log('timer', this.state.timer);
    this.setState(state);
  },
  updatePencilMarks(pencilMark){
    let state = this.state;
    if(state.gameStatus==="gameOver"){ return; }
    if(state.selectedSquare){
      let row = state.selectedSquare[0];
      let col = state.selectedSquare[1];
      if(pencilMark==="X"){
        state.board[row][col].pencilMarks = new Array(9).fill(false);
      }else{
        state.board[row][col].pencilMarks[pencilMark-1] = !state.board[row][col].pencilMarks[pencilMark-1];
      }
      state.message = "";
    }else{
      state.message = "Please select a square before adding pencil marks."
    }
    this.setState(state);
  },
  tick(){
    console.log('tick');
    this.setState({timer: this.state.timer+1});
  },
  componentDidMount(){
    this.timer = setInterval(() => this.tick(), 1000);
  },
  componentWillUnmount(){
    clearInterval(this.timer);
  },
  render() {
    const state = this.state;
    var mainDisplay;
    if(state.displayIntro){
      mainDisplay = <Intro />;
    }else{
      mainDisplay = (
        <div className="gameBody">
          <Stats 
            timer={state.timer}
            scores={state.scores}
          />
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
            gameStatus={state.gameStatus}
            newGame={this.newGame}
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
