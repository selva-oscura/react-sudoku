import React from 'react';
import './InkChoices.css';
import InkChoice from './InkChoice';

const InkChoices = ({updateInkMark}) => {
	var inkChoices = [1,2,3,4,5,6,7,8,9,"X"];
	inkChoices = inkChoices.map((inkChoice, i) => (
		<InkChoice 
			key={i}
			inkChoice={inkChoice}
			updateInkMark={updateInkMark}
		/>
	));
	return (
		<div className="inkChoices">
			{inkChoices}
		</div>
	)
}

export default InkChoices;