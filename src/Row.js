import React from 'react';
import Square from './Square';
import './Row.css';

const Row = ({rowNumber, rowData}) => {
	const squares = rowData.map((square, i)=>(
		<Square 
			key={i} 
			rowNumber={rowNumber} 
			colNumber={i+1} 
			square={square}
		 />
	));
	return(
		<div className="row">
			{squares}			
		</div>
	)
}

export default Row;
