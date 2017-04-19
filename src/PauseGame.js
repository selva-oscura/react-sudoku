import React from 'react';
import './PauseGame.css';

const PauseGame = ({pausedGame, pausedGameToggle}) => (
	<span
		className="pause-game"
	>
		<label 
			htmlFor="pause-game"
			>
			<input 
				type="checkbox" 
				name="pause-game"
				defaultChecked={pausedGame}
				onClick={() => {
					pausedGameToggle()
				}
			}/>
			Pause Game
		</label>
	</span>
);

export default PauseGame;
