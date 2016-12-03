import React from 'react';
import './History.css';

const History = ({scores}) => {
	let bestTime;
	if(scores.bestTime){
		bestTime = scores.bestTime + " seconds";
	}else{
		bestTime = "pending"
	}
	return(
	<div className="history">
		<p>
			Best Time: {bestTime}<br />
			Games Won: {scores.won}
		</p>
	</div>
)}

export default History;

