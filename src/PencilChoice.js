import React from 'react';
import './PencilChoice.css';

const PencilChoice = ({pencilChoice, updatePencilMarks}) => {
	return (
		<div className="pencilChoice"
			onClick={() => {
				updatePencilMarks(pencilChoice);
			}
		}>
			<p>{pencilChoice}</p>
		</div>
	)
}

export default PencilChoice;	