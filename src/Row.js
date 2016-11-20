import React from 'react';
import Square from './Square';
import './Row.css';

const Row = ({rowNumber, rowData}) => {
	const squares = rowData.map((value, i)=>(
		<Square 
			key={i} 
			rowNumber={rowNumber} 
			colNumber={i+1} 
			value={value}
		 />
	));
	return(
		<div className="row">
			{squares}			
		</div>
	)
}

export default Row;
