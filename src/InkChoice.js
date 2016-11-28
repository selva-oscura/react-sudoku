import React from 'react';
import './InkChoice.css';

const InkChoice = ({inkChoice, updateInkMark}) => {
	return (
		<div className="inkChoice"
			onClick={() => {
				updateInkMark(inkChoice);
			}
		}>
			<p>{inkChoice}</p>
		</div>
	)
}

export default InkChoice;	