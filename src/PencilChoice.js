import React from 'react';

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