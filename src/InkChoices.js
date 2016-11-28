import React from 'react';
import InkChoice from './InkChoice';

const InkChoices = () => {
	var inkChoices = [1,2,3,4,5,6,7,8,9];
	inkChoices = inkChoices.map((inkChoice, i) => (
		<InkChoice 
			key={i}
			inkChoice={inkChoice}
		/>
	));
	return (
		<div className="inkChoices">
			{inkChoices}
		</div>
	)
}

export default InkChoices;