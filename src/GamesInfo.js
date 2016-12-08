import React from 'react';
import Timer from './Timer';
import History from './History';
import ShowErrorToggle from './ShowErrorToggle';
import './GamesInfo.css';

const GamesInfo = ({timer, scores, showErrors, toggleShowErrors}) => (
	<div className="gamesInfo">
		<div>		
			<History 
				scores={scores}
			/>
		</div>
		<div>		
			<Timer 
				timer={timer}
			/>
			<ShowErrorToggle 
			  showErrors={showErrors}
			  toggleShowErrors={toggleShowErrors}
			/>
		</div>
	</div>
);

export default GamesInfo;