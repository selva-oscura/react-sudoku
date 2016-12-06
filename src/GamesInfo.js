import React from 'react';
import Timer from './Timer';
import History from './History';
import ShowErrorToggle from './ShowErrorToggle';
import './GamesInfo.css';

const GamesInfo = ({timer, scores, showErrors, toggleShowErrors}) => (
	<div className="gamesInfo">
		<History 
			scores={scores}
		/>
		<Timer 
			timer={timer}
		/>
		<ShowErrorToggle 
		  showErrors={showErrors}
		  toggleShowErrors={toggleShowErrors}
		/>
	</div>
);

export default GamesInfo;