import React from 'react';
import './NewGame.css';

const NewGame = ({newGame}) => (
	<button 
		className="new-game"
		onClick={() => {
			newGame()
		}
	}>
		New Game
	</button>
);

export default NewGame;