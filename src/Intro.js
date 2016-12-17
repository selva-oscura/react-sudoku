import React from 'react';
import './Intro.css';

const Intro = () => (
	<div className="intro">
    <p className="App-intro">
      To select a square, please click on it with your mouse/touchpad, tap on it on your screen, or use the arrow keys to navigate to the square.
    </p>
    <p>Once you have selected your target square, to pick a number for that square, type the number (1-9) on your keyboard or tap/click the dark-coloured circle corresponding to the number you want.</p>
    <p>To make notes ('pencil marks'), select your target square and type shift+number (1-9) or tap/click the ligh-coloured circle corresponding to the number(s) you want.</p>
	</div>
);

export default Intro;