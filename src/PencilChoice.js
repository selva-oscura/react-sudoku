import React from 'react';
import './PencilChoice.css';

const PencilChoice = ({pencilChoice, updatePencilMarks}) => {
	return (
		<div className="pencilChoice"
			onClick={() => {
				updatePencilMarks(pencilChoice);
			}
		}>
			<h4>{pencilChoice}</h4>
		</div>
	)
}

export default PencilChoice;	