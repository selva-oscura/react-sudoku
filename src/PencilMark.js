import React from 'react';
import './PencilMark.css';

const PencilMark = ({pencilMark, pencilStyle}) => (
	<span 
		className={pencilStyle}
	>
		{pencilMark}
	</span>

)
export default PencilMark;