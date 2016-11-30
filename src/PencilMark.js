import React from 'react';

const PencilMark = ({pencilMark, pencilStyle}) => (
	<div 
		className={pencilStyle}
	>
		<h6>{pencilMark}</h6>
	</div>

)
export default PencilMark;