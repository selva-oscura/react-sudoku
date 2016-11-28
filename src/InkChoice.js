import React from 'react';
import './InkChoice.css';

const InkChoice = ({inkChoice}) => {
	return (
		<div className="inkChoice">
			<p>{inkChoice}</p>
		</div>
	)
}

export default InkChoice;