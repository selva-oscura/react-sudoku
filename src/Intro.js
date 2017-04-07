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
      <p className="instructions">Instructions:</p>
      <p>
        To select a square, please
      </p>
      <ul>
        <li>tap the square on your screen <b>or</b></li>
        <li>click on the square with your mouse/touchpad <b>or</b></li>
        <li>use the arrow keys to navigate to the square</li>
      </ul>
      <p>Once you have selected your target square, to pick a number for that square,</p>
      <ul>
        <li>tap/click the dark-coloured circle corresponding to the number you want <b>or</b></li>
        <li>type the number (1-9) on your keyboard</li>
      </ul>
      <p>To make notes ('pencil marks'), select your target square and </p>
      <ul>
        <li>tap/click the light-coloured circle corresponding to the number(s) you want <b>or</b></li>
        <li>type shift+number (1-9)</li>
      </ul>
    </div>
	</div>
);

export default Intro;