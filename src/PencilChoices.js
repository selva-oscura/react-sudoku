import React from 'react';
import './PencilChoices.css';
import PencilChoice from './PencilChoice';

const PencilChoices = ({updatePencilMarks}) => {
	var pencilChoices = [1,2,3,4,5,6,7,8,9];
	pencilChoices = pencilChoices.map((pencilChoice, i) => (
		<PencilChoice 
			key={i}
			pencilChoice={pencilChoice}
			updatePencilMarks={updatePencilMarks}
		/>
	));
	return (
		<div className="pencilChoices">
			{pencilChoices}
		</div>
	)
}

export default PencilChoices;