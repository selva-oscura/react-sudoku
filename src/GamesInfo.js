import React from 'react';
import Timer from './Timer';
import History from './History';
import PauseGame from './PauseGame';
import ShowErrorToggle from './ShowErrorToggle';
import './GamesInfo.css';

const GamesInfo = ({timer, scores, pausedGame, pausedGameToggle, showErrors, toggleShowErrors}) => (
	<div className="gamesInfo">
		<div>		
			<Timer 
				timer={timer}
			/>
			<History 
				scores={scores}
			/>
		</div>
		<div>
			<PauseGame 
				pausedGame={pausedGame}
				pausedGameToggle={pausedGameToggle}
			/>
			<ShowErrorToggle 
			  showErrors={showErrors}
			  toggleShowErrors={toggleShowErrors}
			/>
		</div>
	</div>
);

export default GamesInfo;