import React from 'react';
import './InkChoice.css';

const InkChoice = ({inkChoice, updateInkMark}) => {
	return (
		<div className="inkChoice"
			onClick={() => {
				updateInkMark(inkChoice);
			}
		}>
			<h4>{inkChoice}</h4>
		</div>
	)
}

export default InkChoice;	