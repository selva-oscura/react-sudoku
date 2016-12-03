import React from 'react';
import Timer from './Timer';
import History from './History';
import './Stats.css';

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