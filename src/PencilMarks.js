import React from 'react';
import PencilMark from './PencilMark';
import './PencilMarks.css';

const PencilMarks = ({pencilMarks}) => {
	let pencilmarks = pencilMarks.map((checked, index) => {
		let pencilStyle = "pencil-mark";
		if(checked){
			pencilStyle+=" pencil-mark-selected";
		}
		return (
			<PencilMark 
				key={index}
				pencilMark={index+1}
				pencilStyle={pencilStyle}
			/>
		)
	})
	return (
		<p className="pencil-marks">
			{pencilmarks}
		</p>
	)
}

export default PencilMarks;