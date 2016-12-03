import React from 'react';
import Timer from './Timer';
import History from './History';

const Stats = ({timer, scores}) => (
	<div className="stats">
		<History 
			scores={scores}
		/>
		<Timer 
			timer={timer}
		/>
	</div>
)

export default Stats;