import React from 'react';
import './Timer.css';

const Timer = ({timer}) => (
	<p className="timer">{timer} seconds</p>
);

export default Timer;