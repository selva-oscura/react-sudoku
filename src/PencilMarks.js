import React from 'react';

const PencilMarks = ({pencilMarks}) => {
	let pencilmarks = pencilMarks.map((checked, index) => {
		let pencilStyle = "pencil-mark";
		if(checked){
			pencilStyle+=" pencil-mark-selected";
		}
		return (
			<div className={pencilStyle}
				key={index}
			>
				<h6>{index+1}</h6>
			</div>
		)
	})
	return (
		<div className="pencil-marks">
			{pencilmarks}
		</div>
	)
}

export default PencilMarks;