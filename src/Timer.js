import React from 'react';
import './Timer.css';

const Timer = ({timer}) => {
	let text = "second";
	if(timer!==1){
		text+="s"
	}
	return (
	<p className="timer">
		Elapsed: {timer} {text}
	</p>
)};

export default Timer;