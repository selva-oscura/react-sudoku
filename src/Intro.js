import React from 'react';
import './Intro.css';

const Intro = ({dismissIntro}) => (
	<div className="intro"
      onClick={() => {
        dismissIntro();
      }
    }>
    <div className="intro-body">
      <button
        onClick={() => {
          dismissIntro();
        }
      }>
        X
      </button>
      <p className="instructions">What is Sudoku?</p>
      <p>Sudoku is a logic game. Each row, column and 3x3 box (the ones with darker borders) contains the digits 1 through 9 exactly once. To win, you must fill in each of the squares with the correct number.</p>
      <p>No guessing is required. The numbers in the grid provide all of the data you need to solve the puzzle. Happy deducing!</p>
      <p className="instructions">Instructions:</p>
      <p>
        To select a square, please
      </p>
      <ul>
        <li>tap the square on your screen <b>or</b></li>
        <li>click on the square with your mouse/touchpad <b>or</b></li>
        <li>use the arrow keys to navigate to the square</li>
      </ul>
      <p>Once you have selected your target square, to 'ink in' the number for that square,</p>
      <ul>
        <li>tap/click the dark-coloured circle corresponding to the number you want <b>or</b></li>
        <li>type the number (1-9) on your keyboard</li>
      </ul>
      <p>To 'pencil in' possible numbers, select your target square and </p>
      <ul>
        <li>tap/click the light-coloured circle corresponding to the number(s) you want <b>or</b></li>
        <li>hold down shift while typing the number (1-9)</li>
      </ul>
    </div>
	</div>
);

export default Intro;