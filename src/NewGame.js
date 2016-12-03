import React from 'react';

const NewGame = ({newGame}) => (
	<button 
		onClick={() => {
			newGame()
		}
	}>
		New Game
	</button>
);

export default NewGame;