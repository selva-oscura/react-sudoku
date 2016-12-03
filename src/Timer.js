import React from 'react';
import './Timer.css';

const Timer = ({timer}) => (
	<div className="timer">
		<p>{timer} seconds</p>
	</div>
);

export default Timer;